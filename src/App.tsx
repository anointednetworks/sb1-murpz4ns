import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { designFormSchema, type DesignFormData } from './types/form';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { FormContainer } from './components/FormContainer';
import { ContactSection } from './components/form-sections/ContactSection';
import { ProjectSection } from './components/form-sections/ProjectSection';
import { DesignSection } from './components/form-sections/DesignSection';
import { SubmitButton } from './components/SubmitButton';
import { AlertMessage } from './components/AlertMessage';
import { useFormSubmission } from './hooks/useFormSubmission';

export default function App() {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DesignFormData>({
    resolver: zodResolver(designFormSchema),
  });

  const { submitStatus, handleSubmit, clearStatus } = useFormSubmission(reset);

  return (
    <ThemeProvider>
      <Layout>
        <FormContainer>
          {submitStatus && (
            <AlertMessage
              type={submitStatus.type}
              message={submitStatus.message}
              onClose={clearStatus}
            />
          )}
          <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-8">
            <ContactSection register={register} errors={errors} />
            <ProjectSection register={register} errors={errors} />
            <DesignSection register={register} errors={errors} />
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </FormContainer>
      </Layout>
    </ThemeProvider>
  );
}