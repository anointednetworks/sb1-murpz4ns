import { APIError } from './errors';
import { FORM_MESSAGES } from '../config/constants';
import { Logger } from './logger';
import { fetchWithTimeout } from './fetch';

export { fetchWithTimeout };

export async function handleAPIResponse<T>(response: Response): Promise<T> {
  try {
    // Validate response status first
    if (!response.ok) {
      Logger.error('API error response', { status: response.status });
      throw new APIError(
        FORM_MESSAGES.SERVER_ERROR,
        response.status
      );
    }

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      Logger.error('Invalid content type received', { contentType });
      throw new APIError(FORM_MESSAGES.INVALID_RESPONSE);
    }

    // Parse response
    const data = await response.json();
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      Logger.error('Invalid response structure', { data });
      throw new APIError(FORM_MESSAGES.INVALID_RESPONSE);
    }

    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof SyntaxError) {
      Logger.error('JSON parse error', { error });
      throw new APIError(FORM_MESSAGES.INVALID_RESPONSE);
    }
    Logger.error('Unexpected error in API response handling', { error });
    throw new APIError(FORM_MESSAGES.SERVER_ERROR);
  }
}