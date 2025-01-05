import React from 'react';
import {PrismaClient} from "@prisma/client";
import NewSeriesForm from "@/app/series/new/new-series-form";

type pageProps = {
  searchParams: Promise<{league_id: string}>
}

const Page = async ({searchParams}: pageProps) => {
  const league_id = (await searchParams).league_id;
  const prisma = new PrismaClient()
  const league = await prisma.league.findUniqueOrThrow({
    where: {
      id: parseInt(league_id)
    }
  })
  return (
    <div className={"max-w-2xl mx-auto w-screen"}>
      <h1>Create Series For {league.name}</h1>
      <NewSeriesForm league={league}/>
    </div>
  )
}

export default Page