import { NextResponse, type NextRequest } from "next/server";
import { normalizeLocale } from "@/lib/i18n";

export function GET(request: NextRequest) {
  const locale = normalizeLocale(request.nextUrl.searchParams.get("lang"));
  const requestedNextPath = request.nextUrl.searchParams.get("next") || "/";
  const nextPath =
    requestedNextPath.startsWith("/") && !requestedNextPath.startsWith("//")
      ? requestedNextPath
      : "/";
  const redirectUrl = new URL(nextPath, request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set("locale", locale, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
