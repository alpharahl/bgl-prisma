import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {auth, signOut} from "@/auth";
import Image from "next/legacy/image";
import React from "react";
import Link from "next/link";

export default async () => {
  const session = await auth()
  return (
    <Menu>
      <MenuButton><Image src={session?.user?.image ?? ""} width={40} height={40} className={"rounded-full"}/>
      </MenuButton>
      <MenuItems anchor="bottom" className={"bg-white p-3"}>
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
      </MenuItems>
    </Menu>
  )
}