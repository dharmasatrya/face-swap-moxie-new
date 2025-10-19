// ============================================
// app/api/route.ts
// GET /api - Root test endpoint
// ============================================
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: '🧠 Face Swap backend running with Next.js 15!' 
  });
}
