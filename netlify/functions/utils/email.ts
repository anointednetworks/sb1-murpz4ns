import { DesignFormData } from '../../../src/types/form';

interface EmailSection {
  title: string;
  fields: Array<{
    label: string;
    value: string | undefined;
    optional?: boolean;
  }>;
}

function formatSection(section: EmailSection): string {
  const { title, fields } = section;
  const formattedFields = fields
    .map(({ label, value, optional }) => `${label}: ${value || (optional ? 'N/A' : '')}`).join('\n    ');
  
  return `
    ${title}
    ${'-'.repeat(title.length)}
    ${formattedFields}
  `;
}

export function generateEmailContent(formData: DesignFormData): string {
  const sections: EmailSection[] = [
    {
      title: '1. Client Information',
      fields: [
        { label: 'Company Name', value: formData.companyName },
        { label: 'Contact Person', value: formData.contactPerson },
        { label: 'Email Address', value: formData.email },
        { label: 'Phone Number', value: formData.phone },
        { label: 'Website URL', value: formData.websiteUrl, optional: true },
        { label: 'Business Address', value: formData.businessAddress },
      ],
    },
    {
      title: '2. Project Overview',
      fields: [
        { label: 'Business Description', value: formData.businessDescription, optional: true },
        { label: 'Website Purpose', value: formData.websitePurpose, optional: true },
        { label: 'Website Goals', value: formData.websiteGoals, optional: true },
      ],
    },
    {
      title: '3. Design Preferences',
      fields: [
        { label: 'Brand Guidelines', value: formData.brandGuidelines, optional: true },
        { label: 'Website Inspiration', value: formData.websiteInspiration, optional: true },
        { label: 'Color Schemes', value: formData.colorSchemes, optional: true },
        { label: 'Preferred Styles', value: formData.preferredStyles, optional: true },
        { label: 'Design Elements to Avoid', value: formData.designElementsToAvoid, optional: true },
      ],
    },
  ];

  return `New Website Design Intake Form Submission\n${sections.map(formatSection).join('\n')}`;
}