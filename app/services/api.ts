// config/api.ts
export const API_CONFIG = {
  BASE_URL: "https://events.igamingafrika.com/api",
  TOKEN: process.env.NEXT_PUBLIC_API_TOKEN as string | undefined,
};

interface CsrfTokenResponse {
  csrfToken: string;
}

export async function fetchCSRFToken(): Promise<CsrfTokenResponse> {
  const tokenResponse = await fetch(
    `${API_CONFIG.BASE_URL}/security/csrf-token/`
    // {
    //   credentials: "include", // important if backend uses cookies
    // }
  );

  if (!tokenResponse.ok) {
    throw new Error("Failed to get CSRF token");
  }

  return (await tokenResponse.json()) as CsrfTokenResponse;
}
