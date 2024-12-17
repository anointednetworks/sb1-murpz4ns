import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DesignFormData } from '../../types/form';
import { FormSection, FormField } from '../FormSection';

interface ProjectSectionProps {
  register: UseFormRegister<DesignFormData>;
  errors: FieldErrors<DesignFormData>;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ register, errors }) => {
  return (
    <FormSection title="2. Project Overview">
      <FormField
        label="Briefly describe your business"
        name="businessDescription"
        type="textarea"
        register={register}
        errors={errors}
      />
      <FormField
        label="What is the primary purpose of the website?"
        name="websitePurpose"
        type="textarea"
        register={register}
        errors={errors}
      />
      <FormField
        label="What are your main goals for the website?"
        name="websiteGoals"
        type="textarea"
        register={register}
        errors={errors}
      />
    </FormSection>
  );
};