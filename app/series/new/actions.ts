'use server'

import {isAdmin} from "@/utils/admin";
import {PrismaClient} from "@prisma/client";

export const createNewSeries = async (data: {name: string, logo: string, league_id: string}) => {
  'use server'
  const prisma = new PrismaClient()
  console.log(data)
  if ((await isAdmin())){
    const league = await prisma.league.findUniqueOrThrow({
      where: {
        id: parseInt(data.league_id)
      }
    })
    console.log('league', league)
    await prisma.league.update({
      where: {
        id: league.id
      },
      data: {
        Series: {
          create: {
            name: data.name,
            logo: data.logo
          }
        }
      }
    })
  }
}