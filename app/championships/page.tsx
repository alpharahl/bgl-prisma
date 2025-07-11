import React from 'react';
import prisma from "@/lib/prisma";
import Championship from "@/components/championship";

import isAdmin from "@/lib/isAdmin";
import Link from "next/link";

const Page = async () => {
  const [championships, isAdminUser] = await Promise.all([
    prisma.series.findMany({
      include: {
        cars: true,
        sections: true
      },
      orderBy: {
        order: 'asc',
      }
    }),

    isAdmin()
  ]);

  return (
    <div className={"px-5 lg:max-w-[75%] bg-transparent mx-auto"}>

      {championships.map(championship => (
        <Championship
          key={championship.id}
          championship={championship}
          isAdmin={isAdminUser}
        />
      ))}
    </div>
  )
}

export default Page