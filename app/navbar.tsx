import React from 'react';
import Image from "next/legacy/image";
import Link from "next/link";
import SignInWithDiscord from "@/components/sign-in-button";
import {auth} from "@/auth";

const Navbar = async () => {
  const session = await auth()
  console.log(session)
  return (

      <div className={"flex justify-between px-10 py-3 items-center"}>
        <Link href={"/"} className={"text-3xl text-primary"}>
          {/*<Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>*/}
          BWRL
        </Link>
        <div className={"ml-auto flex gap-3"}>
          <Link href={"https://bwrl-shop.fourthwall.com/"} className={"hover:text-primary hover:border-b-primary border-b-2"}>Store</Link>
        </div>
        <div className={"ml-3"}>
          {session?.user ? <div className={"flex flex-col items-center gap-2 w-full"}>
            {session.user.image && <Image src={session.user.image} width={40} height={40} className={"rounded-full"}/>}
          </div> : <SignInWithDiscord/>}
        </div>
      </div>
  )
}

export default Navbar