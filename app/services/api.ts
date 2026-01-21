// config/api.ts
export const API_CONFIG = {
  BASE_URL: "https://events.igamingafrika.com/api",
  TOKEN: process.env.NEXT_PUBLIC_API_TOKEN as string | undefined,
};

interface RawCsrfTokenResponse {
  csrf_token: string;
  expires_in: number;
  message: string;
}

interface CsrfTokenResponse {
  csrfToken: string;
}

export async function fetchCSRFToken(): Promise<CsrfTokenResponse> {
  const tokenResponse = await fetch(
    `${API_CONFIG.BASE_URL}/security/csrf-token/`,
    // {
    //   credentials: "include",
    // }
  );

  if (!tokenResponse.ok) {
    throw new Error("Failed to get CSRF token");
  }

  const data = (await tokenResponse.json()) as RawCsrfTokenResponse;

  return {
    csrfToken: data.csrf_token,
  };
}
