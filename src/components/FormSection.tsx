import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DesignFormData } from '../types/form';
import { clsx } from 'clsx';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className={clsx(
      "relative mb-8 p-6 rounded-lg",
      "bg-gray-50/50 dark:bg-gray-800/50",
      "before:absolute before:inset-0 before:-z-10 before:rounded-lg",
      "before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10",
      "before:blur-lg before:transition-all before:duration-300",
      "hover:before:blur-xl hover:before:opacity-75",
      "dark:before:from-blue-400/5 dark:before:to-purple-400/5"
    )}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: keyof DesignFormData;
  register: UseFormRegister<DesignFormData>;
  errors: FieldErrors<DesignFormData>;
  type?: 'text' | 'email' | 'tel' | 'url' | 'textarea';
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder,
  required = false,
  helperText,
}) => {
  const inputClasses = clsx(
    "w-full px-4 py-2 rounded-lg transition-all duration-300",
    "bg-white dark:bg-gray-700",
    "text-gray-900 dark:text-gray-100",
    "border border-gray-300 dark:border-gray-600",
    "focus:ring-2 focus:ring-blue-500/50 focus:border-transparent",
    "focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    "dark:focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
  );

  const errorClasses = errors[name] ? "border-red-500 focus:ring-red-500/50" : "";

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name)}
          className={`${inputClasses} ${errorClasses} min-h-[100px]`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...register(name)}
          className={`${inputClasses} ${errorClasses}`}
          placeholder={placeholder}
        />
      )}
      {helperText && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};