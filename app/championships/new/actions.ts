'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import isAdmin from "@/lib/isAdmin";
import { revalidatePath } from "next/cache";

export async function createChampionship({ 
  name, 
  order, 
  logo,
  leagueId 
}: { 
  name: string; 
  order: number;
  logo: string;
  leagueId: number;
}) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await prisma.series.create({
    data: {
      name,
      order,
      logo,
      leagueId,
    }
  });

  revalidatePath('/championships');
}
