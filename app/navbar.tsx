import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={"flex justify-between px-10 py-3 items-center"}>
      <Link href={"/"}>
        <Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>
      </Link>
      <div>
        <Link href={"/bwrl"}>BWRL</Link>
      </div>
    </div>
  )
}

export default Navbar