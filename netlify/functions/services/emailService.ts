import { Resend } from 'resend';
import { DesignFormData } from '../../../src/types/form';
import { Logger } from '../../../src/utils/logger';
import { EmailConfig } from '../types/email';
import { generateEmailContent } from '../utils/email';
import { EmailError } from '../utils/errors';

export class EmailService {
  private resend: Resend;
  private config: EmailConfig;
  private static instance: EmailService;

  private constructor(apiKey: string, config: EmailConfig) {
    this.resend = new Resend(apiKey);
    this.config = config;
  }

  static getInstance(apiKey: string, config: EmailConfig): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService(apiKey, config);
    }
    return EmailService.instance;
  }

  async sendEmail(formData: DesignFormData) {
    const emailContent = generateEmailContent(formData);

    try {
      Logger.info('Sending email', { 
        to: this.config.toEmail,
        company: formData.companyName 
      });

      const { data, error } = await this.resend.emails.send({
        from: this.config.fromEmail,
        to: this.config.toEmail,
        subject: `New Website Design Inquiry from ${formData.companyName}`,
        text: emailContent,
        reply_to: formData.email,
      });

      if (error) {
        throw new EmailError('Failed to send email', error);
      }

      if (!data?.id) {
        throw new EmailError('Invalid email service response');
      }

      Logger.info('Email sent successfully', { emailId: data.id });
      return data;
    } catch (error) {
      Logger.error('Email service error', error);
      throw error instanceof EmailError ? error : new EmailError('Email service error');
    }
  }
}