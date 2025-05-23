import React, {ReactNode} from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import Cars from "@/assets/bwrl-cars.avif";
import {auth} from "@/auth";

export default async function Home(): Promise<ReactNode> {
  const session = await auth();
  return (
    <div className="min-h-[600px] ">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-4xl mx-auto mt-20 px-10">
        <h1 className={" text-4xl"}>Broken Wing Racing League</h1>
        <p className={"text-xl font-bold"}>Welcome to BWRL. We are a community of sim racer's here for friendly competition.</p>
        <div>
          <Link href={'/get-started'} className={"bg-primary text-white rounded-full hover:bg-primary/80 active:bg-primary/40 active:text-black px-5 py-3"}>Get Started</Link>
        </div>
      </main>

    </div>
  );
}
