import React from 'react';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import isAdmin from "@/lib/isAdmin";
import NewChampionshipForm from "./new-championship-form";
import Link from "next/link";

export default async function NewChampionshipPage() {
  const session = await auth();
  if (!session || !(await isAdmin())) {
    redirect("/");
  }

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-400">New Championship</h1>
          <Link
            href="/championships"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Back to Championships
          </Link>
        </div>
        <NewChampionshipForm />
      </div>
    </main>
  );
}
