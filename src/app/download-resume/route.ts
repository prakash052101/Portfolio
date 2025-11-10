import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { RESUME_CONFIG } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    // Path to the resume file in the public directory
    const resumePath = join(
      process.cwd(),
      'public',
      'resume',
      RESUME_CONFIG.filename
    );

    // Read the PDF file
    const fileBuffer = await readFile(resumePath);

    // Create response with proper headers for PDF download
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${RESUME_CONFIG.filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });

    return response;
  } catch (error) {
    console.error('Error serving resume:', error);

    // Return 404 if file not found or other error
    return new NextResponse('Resume not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Optional: Handle HEAD requests for checking if file exists
export async function HEAD(request: NextRequest) {
  try {
    const resumePath = join(
      process.cwd(),
      'public',
      'resume',
      RESUME_CONFIG.filename
    );
    await readFile(resumePath);

    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse(null, { status: 404 });
  }
}
