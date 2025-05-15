import React from 'react';
import Image from "next/legacy/image";
import Link from "next/link";
import SignInWithDiscord from "@/components/sign-in-button";
import {auth} from "@/auth";

const Navbar = async () => {
  const session = await auth()
  console.log('session', session)
  return (

      <div className={"flex justify-between px-10 py-3 items-center"}>
        <Link href={"/"}>
          <Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>
        </Link>
        <div>
          <div>Nav auth</div>
          {JSON.stringify(session)}
          {session ? session.user?.name : <SignInWithDiscord/>}
        </div>
      </div>
  )
}

export default Navbar