import { NextResponse, type NextRequest } from "next/server";

/**
 * Multi-domain routing for the Ghana site.
 *
 * Requests to ghana.kimberly-ryan.com are rewritten to the /ghana route, so
 * that domain's homepage is the Ghana landing page. Everything else continues
 * to serve the main Kimberly Ryan website unchanged.
 *
 * The main domain's /ghana URL permanently redirects to the Ghana domain to
 * avoid duplicate content. Preview deployments (*.vercel.app) keep working at
 * /ghana because they do not match the host lists below.
 */

const GHANA_BASE_PATH = "/ghana";
const GHANA_CANONICAL_HOST = "ghana.kimberly-ryan.com";

const GHANA_HOSTS = new Set(
  (
    process.env.GHANA_HOSTS ??
    "ghana.kimberly-ryan.com,www.ghana.kimberly-ryan.com,ghana.localhost"
  )
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
);

const MAIN_HOSTS = new Set(["kimberly-ryan.com", "www.kimberly-ryan.com"]);

function getHostname(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? "";
  return host.split(":")[0].toLowerCase();
}

export function middleware(request: NextRequest) {
  const hostname = getHostname(request);
  const { pathname, search } = request.nextUrl;
  const isGhanaPath =
    pathname === GHANA_BASE_PATH || pathname.startsWith(`${GHANA_BASE_PATH}/`);

  // Send the main domain's /ghana URL to the canonical Ghana homepage.
  if (MAIN_HOSTS.has(hostname) && isGhanaPath) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = "https:";
    redirectUrl.host = GHANA_CANONICAL_HOST;
    redirectUrl.port = "";
    redirectUrl.pathname = pathname.replace(GHANA_BASE_PATH, "") || "/";
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (!GHANA_HOSTS.has(hostname)) {
    return NextResponse.next();
  }

  // Already on the Ghana route (including internal rewrites): leave it alone.
  if (isGhanaPath) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname =
    pathname === "/" ? GHANA_BASE_PATH : `${GHANA_BASE_PATH}${pathname}`;
  rewriteUrl.search = search;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    // Run on pages, but skip API routes, Next internals, the Sanity Studio and
    // anything that looks like a static file.
    "/((?!api|_next/static|_next/image|favicon.ico|studio|images|.*\\..*).*)",
  ],
};
