'use client';

import { useState } from 'react';
import { validateName, validateEmail, validateMessage } from '@/lib/validation';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorMessage?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    submitStatus: 'idle',
  });

  // Real-time validation for individual fields
  const validateField = (
    fieldName: keyof FormData,
    value: string
  ): string | undefined => {
    let result;
    switch (fieldName) {
      case 'name':
        result = validateName(value);
        return result.isValid ? undefined : result.error;
      case 'email':
        result = validateEmail(value);
        return result.isValid ? undefined : result.error;
      case 'message':
        result = validateMessage(value);
        return result.isValid ? undefined : result.error;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));

    // Real-time validation - only show errors after user has started typing
    if (value.length > 0 || errors[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate all fields
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
      isValid = false;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
      isValid = false;
    }

    const messageValidation = validateMessage(formData.message);
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setFormState({
      isSubmitting: true,
      submitStatus: 'idle',
    });

    try {
      // Call the contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setFormState({
        isSubmitting: false,
        submitStatus: 'success',
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState({
          isSubmitting: false,
          submitStatus: 'idle',
        });
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setFormState({
        isSubmitting: false,
        submitStatus: 'error',
        errorMessage:
          error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <div className={className}>
      {/* Success Notification */}
      {formState.submitStatus === 'success' && (
        <div
          className="mb-6 rounded-2xl bg-green-50 dark:bg-green-950/20 border-2 border-green-500 dark:border-green-600 p-4"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                Message sent successfully!
              </h3>
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                Thank you for reaching out. I&apos;ll get back to you as soon as
                possible.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {formState.submitStatus === 'error' && (
        <div
          className="mb-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border-2 border-red-500 dark:border-red-600 p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500 dark:text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Failed to send message
              </h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                {formState.errorMessage ||
                  'Something went wrong. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <Input
          id="name"
          name="name"
          type="text"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          placeholder="Your full name"
          required
          disabled={formState.isSubmitting}
          maxLength={100}
        />

        {/* Email Field */}
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="your.email@example.com"
          required
          disabled={formState.isSubmitting}
        />

        {/* Message Field */}
        <Textarea
          id="message"
          name="message"
          label="Message"
          value={formData.message}
          onChange={handleInputChange}
          error={errors.message}
          placeholder="Tell me about your project, opportunity, or just say hello..."
          required
          disabled={formState.isSubmitting}
          maxLength={1000}
          showCharCount={true}
          rows={6}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full"
          aria-label={
            formState.isSubmitting ? 'Sending message' : 'Send message'
          }
        >
          {formState.isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </div>
  );
}
