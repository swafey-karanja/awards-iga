"use client";

import { AwardCategory } from "@/lib/types";
import { useState, useEffect, useCallback } from "react";
import { fetchAwardsCategories } from "../services/api";

interface UseAwardsCategoriesState {
  categories: AwardCategory[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAwardsCategories(): UseAwardsCategoriesState {
  const [categories, setCategories] = useState<AwardCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { categories } = await fetchAwardsCategories();
      setCategories(categories);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching categories.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { categories, isLoading, error, refetch: load };
}
