import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/email-signature/banner.gif');
  const file = await readFile(filePath);

  return new NextResponse(file, {
    headers: {
      'Content-Type': 'image/gif',
      // Prevent email clients / CDNs from aggressively caching a stale banner
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
}
