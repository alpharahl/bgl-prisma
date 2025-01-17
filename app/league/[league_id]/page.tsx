import React from 'react';
import {PrismaClient} from "@prisma/client";
import {currentUser} from "@clerk/nextjs/server";
import {isAdmin} from "@/utils/admin";
import Link from "next/link";
import Image from "next/image";

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
        {(await isAdmin()) && <Link className={"border-2 border-l-orange-600 px-2 rounded-sm  hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"} href={`/series/new?league_id=${league_id}`}>Add Series</Link>}
      </div>
      <div className="flex flex-wrap gap-3 p-5">
        {league.Series?.map(series => {
          return <Link href={`/series/${series.id}`} key={series.id} className={"flex flex-col gap-3 p-5 border-2 border-slate-300 rounded-lg items-center hover:bg-slate-100 transition-colors duration-200"}>
            <Image src={`/${series.logo}`} alt={`${series.name} logo`} width={150} height={150} />
            <div>
              {series.name}
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Page