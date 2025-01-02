import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className={"flex justify-between px-10 py-3 items-center"}>
      <Link href={"/"}>
        <Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>
      </Link>
      <div>
        <Link href={"/bwrl"} className={"hover:border-slate-700 border-b-2"}>BWRL</Link>
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