import React from 'react';
import {PrismaClient} from "@prisma/client";
import {currentUser} from "@clerk/nextjs/server";
import {isAdmin} from "@/utils/admin";
import Link from "next/link";

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
      id: parseInt(league_id),
    },
    include: {
      Series: true,
    },
  })
  const user = await currentUser()

  return (
    <div className="mx-auto max-w-4xl w-screen">

      <h1 className={"text-4xl text-center"}>{league.name}</h1>
      <div className="flex gap-5 items-center">
        <h2 className={"text-2xl"}>Active Series</h2>
        {(await isAdmin()) && <Link className={"border-b-2 hover:border-slate-300"} href={`/series/new?league_id=${league_id}`}>Add Series</Link>}
      </div>
      {league.Series?.map(series => {
        return <div key={series.id}>
          {series.name}
        </div>
      })}
    </div>
  )
}

export default Page