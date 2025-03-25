'use server'

import {Prisma, PrismaClient} from "@prisma/client";
import EventCreateInput = Prisma.EventCreateInput;
import {isAdmin} from "@/utils/admin";
import prisma from "@/lib/prisma";


export const addEvent = async (data: EventCreateInput) => {
  'use server'
  if (!isAdmin()){return;}
  await prisma.event.create({
    data
  })
}