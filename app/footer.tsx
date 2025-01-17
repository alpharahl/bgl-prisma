import React from 'react';
import Link from "next/link";

const Footer = () => {
  return (
      <div className="flex border-t-2 border-t-slate-400 max-h-[50px] mt-auto h-10 p-3">
        <div className={"w-20"}></div>
        <div className="mx-auto">
          Broken Gaming League
        </div>
        <div className="text-right w-20">
          <Link href={"mailto:"}>Contact Us</Link>
        </div>
      </div>
  )
}

export default Footer