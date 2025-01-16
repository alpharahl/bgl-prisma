'use server'

import {Prisma, PrismaClient} from "@prisma/client";
import EventCreateInput = Prisma.EventCreateInput;
import {isAdmin} from "@/utils/admin";


export const addEvent = async (data: EventCreateInput) => {
  'use server'
  if (!isAdmin()){return;}
  const prisma = new PrismaClient();
  await prisma.event.create({
    data
  })
}