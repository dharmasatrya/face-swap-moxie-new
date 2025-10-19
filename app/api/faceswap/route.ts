// ============================================
// app/api/faceswap/route.ts - Using Public URLs
// ============================================
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

// Verify API token is loaded
if (!process.env.REPLICATE_API_TOKEN) {
  console.error('❌ REPLICATE_API_TOKEN is not set in environment variables');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface FaceSwapRequest {
  swap_image: string;  // User's face URL (from Vercel Blob)
  input_image: string; // Activity image URL (from public folder)
}

export async function POST(request: NextRequest) {
  try {
    const body: FaceSwapRequest = await request.json();
    const { swap_image, input_image } = body;

    if (!swap_image || !input_image) {
      return NextResponse.json(
        { error: 'Missing swap_image or input_image' },
        { status: 400 }
      );
    }

    // Get the full URL for the activity image
    const baseUrl = request.nextUrl.origin;
    const fullInputImageUrl = input_image.startsWith('http') 
      ? input_image 
      : `${baseUrl}${input_image}`;

    console.log('🔄 Starting face swap...');
    console.log('👤 User face URL:', swap_image);
    console.log('🎯 Target image URL:', fullInputImageUrl);

    // Run face swap using replicate.run() with public URLs
    const output = await replicate.run(
      "cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111",
      {
        input: {
          swap_image,          // User's uploaded selfie (from Vercel Blob)
          input_image: fullInputImageUrl,  // Activity image (from public folder)
        },
      }
    );

    console.log('✅ Raw AI Output:', output);

    // Handle output according to official API reference
    const urlObject = (output as any)?.url?.() || (output as any)?.url;
    const resultUrl = urlObject?.href || urlObject || output || null;

    if (resultUrl && typeof resultUrl === 'string') {
      console.log('✅ Output URL:', resultUrl);
      return NextResponse.json({ url: resultUrl });
    } else {
      console.log('⚠️ Unexpected output format, returning raw output');
      return NextResponse.json({ 
        message: 'Unexpected output format', 
        output
      });
    }

  } catch (err) {
    console.error('❌ Error during face swap:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Face swap failed', details: errorMessage },
      { status: 500 }
    );
  }
}