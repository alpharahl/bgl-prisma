import Image from "next/image";
import {ReactNode} from "react";
import {PrismaClient} from "@prisma/client";
import OurLeagues from "@/app/our-leagues";
import Link from "next/link";

export default async function Home(): Promise<ReactNode> {
  const prisma = new PrismaClient();
  const games = await prisma.game.findMany();
  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="bg-slate-900 w-full flex items-center justify-between  h-[400px] text-white text-4xl mr-auto">
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-10">
            <div>
              <h1>Welcome To<br/>Broken Gaming Leagues</h1>
              <Link href={"https://discord.gg/7SXCqmgP"} className={"bg-[#5865F2] px-5 py-2 relative flex rounded-full max-w-[195px] mt-3"}>
                <Image src={"/assets/discord-logo-white.svg"} alt={"Join us on discord"} width={158} height={30}/>
              </Link>
            </div>
            <Image src={"/assets/v2 Vector.svg"} width={300} height={300} alt={""}/>
          </div>
        </div>
        <OurLeagues/>
      </main>

    </div>
  );
}
