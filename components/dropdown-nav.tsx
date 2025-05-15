import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {auth} from "@/auth";
import Image from "next/legacy/image";
import React from "react";
import Link from "next/link";
import SignInWithDiscord from "@/components/sign-in-button";
import SignOut from "@/components/sign-out";
import {TiThMenu} from "react-icons/ti";

export default async () => {
  const session = await auth()
  return (
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
        <MenuItem>
          {session?.user ? <SignOut/> : <SignInWithDiscord/>}
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}