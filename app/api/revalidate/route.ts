import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// This should be set in your environment variables for security
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret for security
    const signature = request.headers.get("x-sanity-signature");
    const secret = request.headers.get("x-sanity-webhook-secret");

    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { _type, slug, _id } = body;

    console.log("Webhook received:", { _type, slug, _id });

    // Revalidate specific tags and paths based on content type
    switch (_type) {
      case "company":
        // Revalidate company cache tags
        revalidateTag("companies");
        revalidateTag("homepage-companies");
        // Revalidate the home page where companies are displayed
        revalidatePath("/");
        console.log("Revalidated companies and home page");
        break;

      case "hero":
        // Revalidate hero slides cache tag
        revalidateTag("hero-slides");
        // Revalidate the home page where hero is displayed
        revalidatePath("/");
        console.log("Revalidated hero slides and home page");
        break;

      case "blog":
        // Revalidate all blog-related cache tags
        revalidateTag("blog-posts");
        revalidateTag("blog-list");

        // If we have a slug, revalidate the specific blog post tag
        if (slug?.current) {
          revalidateTag(`blog-${slug.current}`);
          // Also revalidate the specific path for immediate updates
          revalidatePath(`/insights/blogs/${slug.current}`);
          console.log(`Revalidated blog post: /insights/blogs/${slug.current}`);
        }

        // Revalidate the blogs listing page
        revalidatePath("/insights/blogs");

        // Revalidate the home page if blogs are featured there
        revalidatePath("/");
        break;

      case "category":
        // Revalidate categories cache tag
        revalidateTag("categories");
        // Revalidate blogs page when categories change
        revalidatePath("/insights/blogs");
        break;

      case "author":
        // Revalidate authors cache tag
        revalidateTag("authors");
        // Revalidate blogs page when authors change
        revalidatePath("/insights/blogs");
        break;

      case "gallery":
        // Revalidate gallery cache tag
        revalidateTag("gallery-items");
        // Revalidate gallery pages
        revalidatePath("/about/gallery");
        break;

      case "testimonial":
        // Revalidate testimonials cache tags
        revalidateTag("testimonials");
        revalidateTag("featured-testimonials");
        // Revalidate the customer stories page where testimonials are displayed
        revalidatePath("/about/customer-stories");
        // Also revalidate home page if testimonials appear there
        revalidatePath("/");
        console.log("Revalidated testimonials and customer stories page");
        break;

      case "person":
        // Revalidate team members cache tags
        revalidateTag("team-members");
        revalidateTag("leadership-team");
        revalidateTag("management-team");
        // Revalidate the our people page where team members are displayed
        revalidatePath("/about/our-people");
        // Also revalidate home page if team members appear there
        revalidatePath("/");
        console.log("Revalidated team members and our people page");
        break;

      default:
        // For any other content type, revalidate the home page
        revalidatePath("/");
        console.log(`Revalidated unknown content type: ${_type}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      contentType: _type,
      slug: slug?.current || null,
      message: `Successfully revalidated content for type: ${_type}`,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: "Sanity webhook endpoint is active and ready to receive updates",
    timestamp: new Date().toISOString(),
    endpoint: "/api/revalidate",
  });
}
