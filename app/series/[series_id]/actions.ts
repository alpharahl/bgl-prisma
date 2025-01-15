'use server'

import {isAdmin} from "@/utils/admin";
import {PrismaClient} from "@prisma/client";

export const deleteSeries = async (data: {series_id: number}) => {
  'use server'
  if (!isAdmin()){return}
  const prisma = new PrismaClient()

  await prisma.series.delete({
    where: {
      id: data.series_id
    }
  })
}