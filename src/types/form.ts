import { z } from 'zod';

// Break down the schema into smaller, focused parts
const requiredContactSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  businessAddress: z.string().min(1, 'Business address is required'),
  websiteUrl: z.string()
    .transform(str => str.trim())
    .refine(str => str === '' || str.startsWith('http://') || str.startsWith('https://'), {
      message: 'Website URL must start with http:// or https://',
    })
    .optional()
    .or(z.literal('')),
});

const projectDetailsSchema = z.object({
  businessDescription: z.string().optional(),
  websitePurpose: z.string().optional(),
  websiteGoals: z.string().optional(),
});

const designPreferencesSchema = z.object({
  brandGuidelines: z.string().optional(),
  websiteInspiration: z.string().optional(),
  colorSchemes: z.string().optional(),
  preferredStyles: z.string().optional(),
  designElementsToAvoid: z.string().optional(),
});

// Combine all schemas
export const designFormSchema = z.object({
  ...requiredContactSchema.shape,
  ...projectDetailsSchema.shape,
  ...designPreferencesSchema.shape,
});

export type DesignFormData = z.infer<typeof designFormSchema>;