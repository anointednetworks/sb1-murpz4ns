export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  details?: Array<{
    message: string;
    field?: string;
  }>;
}

export interface FormSubmissionResponse extends APIResponse {
  emailSent?: boolean;
}