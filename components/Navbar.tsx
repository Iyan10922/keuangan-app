"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Laptop,
  Loader2,
  LogOut,
  Moon,
  Sun,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark" | "system";

const themeSequence: ThemeMode[] = [
  "system",
  "light",
  "dark",
];

const themeLabels: Record<ThemeMode, string> = {
  light: "Terang",
  dark: "Gelap",
  system: "Sistem",
};

export default function Navbar() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const { theme, setTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!isActive) {
        return;
      }

      if (error) {
        console.error("Gagal memuat pengguna:", error.message);
        return;
      }

      setEmail(user?.email ?? "");
    }

    void loadUser();

    return () => {
      isActive = false;
    };
  }, [supabase]);

  function changeTheme() {
    const currentTheme: ThemeMode =
      theme === "light" ||
      theme === "dark" ||
      theme === "system"
        ? theme
        : "system";

    const currentIndex =
      themeSequence.indexOf(currentTheme);

    const nextTheme =
      themeSequence[
        (currentIndex + 1) % themeSequence.length
      ];

    setTheme(nextTheme);
  }

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Gagal keluar dari akun", {
        description: error.message,
      });

      setIsLoggingOut(false);
      return;
    }

    toast.success("Berhasil keluar dari akun.");

    router.replace("/login");
    router.refresh();
  }

  function renderThemeIcon() {
    if (!mounted) {
      return (
        <span className="size-4" aria-hidden="true" />
      );
    }

    if (theme === "light") {
      return <Sun className="size-4" />;
    }

    if (theme === "dark") {
      return <Moon className="size-4" />;
    }

    return <Laptop className="size-4" />;
  }

  const currentThemeLabel =
    mounted &&
    (theme === "light" ||
      theme === "dark" ||
      theme === "system")
      ? themeLabels[theme]
      : "Tema";

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <WalletCards className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-bold tracking-tight">
              Manajemen Keuangan
            </p>

            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              Kelola keuangan dengan lebih teratur
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {email && (
            <div className="hidden max-w-64 text-right lg:block">
              <p className="text-xs text-muted-foreground">
                Masuk sebagai
              </p>

              <p className="truncate text-sm font-medium">
                {email}
              </p>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!mounted}
            onClick={changeTheme}
            aria-label={`Tema saat ini: ${currentThemeLabel}. Ganti tema`}
            title={`Tema: ${currentThemeLabel}`}
          >
            {renderThemeIcon()}

            <span className="hidden sm:inline">
              {currentThemeLabel}
            </span>
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={isLoggingOut}
            onClick={handleLogout}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="animate-spin" />
                <span className="hidden sm:inline">
                  Keluar...
                </span>
              </>
            ) : (
              <>
                <LogOut />
                <span className="hidden sm:inline">
                  Keluar
                </span>
              </>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}