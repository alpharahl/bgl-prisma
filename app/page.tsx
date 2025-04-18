import Image from "next/legacy/image";
import {ReactNode} from "react";
import OurLeagues from "@/app/our-leagues";
import Link from "next/link";
import OurSponsors from "@/app/our-sponsors";
import prisma from "@/lib/prisma";

export default async function Home(): Promise<ReactNode> {
  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="bg-slate-900 w-full flex items-center justify-between  h-[400px] text-white text-4xl mr-auto">
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-10">
            <div>
              <h1>Welcome To<br/>Broken Gaming Leagues</h1>
            </div>
            <Image src={"/assets/v2 Vector.svg"} width={300} height={300} alt={""}/>
          </div>
        </div>
        <OurLeagues/>
        {/*<OurSponsors/>*/}
      </main>

    </div>
  );
}
