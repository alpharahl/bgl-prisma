import React from 'react';
import Link from "next/link";
import SignInWithDiscord from "@/components/sign-in-button";
import {auth} from "@/auth";
import SignOut from "@/components/sign-out";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import Image from "next/legacy/image";
import {TiThMenu} from "react-icons/ti";

const Navbar = async () => {
  const session = await auth()
  return (

    <div className={"flex justify-between px-10 py-3 items-center"}>
      <Link href={"/"} className={"text-3xl text-primary"}>
        {/*<Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>*/}
        BWRL
      </Link>
      <div className={"hidden md:flex ml-auto gap-3 mr-3"}>
        <Link href={"/championships"}
              className={"hover:text-primary hover:border-b-primary border-b-2"}>Championships</Link>
        <Link href={"https://bwrl-shop.fourthwall.com/"}
              className={"hover:text-primary hover:border-b-primary border-b-2"}>Store</Link>
      </div>
      <Menu>
        <MenuButton>
          {session?.user && <Image src={session?.user?.image ?? ""} width={40} height={40} className={"rounded-full"}/>}
          {!session?.user && <TiThMenu/>}
        </MenuButton>
        <MenuItems anchor="bottom" className={"bg-white p-3"}>
          <div className="md:hidden">
            <MenuItem>
              <Link className="block" href="/championships">
                Championships
              </Link>
            </MenuItem>
            <MenuItem>
              <Link className="block" href="/get-started">
                Get Started
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <div className="flex gap-2 ml-2 items-center">

        {session ? <SignOut/> : <SignInWithDiscord/>}
      </div>
    </div>
  )
}

export default Navbar