import React from 'react';
import Link from "next/link";

const Footer = () => {
  return (
      <div className="flex border-t-2 justify-between border-t-slate-400 max-h-[50px] mt-auto  h-10 p-3">
        <div className="">
          Broken Gaming League
        </div>
        <div className="text-right">
          <Link href={"mailto:"}>Contact Us</Link>
        </div>
      </div>
  )
}

export default Footer