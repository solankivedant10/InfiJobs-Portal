import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You'll need to set these up in your EmailJS dashboard
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface SupportEmailParams {
    to: string;
    toName: string;
    from: string;
    message: string;
    department: string;
}

/**
 * Send a support email using EmailJS
 * @param params - Email parameters
 * @returns Promise that resolves when email is sent
 */
export const sendSupportEmail = async (params: SupportEmailParams): Promise<void> => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    try {
        const templateParams = {
            to_email: params.to,
            to_name: params.toName,
            from_email: params.from,
            message: params.message,
            department: params.department,
            reply_to: params.from,
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        if (response.status !== 200) {
            throw new Error(`Failed to send email: ${response.text}`);
        }
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};
