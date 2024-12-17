import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DesignFormData } from '../../types/form';
import { FormSection, FormField } from '../FormSection';

interface DesignSectionProps {
  register: UseFormRegister<DesignFormData>;
  errors: FieldErrors<DesignFormData>;
}

export const DesignSection: React.FC<DesignSectionProps> = ({ register, errors }) => {
  return (
    <FormSection title="3. Design Preferences">
      <FormField
        label="Do you have existing brand guidelines?"
        name="brandGuidelines"
        type="textarea"
        register={register}
        errors={errors}
      />
      <FormField
        label="Which websites do you admire and why?"
        name="websiteInspiration"
        type="textarea"
        register={register}
        errors={errors}
      />
      <FormField
        label="Preferred color schemes"
        name="colorSchemes"
        register={register}
        errors={errors}
      />
      <FormField
        label="Preferred styles"
        name="preferredStyles"
        register={register}
        errors={errors}
      />
      <FormField
        label="Any design elements you want to avoid?"
        name="designElementsToAvoid"
        type="textarea"
        register={register}
        errors={errors}
      />
    </FormSection>
  );
};