import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { clsx } from 'clsx';

interface AlertMessageProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, onClose }) => {
  return (
    <div
      className={clsx(
        'mb-6 p-4 rounded-lg flex items-start justify-between',
        type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
      )}
    >
      <div className="flex items-start">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
        )}
        <p
          className={clsx(
            'text-sm',
            type === 'success' ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'
          )}
        >
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={clsx(
          'p-1 rounded-full transition-colors',
          type === 'success'
            ? 'hover:bg-green-100 dark:hover:bg-green-800'
            : 'hover:bg-red-100 dark:hover:bg-red-800'
        )}
      >
        <X
          className={clsx(
            'w-4 h-4',
            type === 'success' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
          )}
        />
      </button>
    </div>
  );
};