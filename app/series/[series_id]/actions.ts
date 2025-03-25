'use server'

import {isAdmin} from "@/utils/admin";
import {PrismaClient} from "@prisma/client";
import prisma from "@/lib/prisma";

export const deleteSeries = async (data: {series_id: number}) => {
  'use server'
  if (!isAdmin()){return}

  await prisma.series.delete({
    where: {
      id: data.series_id
    }
  })
}