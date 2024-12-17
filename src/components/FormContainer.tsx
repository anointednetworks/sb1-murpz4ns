import React from 'react';
import { Scroll } from 'lucide-react';
import { clsx } from 'clsx';

interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className={clsx(
      "relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300",
      "before:absolute before:inset-0 before:-z-10 before:rounded-xl",
      "before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-pink-500/20",
      "before:blur-xl before:transition-all before:duration-300",
      "hover:before:blur-2xl hover:before:opacity-75",
      "dark:before:from-blue-400/10 dark:before:via-purple-400/10 dark:before:to-pink-400/10"
    )}>
      <div className="flex items-center gap-3 mb-8">
        <Scroll className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Website Design Intake Form
        </h1>
      </div>
      {children}
    </div>
  );
};