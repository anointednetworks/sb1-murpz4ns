import { NetworkError } from './errors';
import { FORM_MESSAGES } from '../config/constants';
import { Logger } from './logger';

interface RetryOptions {
  attempts: number;
  delay: number;
}

interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number;
  retry?: RetryOptions;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const { 
    timeout = 8000, 
    retry = { attempts: 3, delay: 1000 },
    ...fetchOptions 
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retry.attempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (error instanceof Error && error.name === 'AbortError') {
        Logger.warn(`Request timeout (attempt ${attempt}/${retry.attempts})`);
      } else {
        Logger.warn(`Fetch error (attempt ${attempt}/${retry.attempts})`, error);
      }

      if (attempt < retry.attempts) {
        await delay(retry.delay);
      }
    }
  }

  if (lastError?.name === 'AbortError') {
    throw new NetworkError(FORM_MESSAGES.TIMEOUT_ERROR);
  }
  throw new NetworkError(FORM_MESSAGES.NETWORK_ERROR);
}