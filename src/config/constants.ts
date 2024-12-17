// API endpoints
export const API_ENDPOINTS = {
  SUBMIT_FORM: '/.netlify/functions/submit-form',
} as const;

// Form status messages
export const FORM_MESSAGES = {
  SUCCESS: 'Form submitted successfully! We will contact you soon.',
  GENERIC_ERROR: 'There was an error submitting the form. Please try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  INVALID_RESPONSE: 'Invalid response from server. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  VALIDATION_ERROR: 'Please check the form for errors and try again.',
  EMAIL_ERROR: 'Failed to send email notification. Our team has been notified.',
} as const;

// API Configuration
export const API_CONFIG = {
  DEFAULT_TIMEOUT: 15000, // 15 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  MAX_PAYLOAD_SIZE: 1024 * 1024, // 1MB
} as const;

// Form field validation
export const REQUIRED_FIELDS = [
  'companyName',
  'contactPerson',
  'email',
  'phone',
  'businessAddress',
] as const;

// Environment variables
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;