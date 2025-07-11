'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import isAdmin from "@/lib/isAdmin";
import { revalidatePath } from "next/cache";

export async function updateChampionship({ id, name, order }: { 
  id: number; 
  name: string; 
  order: number;
}) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await prisma.series.update({
    where: { id },
    data: { name, order }
  });

  revalidatePath('/championships');
  revalidatePath(`/championships/${id}/edit`);
}

export async function updateSection({ id, title, content }: {
  id: number;
  title: string;
  content: string[];
}) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await prisma.seriesSection.update({
    where: { id },
    data: { title, content }
  });

  revalidatePath('/championships');
}

export async function deleteSection({ id }: { id: number }) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await prisma.seriesSection.delete({
    where: { id }
  });

  revalidatePath('/championships');
}

export async function addSection({ seriesId, title, content }: {
  seriesId: number;
  title: string;
  content: string[];
}) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const section = await prisma.seriesSection.create({
    data: {
      seriesId,
      title,
      content
    }
  });

  revalidatePath('/championships');
  
  return section;
}

export async function deleteChampionship({ id }: { id: number }) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  // First delete all sections
  await prisma.seriesSection.deleteMany({
    where: {
      seriesId: id
    }
  });

  // Then delete the championship
  await prisma.series.delete({
    where: { id }
  });

  revalidatePath('/championships');
}
