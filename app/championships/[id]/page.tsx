import { ReactNode } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/legacy/image";

interface ChampionshipPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChampionshipPage({ params }: ChampionshipPageProps): Promise<ReactNode> {
  const resolvedParams = await params;
  const championship = await prisma.championship.findUnique({
    where: {
      id: parseInt(resolvedParams.id)
    }
  });

  if (!championship) {
    notFound();
  }

  return (
    <main className="min-h-screen p-10">
      <div className="bg-white/50 p-4 rounded-md">
        {championship.name}
      </div>
    </main>
  );
}
