'use server'

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import isAdmin from "@/lib/isAdmin";
import { revalidatePath } from "next/cache";

export async function createChampionship(name: string, discordOverviewChannel: string) {
    const session = await auth();
    if (!session || !await isAdmin()) {
        throw new Error("Unauthorized");
    }

    const championship = await prisma.championship.create({
        data: {
            name,
            discordOverviewChannel
        }
    });

    revalidatePath('/championships');
    return championship;
}

export async function getChampionship(id: number) {
    return await prisma.championship.findUnique({
        where: { id }
    });
}

export async function getAllChampionships() {
    return await prisma.championship.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function updateChampionship(id: number, data: { name?: string, discordOverviewChannel?: string }) {
    const session = await auth();
    if (!session || !await isAdmin()) {
        throw new Error("Unauthorized");
    }

    const championship = await prisma.championship.update({
        where: { id },
        data
    });

    revalidatePath('/championships');
    return championship;
}

export async function deleteChampionship(id: number) {
    const session = await auth();
    if (!session || !await isAdmin()) {
        throw new Error("Unauthorized");
    }

    await prisma.championship.delete({
        where: { id }
    });

    revalidatePath('/championships');
}
