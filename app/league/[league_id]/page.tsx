import React from 'react';
import {PrismaClient} from "@prisma/client";
// import {isAdmin} from "@/utils/admin";
import Link from "next/link";
import Image from "next/legacy/image";
import OurSponsors from "@/app/our-sponsors";
import prisma from "@/lib/prisma";
import {auth} from "@/auth";

type leagueProps = {
  params: Promise<{
    league_id: string
  }>
}

const Page = async ({params}: leagueProps) => {
  const league_id = (await params).league_id;
  const league = await prisma.league.findUniqueOrThrow({
    where: {
      id: parseInt(league_id),
    },
    include: {
      Series: true,
    },
  })
  const session = await auth()
  if (!session){
    return <div>You must be logged in to view this page</div>}
  const {user} = session;

  return (
    <div className="mx-auto max-w-4xl w-screen p-5">

      <div className="flex flex-col items-center">

        <h1 className={"text-4xl text-center"}>{league.name}</h1>
        {league.discord  && <Link href={league.discord}
               className={"bg-[#5865F2] px-5 py-2 relative flex rounded-full max-w-[195px] mt-3"}>
          <Image src={"/assets/discord-logo-white.svg"} alt={"Join us on discord"} width={158} height={30}/>
        </Link>}
      </div>
      <div className="flex gap-5 items-center">
        <h2 className={"text-2xl"}>Active Series</h2>
        {/*{(await isAdmin()) && <Link className={"border-2 border-l-orange-600 px-2 rounded-sm  hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"} href={`/series/new?league_id=${league_id}`}>Add Series</Link>}*/}
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
      <OurSponsors league={league.id} />
    </div>
  )
}

export default Page