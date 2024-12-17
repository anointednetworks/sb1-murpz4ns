import React from 'react';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};