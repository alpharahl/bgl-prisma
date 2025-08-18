import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { auth } from "@/auth";
import Discord from '@/assets/Discord-Logo-Blurple.svg';
import prisma from "@/lib/prisma";
import OurLeagues from "./our-leagues";

export default async function Home(): Promise<ReactNode> {
  const session = await auth();
  const championships = prisma.championship.findMany({
    orderBy: {
      order: 'asc'
    }
  });
  // const member = await getMember(session?.customData.discordId);
  return (
    <div className="min-h-[600px] ">
      <div className=" fixed inset-0 h-[100%] bg-cover -z-10  bg-fixed bg-no-repeat">
      <video
        src="/BWRL_Website_Main_CC_Vid.mov"
        autoPlay
        loop
        muted
        // width={400}
        className="w-full h-full object-cover"
        // height={400}
        />
    </div>
      <main className=" w-full mx-auto min-h-screen p-10 flex flex-col">
        <div className="max-w-4xl mb-5 bg-white/60 p-4 mb-auto rounded-md flex flex-col gap-8 row-start-2">

          <h1 className={"font-bold text-primary text-4xl"}>Broken Wing Racing League</h1>
          <p className={"text-xl font-bold"}>Welcome to BWRL. We are a community of sim racer's here for friendly competition.</p>
          <div>
            <Link href={"https://discord.com/invite/bwrl"}
              className={"flex items-center flex-wrap text-2xl gap-4"}>
              <div>Get Started on</div>
              <Image src={Discord.src}
                objectFit={"contain"}
                width={211}
                height={32} />
            </Link>
          </div>
        </div>
        <OurLeagues championships={championships} />
      </main>

    </div>
  );
}
