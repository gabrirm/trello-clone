import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // if the user is logged in and is on a public route
    if (auth?.userId && auth?.isPublicRoute) {
      let path = "/select-org";

      if (auth?.orgId) {
        path = `/organization/${auth?.orgId}`;
      }
      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }
    // if the user is not logged in and is not on a public route
    if (!auth?.userId && !auth?.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // if the user is logged but he hasn't selected an organization and is not on the organization selection page
    if (
      auth?.userId &&
      req.nextUrl.pathname !== "/select-org" &&
      !auth?.orgId
    ) {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
