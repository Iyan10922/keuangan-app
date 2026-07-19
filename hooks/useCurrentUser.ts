"use client";

import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <nav className="flex items-center justify-between bg-blue-600 p-4 text-white shadow">
      <h1 className="text-xl font-bold">
        💰 Manajemen Keuangan
      </h1>

      <div className="flex items-center gap-4">
        <span className="hidden text-sm md:block">
          {isLoading
            ? "Memuat akun..."
            : `Halo, ${user?.email ?? "Pengguna"}`}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}