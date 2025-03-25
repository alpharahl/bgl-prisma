'use server'

import {isAdmin} from "@/utils/admin";
import {PrismaClient} from "@prisma/client";
import prisma from "@/lib/prisma";

export const createNewSeries = async (data: { name: string, logo: string, league_id: string }) => {
  'use server'
  console.log(data)
  if ((await isAdmin())) {
    const league = await prisma.league.findUniqueOrThrow({
      where: {
        id: parseInt(data.league_id),
      },
    })
    console.log('league', league)
    return await prisma.series.create({
      data: {
        leagueId: league.id,
        name: data.name,
        logo: data.logo,
      },
    })
  }
}