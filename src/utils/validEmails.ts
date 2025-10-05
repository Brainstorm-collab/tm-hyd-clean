// List of valid registered emails for the application
export const VALID_EMAILS = [
  'johnsonwillamson@gmail.com',
  'admin@superpage.com',
  'user@superpage.com',
  'test@superpage.com',
  'demo@superpage.com',
  'support@superpage.com',
  'developer@superpage.com',
  'manager@superpage.com',
  'designer@superpage.com',
  'qa@superpage.com'
] as const;

// Valid email domains for registration
export const VALID_DOMAINS = [
  'superpage.com',
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'company.com'
] as const;

// Check if email is in the valid registered emails list
export const isValidRegisteredEmail = (email: string): boolean => {
  return VALID_EMAILS.includes(email.toLowerCase() as any);
};

// Check if email domain is valid for registration
export const isValidEmailDomain = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return VALID_DOMAINS.includes(domain as any);
};

// Validate email format
export const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Complete email validation for login (any valid email format)
export const validateLoginEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email.trim()) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!isValidEmailFormat(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

// Complete email validation for registration (any valid email format)
export const validateRegistrationEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email.trim()) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!isValidEmailFormat(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};
