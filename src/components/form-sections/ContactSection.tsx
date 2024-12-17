import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DesignFormData } from '../../types/form';
import { FormSection, FormField } from '../FormSection';

interface ContactSectionProps {
  register: UseFormRegister<DesignFormData>;
  errors: FieldErrors<DesignFormData>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ register, errors }) => {
  return (
    <FormSection title="1. Client Information">
      <FormField
        label="Company Name"
        name="companyName"
        register={register}
        errors={errors}
        required
      />
      <FormField
        label="Contact Person"
        name="contactPerson"
        register={register}
        errors={errors}
        required
      />
      <FormField
        label="Email Address"
        name="email"
        type="email"
        register={register}
        errors={errors}
        required
      />
      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        register={register}
        errors={errors}
        required
      />
      <FormField
        label="Website URL"
        name="websiteUrl"
        type="url"
        placeholder="https://"
        register={register}
        errors={errors}
        helperText="Optional - Enter your current website URL if you have one"
      />
      <FormField
        label="Business Address"
        name="businessAddress"
        register={register}
        errors={errors}
        required
      />
    </FormSection>
  );
};