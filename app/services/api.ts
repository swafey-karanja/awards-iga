import { AwardCategoriesResponse, AwardCategory } from "@/lib/types";

// config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
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
    `${API_CONFIG.BASE_URL}security/csrf-token/`,
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

interface FetchCategoriesResult {
  categories: AwardCategory[];
}

export async function fetchAwardsCategories(): Promise<FetchCategoriesResult> {
  const response = await fetch(`${API_CONFIG.BASE_URL}awards/categories/`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes (Next.js only — safe to remove outside Next.js)
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch awards categories: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  // The API may return an array directly or wrapped in an object — handle both
  const raw: unknown[] = Array.isArray(data)
    ? data
    : (data?.categories ?? data?.results ?? []);

  // Sort by priority ascending so lower numbers appear first
  const categories = (raw as AwardCategory[]).sort(
    (a, b) => a.priority - b.priority,
  );

  console.log({ categories });

  return { categories };
}
