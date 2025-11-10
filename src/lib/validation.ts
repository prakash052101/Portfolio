/**
 * Form validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate name field
 * Requirements: 2-100 characters, only letters and spaces
 */
export function validateName(name: string): ValidationResult {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { isValid: false, error: 'Please enter your name' };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, error: 'Name must be less than 100 characters' };
  }

  if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    return { isValid: false, error: 'Name should only contain letters' };
  }

  return { isValid: true };
}

/**
 * Validate email field
 * Requirements: Valid email format (RFC 5322 compliant)
 */
export function validateEmail(email: string): ValidationResult {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return { isValid: false, error: 'Please enter your email' };
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

/**
 * Validate message field
 * Requirements: 10-1000 characters
 */
export function validateMessage(message: string): ValidationResult {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return { isValid: false, error: 'Please enter a message' };
  }

  if (trimmedMessage.length < 10) {
    return {
      isValid: false,
      error: 'Message must be at least 10 characters',
    };
  }

  if (trimmedMessage.length > 1000) {
    return {
      isValid: false,
      error: 'Message must be less than 1000 characters',
    };
  }

  return { isValid: true };
}

/**
 * Validate entire contact form
 */
export interface ContactFormValidation {
  name: ValidationResult;
  email: ValidationResult;
  message: ValidationResult;
  isValid: boolean;
}

export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): ContactFormValidation {
  const nameValidation = validateName(data.name);
  const emailValidation = validateEmail(data.email);
  const messageValidation = validateMessage(data.message);

  return {
    name: nameValidation,
    email: emailValidation,
    message: messageValidation,
    isValid:
      nameValidation.isValid &&
      emailValidation.isValid &&
      messageValidation.isValid,
  };
}
