import { DesignFormData } from '../../../src/types/form';
import { REQUIRED_FIELDS } from '../../../src/config/constants';

export function validateFormData(formData: Partial<DesignFormData>): string | null {
  for (const field of REQUIRED_FIELDS) {
    if (!formData[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}