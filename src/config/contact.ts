// Contact Information Configuration
// Kantong Aplikasi - Professional Web Development & Design

export const CONTACT_INFO = {
  // General Inquiries
  general: {
    email: 'contact@kantongaplikasi.com',
    label: 'General Inquiries',
    description: 'For further information or clarification regarding our services, please contact us.',
  },
  
  // Technical Support
  support: {
    email: 'support@kantongaplikasi.com',
    label: 'Technical Support',
    description: 'For technical matters or support-related inquiries, please reach out to.',
  },
  
  // Phone & WhatsApp
  phone: {
    number: '+6281392442358',
    formatted: '+62 813-9244-2358',
    label: 'WhatsApp',
  },
  
  // Company Info
  company: {
    name: 'Kantong Aplikasi',
    website: 'https://kantongaplikasi.com',
    description: 'Professional Web Development & Design',
  },
  
  // Business Hours
  hours: {
    weekdays: 'Monday - Friday, 9:00 AM - 5:00 PM',
    timezone: 'WIB (GMT+7)',
  },
};

// Helper function to get mailto link
export function getMailtoLink(type: 'general' | 'support', subject?: string): string {
  const email = CONTACT_INFO[type].email;
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

// Helper function to get WhatsApp link
export function getWhatsAppLink(message?: string): string {
  const phone = CONTACT_INFO.phone.number;
  return message 
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phone}`;
}

// Helper function to get tel link
export function getTelLink(): string {
  return `tel:${CONTACT_INFO.phone.number}`;
}
