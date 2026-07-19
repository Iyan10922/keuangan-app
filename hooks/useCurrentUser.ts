"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

type UseCurrentUserResult = {
  user: User | null;
  isLoading: boolean;
};

export default function useCurrentUser(): UseCurrentUserResult {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadCurrentUser() {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (!isActive) {
        return;
      }

      if (error) {
        console.error(
          "Gagal mengambil data pengguna:",
          error.message,
        );

        setUser(null);
        setIsLoading(false);
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    }

    void loadCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isActive) {
          return;
        }

        setUser(session?.user ?? null);
        setIsLoading(false);
      },
    );

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return {
    user,
    isLoading,
  };
}