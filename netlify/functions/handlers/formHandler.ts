import { HandlerEvent } from '@netlify/functions';
import { createResponse } from '../utils/response';
import { validateFormData } from '../utils/validation';
import { validateEnvironment, getEmailConfig } from '../config/environment';
import { EmailService } from '../services/emailService';
import { DesignFormData } from '../../../src/types/form';
import { Logger } from '../../../src/utils/logger';
import { EmailError } from '../utils/errors';

export async function handleFormSubmission(event: HandlerEvent) {
  try {
    // Environment validation
    const envError = validateEnvironment();
    if (envError) {
      Logger.error('Environment validation failed', envError);
      return createResponse(500, {
        success: false,
        message: 'Server configuration error',
      });
    }

    // Request validation
    if (!event.body) {
      return createResponse(400, {
        success: false,
        message: 'Request body is empty',
      });
    }

    const contentType = event.headers['content-type'];
    if (!contentType?.toLowerCase().includes('application/json')) {
      return createResponse(400, {
        success: false,
        message: 'Invalid content type. Expected application/json',
      });
    }

    // Parse form data
    let formData: DesignFormData;
    try {
      formData = JSON.parse(event.body);
    } catch (error) {
      return createResponse(400, {
        success: false,
        message: 'Invalid JSON in request body',
      });
    }

    // Validate form data
    const validationError = validateFormData(formData);
    if (validationError) {
      return createResponse(400, {
        success: false,
        message: validationError,
      });
    }

    // Send email
    try {
      const emailService = EmailService.getInstance(
        process.env.RESEND_API_KEY!,
        getEmailConfig()
      );

      const result = await emailService.sendEmail(formData);

      return createResponse(200, {
        success: true,
        message: 'Form submitted successfully',
        emailSent: true,
        data: { id: result.id },
      });
    } catch (error) {
      if (error instanceof EmailError) {
        return createResponse(500, {
          success: false,
          message: 'Failed to send email notification',
          details: [{ message: error.message }],
        });
      }
      throw error;
    }
  } catch (error) {
    Logger.error('Unhandled form submission error', error);
    return createResponse(500, {
      success: false,
      message: 'An unexpected error occurred',
      details: error instanceof Error ? [{ message: error.message }] : undefined,
    });
  }
}