import React from 'react';
import {PrismaClient} from "@prisma/client";

type leagueProps = {
  params: Promise<{
    league_id: string
  }>
}

const Page = async ({params}: leagueProps) => {
  const prisma = new PrismaClient();
  const league_id = (await params).league_id;
  const league = await prisma.league.findUniqueOrThrow({
    where: {
      id: parseInt(league_id)
    }
  })
  return (
    <div>{league.name}</div>
  )
}

export default Page