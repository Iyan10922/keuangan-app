import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            daffa
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Manajemen Keuangan
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Silakan masuk ke akun admin
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="admin@email.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Kata sandi
            </label>

            <input
              id="password"
              type="password"
              placeholder="Masukkan kata sandi"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <Link
  href="/dashboard"
  className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
>
  Masuk
</Link>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Aplikasi Keuangan Pribadi
        </p>
      </div>
    </main>
  );
}