import { Handler } from '@netlify/functions';
import { Resend } from 'resend';
import { DesignFormData } from '../../src/types/form';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false,
        message: 'Method Not Allowed' 
      }),
    };
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    if (!event.body) {
      throw new Error('Request body is empty');
    }

    const formData: DesignFormData = JSON.parse(event.body);

    // Generate email content
    const emailContent = `
      New Website Design Inquiry

      Client Information:
      ------------------
      Company: ${formData.companyName}
      Contact: ${formData.contactPerson}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Website: ${formData.websiteUrl || 'N/A'}
      Address: ${formData.businessAddress}

      Project Details:
      ---------------
      Business Description: ${formData.businessDescription || 'N/A'}
      Website Purpose: ${formData.websitePurpose || 'N/A'}
      Website Goals: ${formData.websiteGoals || 'N/A'}

      Design Preferences:
      -----------------
      Brand Guidelines: ${formData.brandGuidelines || 'N/A'}
      Website Inspiration: ${formData.websiteInspiration || 'N/A'}
      Color Schemes: ${formData.colorSchemes || 'N/A'}
      Preferred Styles: ${formData.preferredStyles || 'N/A'}
      Design Elements to Avoid: ${formData.designElementsToAvoid || 'N/A'}
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'anthony.gibson@brookhaven-hathaway.com',
      subject: `New Website Design Inquiry from ${formData.companyName}`,
      text: emailContent,
      reply_to: formData.email,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error('Failed to send email');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        data: { id: data?.id },
      }),
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      }),
    };
  }
};