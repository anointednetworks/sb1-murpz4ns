import { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { DesignFormData } from '../types/form';
import { submitForm } from '../services/formService';
import { Logger } from '../utils/logger';
import { FORM_MESSAGES } from '../config/constants';

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

export function useFormSubmission(reset: UseFormReset<DesignFormData>) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleSubmit = async (data: DesignFormData) => {
    try {
      setSubmitStatus(null);
      const result = await submitForm(data);
      
      if (result.success) {
        reset();
        setSubmitStatus({
          type: 'success',
          message: FORM_MESSAGES.SUCCESS,
        });
      } else {
        throw new Error(result.message || FORM_MESSAGES.GENERIC_ERROR);
      }
    } catch (error) {
      Logger.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error 
          ? error.message 
          : FORM_MESSAGES.GENERIC_ERROR,
      });
    }
  };

  return {
    submitStatus,
    handleSubmit,
    clearStatus: () => setSubmitStatus(null),
  };
}