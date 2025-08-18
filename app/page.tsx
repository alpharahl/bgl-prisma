import React, {ReactNode} from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import {auth} from "@/auth";
import Discord from '@/assets/Discord-Logo-Blurple.svg';

export default async function Home(): Promise<ReactNode> {
  const session = await auth();
  // const member = await getMember(session?.customData.discordId);
  return (
    <div className="min-h-[600px] ">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-4xl mx-auto min-h-screen mt-20 px-10">
        <h1 className={" text-4xl"}>Broken Wing Racing League</h1>
        <p className={"text-xl font-bold"}>Welcome to BWRL. We are a community of sim racer's here for friendly competition.</p>
        <div>
          <Link href={"https://discord.com/invite/bwrl"}
                className={"flex items-center text-2xl gap-4"}>
                  <div>Get Started on</div> 
            <Image src={Discord.src}
                   objectFit={"contain"}
                   width={211}
                   height={32}/>
          </Link>
        </div>
      </main>

    </div>
  );
}
