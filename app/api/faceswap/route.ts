// ============================================
// app/api/faceswap/route.ts
// POST /api/faceswap - Face swap processing endpoint
// ============================================
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { readFile } from 'fs/promises';
import path from 'path';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface FaceSwapRequest {
  swap_image: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FaceSwapRequest = await request.json();
    const { swap_image } = body;

    if (!swap_image) {
      return NextResponse.json(
        { error: 'Missing swap_image' },
        { status: 400 }
      );
    }

    // Read the input image
    const imagePath = path.join(process.cwd(), 'public', 'uploads', 'image.png');
    const input_image = await readFile(imagePath);

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
    const urlObject = typeof output === 'object' && output !== null 
      ? (output as any).url?.() || (output as any).url 
      : output;
    const resultUrl = urlObject?.href || output || null;

    if (resultUrl) {
      console.log('✅ Output URL:', resultUrl);
      return NextResponse.json({ url: resultUrl });
    } else {
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