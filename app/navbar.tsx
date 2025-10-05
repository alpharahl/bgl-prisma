import React from 'react';
import Link from "next/link";
import SignInWithDiscord from "@/components/sign-in-button";
import {auth} from "@/auth";
import SignOut from "@/components/sign-out";

const Navbar = async () => {
  const session = await auth()
  return (

    <div className={"flex justify-between px-10 py-3 items-center"}>
      <Link href={"/"} className={"text-3xl text-primary"}>
        {/*<Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>*/}
        BWRL
      </Link>

      <div className="flex gap-2 ml-2 items-center">

        {session ? <SignOut/> : <SignInWithDiscord/>}
      </div>
    </div>
  )
}

export default Navbar