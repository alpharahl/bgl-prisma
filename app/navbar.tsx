import React from 'react';
import Image from "next/legacy/image";
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import prisma from '@/lib/prisma';

const Navbar = async () => {
  const leagues = await prisma.league.findMany({
    select: {
      id: true,
      acronymn: true,
    },
    where: {
      hidden: false
    },
    orderBy: {
      id: 'asc'
    }
  })
  return (
    <div className={"flex justify-between px-10 py-3 items-center"}>
      <Link href={"/"}>
        <Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>
      </Link>
      <div className={"flex gap-5"}>
        {leagues.map(league => (
          <Link href={`/league/${league.id}`} className={"hover:border-slate-700 border-b-2"} key={league.id}>{league.acronymn}</Link>
        ))}
      </div>
      <div>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar