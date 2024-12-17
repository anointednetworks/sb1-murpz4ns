import { EmailConfig } from '../types/email';

export function getEmailConfig(): EmailConfig {
  const config: EmailConfig = {
    fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    toEmail: process.env.RESEND_TO_EMAIL || 'anthony.gibson@brookhaven-hathaway.com',
  };

  return config;
}

export function validateEnvironment(): string | null {
  if (!process.env.RESEND_API_KEY) {
    return 'RESEND_API_KEY is not set';
  }
  return null;
}