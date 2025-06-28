import { NextRequest, NextResponse } from "next/server";
import { getWebinarsPaginated } from "@/lib/sanity";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "3");

    // Validate parameters
    if (offset < 0 || limit < 1 || limit > 10) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const result = await getWebinarsPaginated(offset, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    return NextResponse.json(
      { error: "Failed to fetch webinars" },
      { status: 500 }
    );
  }
}
