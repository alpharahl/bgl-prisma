import React from 'react';
import {Prisma} from "@prisma/client";
import SponsorWhereInput = Prisma.SponsorWhereInput;
import Link from "next/link";
import Image from "next/image";
import {isAdmin} from "@/utils/admin";
import prisma from "@/lib/prisma";

type ourSponsorsProps = {
  league?: number;
}

const OurSponsors = async ({league}: ourSponsorsProps) => {
  const where: SponsorWhereInput = {}
  if (league) {
    where.leagueId = league
  }
  if (!(await isAdmin())){
    where.league?.hidden != true
  }
  const sponsors = await prisma.sponsor.findMany({
    where,
  })
  if (sponsors.length === 0){return};
  return (
    <div className="w-full border-t-2 border-t-orange-600">

      <div
        className={"mx-auto w-screen max-w-xl flex flex-col gap-5 my-10 items-center "}>
        <h2 className={"text-3xl bold "}>Our Partners</h2>
        <div className={"flex flex-wrap gap-5 justify-around"}>
          {sponsors.map((sponsor) => {
            return <Link href={sponsor.link} className={"flex flex-col items-center gap-3 p-3 rounded-md border-2 border-slate-200 duration-200 transition-colors hover:bg-slate-200 hover:border-slate-400"} key={sponsor.id}>
              <Image src={sponsor.logo} alt={`${sponsor.name} logo`} width={250} height={250} objectFit="cover" />
              <div>{sponsor.name}</div>
            </Link>
          })}
        </div>
      </div>
    </div>
  )
}

export default OurSponsors