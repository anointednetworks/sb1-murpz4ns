export interface EmailConfig {
  fromEmail: string;
  toEmail: string;
}

export interface EmailResult {
  id: string;
  success: boolean;
}