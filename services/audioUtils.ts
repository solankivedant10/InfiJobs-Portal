/**
 * Decodes a base64 string into a Uint8Array of bytes.
 */
function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decodes raw PCM data into an AudioBuffer.
 * Note: Gemini TTS typically returns 24kHz audio (sampleRate: 24000).
 */
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  // The data is 16-bit integer PCM.
  // We use .slice() to ensure the buffer is aligned if needed, preventing errors on some browsers
  const dataInt16 = new Int16Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Convert Int16 to Float32 (-1.0 to 1.0)
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Plays raw PCM audio from a base64 string.
 * Returns the source node so it can be stopped externally.
 */
export const playAudio = async (
  base64Audio: string,
  audioContext: AudioContext
): Promise<AudioBufferSourceNode | null> => {
  if (!base64Audio) return null;

  try {
    // Ensure context is running (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const bytes = decodeBase64(base64Audio);
    const audioBuffer = await decodeAudioData(bytes, audioContext);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    return source;
  } catch (error) {
    console.error("Failed to decode or play audio:", error);
    return null;
  }
};