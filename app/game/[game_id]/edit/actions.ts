'use server'

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (values: {name: string, logo: File}, game: any) => {
  "use server"
  console.log(values)
  await prisma.game.update({
    where: {
      id: game.id
    },
    data: {
      logo: await values.logo.bytes()
    }
  })
}

export { handler }