import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('selfie') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if we're in development (local) or production (Vercel)
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      // For local development, convert to base64 data URL
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const mimeType = file.type || 'image/jpeg';
      const dataUrl = `data:${mimeType};base64,${base64}`;
      
      console.log('✅ File converted to data URL (local dev)');
      return NextResponse.json({ selfieUrl: dataUrl });
    } else {
      // For production, upload to Vercel Blob Storage
      const blob = await put(file.name, file, {
        access: 'public',
      });

      console.log('✅ File uploaded to Vercel Blob:', blob.url);
      return NextResponse.json({ selfieUrl: blob.url });
    }
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}