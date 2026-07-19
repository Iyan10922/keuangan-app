"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    }

    loadUser();
  }, [supabase]);

  async function handleLogout() {
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
          Halo, {email}
        </span>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}