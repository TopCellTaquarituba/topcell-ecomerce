import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = process.env.BLING_OAUTH_STATE;

  if (!code) {
    return NextResponse.redirect(
      new URL("/admin/import?status=error&message=missing_code", process.env.NEXT_PUBLIC_SITE_URL ?? url.origin),
    );
  }

  if (expectedState && state !== expectedState) {
    return NextResponse.redirect(
      new URL("/admin/import?status=error&message=invalid_state", process.env.NEXT_PUBLIC_SITE_URL ?? url.origin),
    );
  }

  const redirectUrl = new URL("/admin/import", process.env.NEXT_PUBLIC_SITE_URL ?? url.origin);
  redirectUrl.searchParams.set("status", "success");
  redirectUrl.searchParams.set("code", code);

  return NextResponse.redirect(redirectUrl);
}
