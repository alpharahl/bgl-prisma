'use server'

import {isAdmin} from "@/utils/admin";
import {PrismaClient} from "@prisma/client";

export const editSeries = async (seriesData: {name: string, description: string | null, logo: string, id: number})=> {
  'use server'
  if (!isAdmin()){return}
  const prisma = new PrismaClient()
  await prisma.series.update({
    where: {
      id: seriesData.id,
    },
    data: {
      name: seriesData.name,
      description: seriesData.description,
      logo: seriesData.logo,
    }
  })
}