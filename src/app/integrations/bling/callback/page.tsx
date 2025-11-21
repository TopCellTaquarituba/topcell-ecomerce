import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    code?: string;
    state?: string;
  };
};

export const dynamic = "force-dynamic";

export default function BlingCallbackPage({ searchParams }: Props) {
  const { code, state } = searchParams;
  const expectedState = process.env.BLING_OAUTH_STATE;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const redirectUrl = new URL("/admin/import", baseUrl || "http://localhost:3000");

  if (!code) {
    redirectUrl.searchParams.set("status", "error");
    redirectUrl.searchParams.set("message", "missing_code");
    redirect(redirectUrl.toString());
  }

  if (expectedState && state !== expectedState) {
    redirectUrl.searchParams.set("status", "error");
    redirectUrl.searchParams.set("message", "invalid_state");
    redirect(redirectUrl.toString());
  }

  redirectUrl.searchParams.set("status", "success");
  redirectUrl.searchParams.set("code", code);
  redirect(redirectUrl.toString());
}
