import { DesignFormData } from '../types/form';
import { FormSubmissionResponse } from '../types/api';
import { Logger } from '../utils/logger';
import { fetchWithTimeout } from '../utils/fetch';
import { handleAPIResponse } from '../utils/api';
import { API_ENDPOINTS, API_CONFIG } from '../config/constants';

export async function submitForm(data: DesignFormData): Promise<FormSubmissionResponse> {
  try {
    Logger.info('Submitting form data', { companyName: data.companyName });
    
    const response = await fetchWithTimeout(API_ENDPOINTS.SUBMIT_FORM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      timeout: API_CONFIG.DEFAULT_TIMEOUT,
    });

    const result = await handleAPIResponse<FormSubmissionResponse>(response);
    Logger.info('Form submission successful', { success: result.success });
    return result;
  } catch (error) {
    Logger.error('Form submission failed', error);
    throw error;
  }
}