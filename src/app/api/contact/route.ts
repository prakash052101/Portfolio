import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContactForm } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

// Initialize Resend with API key from environment variables
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Contact email recipient
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'prakash.051601@gmail.com';

// Rate limit configuration: 5 requests per hour per IP
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * POST /api/contact
 * Handle contact form submissions with validation, rate limiting, and email sending
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // Check rate limit
    const rateLimitResult = checkRateLimit(
      clientIp,
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW
    );

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);

      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate form inputs
    const validation = validateContactForm({ name, email, message });

    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      if (!validation.name.isValid && validation.name.error) {
        errors.name = validation.name.error;
      }
      if (!validation.email.isValid && validation.email.error) {
        errors.email = validation.email.error;
      }
      if (!validation.message.isValid && validation.message.error) {
        errors.message = validation.message.error;
      }

      return NextResponse.json(
        {
          success: false,
          errors,
        },
        {
          status: 400,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Email service is not configured. Please try again later.',
        },
        {
          status: 500,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    // Send email using Resend
    try {
      await resend!.emails.send({
        from: 'Portfolio Contact <noreply@notification.blogsage.in>',
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #6b7280; font-size: 14px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Message sent successfully',
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send message. Please try again later.',
        },
        {
          status: 500,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
