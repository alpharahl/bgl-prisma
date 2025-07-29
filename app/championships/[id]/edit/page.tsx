import React from 'react';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import isAdmin from "@/lib/isAdmin";
import { deleteChampionship } from "./actions";
import ChampionshipEditForm from "./championship-edit-form";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function ChampionshipEditPage({ params: paramsPromise }: { params: Promise<Props['params']> }) {
  const params = await paramsPromise;
  const session = await auth();
  if (!session || !(await isAdmin())) {
    redirect("/");
  }

  const championship = await prisma.championship.findUnique({
    where: {
      id: parseInt(params.id)
    },
    // include: {
    //   cars: true,
    //   sections: true
    // }
  });

  if (!championship) {
    redirect("/championships");
  }

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-400">Edit {championship.name}</h1>
          <div className="flex gap-2">
            <Link
              href="/championships"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Back to Championships
            </Link>
            <form action={async () => {
              'use server';
              await deleteChampionship({ id: parseInt(params.id) });
              redirect('/championships');
            }}>
              <button 
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                Delete Championship
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
