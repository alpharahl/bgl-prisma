import {currentUser} from "@clerk/nextjs/server";
import {PrismaClient} from "@prisma/client";


export const isAdmin = async () => {
  const user = await currentUser();
  if (!user){return false}
  const prisma = new PrismaClient();
  const admin = await prisma.admins.findUnique({
    where: {
      id: user.id,
    }
  })
  return !!admin;

}