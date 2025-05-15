import { auth } from "@/auth";
import prisma from "@/lib/prisma";


export const isAdmin = async () => {
  const session = await auth();
  if (!session || !session.user){return false}
  const admin = await prisma.admins.findUnique({
    where: {
      id: session.user.email ? session.user.email : undefined,
    }
  })
  return !!admin;

}