// ============================================
// app/api/faceswap/route.ts - Updated
// ============================================
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface FaceSwapRequest {
  swap_image: string;  // User's face URL
  input_image: string; // Activity base image URL
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

    console.log('🔄 Starting face swap...');
    console.log('👤 User face:', swap_image);
    console.log('🎯 Target image:', input_image);

    // Run face swap
    const output = await replicate.run(
      'cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111',
      {
        input: {
          swap_image,   // person whose face will be transferred
          input_image,  // base/body image to receive the face
        },
      }
    );

    console.log('✅ Raw AI Output:', output);

    // Handle different output formats
    let resultUrl: string | null = null;
    
    if (typeof output === 'string') {
      resultUrl = output;
    } else if (output && typeof output === 'object') {
      const urlObject = (output as any).url?.() || (output as any).url;
      resultUrl = urlObject?.href || urlObject || null;
    }

    if (resultUrl) {
      console.log('✅ Output URL:', resultUrl);
      return NextResponse.json({ url: resultUrl });
    } else {
      console.error('❌ Unexpected output format:', output);
      return NextResponse.json({ 
        error: 'Unexpected output format', 
        output 
      }, { status: 500 });
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