import React from 'react';
import Image from "next/legacy/image";
import Link from "next/link";

const Navbar = async () => {

  return (

      <div className={"flex justify-between px-10 py-3 items-center"}>
        <Link href={"/"}>
          <Image src={"/assets/v2 Vector.svg"} alt={"Broken Gaming League Logo"} width={100} height={100}/>
        </Link>
        <div>
        </div>
      </div>
  )
}

export default Navbar