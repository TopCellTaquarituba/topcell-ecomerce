const defaultAuthorizeUrl = "https://www.bling.com.br/Api/v3/oauth/authorize";

export function getBlingAuthUrl() {
  const clientId = process.env.BLING_CLIENT_ID;
  const state = process.env.BLING_OAUTH_STATE ?? "topcell-state";
  const redirectUri =
    process.env.BLING_REDIRECT_URI ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/integrations/bling/callback`;

  if (!clientId) {
    return null;
  }

  const authorizeUrl = new URL(process.env.BLING_OAUTH_AUTHORIZE_URL ?? defaultAuthorizeUrl);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("state", state);
  if (redirectUri) {
    authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  }

  return authorizeUrl.toString();
}

export function getBlingCredentials() {
  return {
    clientId: process.env.BLING_CLIENT_ID ?? "",
    clientSecret: process.env.BLING_CLIENT_SECRET ?? "",
  };
}
