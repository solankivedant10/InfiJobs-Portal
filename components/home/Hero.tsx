import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { useCyclingText } from '../useCyclingText';

const heroTexts = [
  { title: 'Master Your Analytics Career with InfiJobs', content: 'Empower your analytics career with expert guidance!' },
  { title: 'Join the Vibrant Community of Data Professionals', content: 'Explore interactive tools and real-world projects.' },
];

// Lazy load Spline 3D viewer if it exists (currently using GIF, but prepared for future)
// const Spline3DViewer = lazy(() => import('@splinetool/react-spline'));

const HeroContent: React.FC = () => {
  const { index, isFading } = useCyclingText(heroTexts.length, 8000);
  const { title, content } = heroTexts[index];
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // useRef for RAF id so it persists across renders
  const rafRef = useRef<number | null>(null);

  // Respect users who prefer reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (!section || !bg) return;
    if (prefersReducedMotion) {
      // ensure background transform is reset if reduced motion is enabled
      bg.style.transform = 'none';
      return;
    }

    // Handler uses pointer events for broader device support
    const handlePointerMove = (e: PointerEvent) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        // Guard against divide-by-zero
        if (!rect.width || !rect.height) return;

        const x = (('clientX' in e ? e.clientX : (rect.left + rect.width / 2)) - rect.left) / rect.width - 0.5;
        const y = (('clientY' in e ? e.clientY : (rect.top + rect.height / 2)) - rect.top) / rect.height - 0.5;

        const translateX = x * 20;
        const translateY = y * 10;

        // update using style only when bg exists
        if (bg) {
          bg.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(1.05)`;
        }
      });
    };

    // Attach pointermove (better for touch + mouse)
    section.addEventListener('pointermove', handlePointerMove);

    // Cleanup
    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      // reset transform for cleanliness
      if (bg) bg.style.transform = 'none';
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center min-h-[60vh] px-4 bg-black/20 sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden"
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15), transparent 70%)',
          filter: 'blur(40px)',
          transform: 'none',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Logo with Glow */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
          <img
            src="/assets/logo.gif"
            alt="InfiJobs logo — learning platform"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 shadow-2xl"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Text Content */}
        <div className={`transition-all duration-700 ease-in-out transform ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {content}
          </p>
        </div>

        <button
          onClick={() => document.getElementById('learning')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-10 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all duration-300 transform hover:scale-105"
        >
          Start Learning Today
        </button>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
    </section>
  );
};

// Lazy load the Hero content to prevent blocking initial page load
const LazyHeroContent = lazy(() => Promise.resolve({ default: HeroContent }));

// Hero loading fallback
const HeroLoader = () => (
  <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

const Hero: React.FC = () => (
  <Suspense fallback={<HeroLoader />}>
    <LazyHeroContent />
  </Suspense>
);

export default Hero;
