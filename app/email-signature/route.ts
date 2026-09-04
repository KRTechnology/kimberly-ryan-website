import { NextResponse } from 'next/server';

// Change this whenever you want to update the destination for ALL signatures
const DESTINATION_URL = 'https://www.kimberly-ryan.com/services/learning-development';

export async function GET() {
  return NextResponse.redirect(DESTINATION_URL, { status: 302 });
}
