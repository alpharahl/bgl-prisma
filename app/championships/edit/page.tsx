import React from 'react';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import isAdmin from "@/lib/isAdmin";

export default async function ChampionshipsEditPage() {
  const session = await auth();
  if (!session || !(await isAdmin())) {
    redirect("/");
  }

  const championships = await prisma.series.findMany({
    include: {
      cars: true,
      sections: true
    },
    orderBy: {
      order: 'asc',
    }
  });

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-400 mb-6">Edit Championships</h1>
        <div className="space-y-6">
          {championships.map(championship => (
            <ChampionshipEditForm 
              key={championship.id} 
              championship={championship}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
