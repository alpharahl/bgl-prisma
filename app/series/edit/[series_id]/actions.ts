'use server'

import {PrismaClient} from "@prisma/client";
import prisma from "@/lib/prisma";

export const editSeries = async (seriesData: {name: string, description: string | null, logo: string, id: number})=> {
  // 'use server'
  // if (!isAdmin()){return}
  // await prisma.series.update({
  //   where: {
  //     id: seriesData.id,
  //   },
  //   data: {
  //     name: seriesData.name,
  //     description: seriesData.description,
  //     logo: seriesData.logo,
  //   }
  // })
}