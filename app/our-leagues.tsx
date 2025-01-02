import React from 'react';
import {PrismaClient} from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const OurLeagues = async () => {
  const prisma = new PrismaClient();
  const leagues = await prisma.league.findMany({
    select: {
      name: true,
      logo: true,
      id: true,
      game: true
    },
  });
  return (
    <div className="text-center flex flex-col w-full gap-10">
      <h2 className="mx-auto text-3xl">Our Leagues</h2>
      <div className="flex flex-wrap gap-10 justify-around items-center mx-10">
        {leagues.map(league => (
          <Link
            href={`/league/${league.id}`} key={league.id}
            className={"flex flex-col items-center gap-3 border-2 p-3 rounded-lg transition-colors duration-200 hover:border-slate-400 hover:bg-slate-100"}
          >
            <div className="relative w-full h-[300px]">
              {league.logo && <Image src={league.logo} alt={`${league.name} logo`} fill objectFit="contain" />}
            </div>
            <h3 className="text-2xl">{league.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default OurLeagues