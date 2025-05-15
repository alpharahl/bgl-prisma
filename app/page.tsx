import {ReactNode} from "react";
import Link from "next/link";

export default async function Home(): Promise<ReactNode> {
  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-4xl items-center text-center mx-auto">
        <h1 className={"text-primary text-4xl"}>Broken Wing Racing League</h1>
        <h2 className="text-xl">Penalty System</h2>
        <Link href={"/report/new"}>Report New Penalty</Link>
        {/*<div className="bg-slate-900 w-full flex items-center justify-between  h-[400px] text-white text-4xl mr-auto">*/}
        {/*  <div className="max-w-4xl mx-auto flex justify-between items-center gap-10">*/}
        {/*    <div>*/}
        {/*      <h1>Welcome To<br/>Broken Gaming Leagues</h1>*/}
        {/*    </div>*/}
        {/*    <Image src={"/assets/v2 Vector.svg"} width={300} height={300} alt={""}/>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<OurLeagues/>*/}
        {/*/!*<OurSponsors/>*!/*/}
      </main>

    </div>
  );
}
