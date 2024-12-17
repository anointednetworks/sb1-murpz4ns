import React from 'react';
import { Send } from 'lucide-react';
import { clsx } from 'clsx';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <div className="flex justify-end pt-6">
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "relative inline-flex items-center px-6 py-3 rounded-md transition-all duration-300",
          "text-base font-medium text-white",
          "bg-blue-600 dark:bg-blue-500",
          "hover:bg-blue-700 dark:hover:bg-blue-600",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "before:absolute before:inset-0 before:-z-10 before:rounded-md",
          "before:bg-blue-500/50 dark:before:bg-blue-400/30",
          "before:blur-lg before:transition-all before:duration-300",
          "hover:before:blur-xl hover:before:opacity-75",
          "disabled:before:opacity-0"
        )}
      >
        <Send className="w-5 h-5 mr-2" />
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </button>
    </div>
  );
};