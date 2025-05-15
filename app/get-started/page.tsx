import React from 'react';
import Link from "next/link";
import Image from "next/legacy/image";
import Discord from '@/assets/Discord-Logo-Blurple.svg';
import Cars from '@/assets/bwrl-cars.avif'

const Page = () => {
  return (
    <div>
      <div className={"flex flex-col gap-8 row-start-2 w-full max-w-4xl mx-auto px-5"}>
        <h1 className={"text-3xl text-primary"}>Getting Started</h1>
        <p>
          Thanks for showing interest in BWRL. Joining up is easy.
        </p>
        <h2 className={"text-primary text-2xl"}>Discord</h2>
        <p className={"text-lg items-center flex gap-5 flex-wrap"}>First join us on
          <Link href={"https://discord.gg/9kDGGVPQ"}
                className={""}>
            <Image src={Discord.src}
                   objectFit={"contain"}
                   width={211}
                   height={32}/>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page