"use client";

import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Test The Hype — Admin</h1>
          <button
            onClick={() => signOut({ redirectTo: "/login" })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard coming soon</h2>
          <p className="mt-2 text-gray-500">
            You&apos;re logged in! The full CMS dashboard will be built in Phase 4.
          </p>
        </div>
      </main>
    </div>
  );
}
