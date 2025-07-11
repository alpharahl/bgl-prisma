import React from 'react';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import isAdmin from "@/lib/isAdmin";
import ChampionshipEditForm from "./championship-edit-form";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function ChampionshipEditPage({ params }: Props) {
  const session = await auth();
  if (!session || !(await isAdmin())) {
    redirect("/");
  }

  const championship = await prisma.series.findUnique({
    where: {
      id: parseInt(params.id)
    },
    include: {
      cars: true,
      sections: true
    }
  });

  if (!championship) {
    redirect("/championships");
  }

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-400">Edit {championship.name}</h1>
          <Link
            href="/championships"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Back to Championships
          </Link>
        </div>
        <ChampionshipEditForm championship={championship} />
      </div>
    </main>
  );
}
