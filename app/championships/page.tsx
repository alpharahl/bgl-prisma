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
      {isAdminUser && (
        <div className="flex justify-end mb-4">
          <Link 
            href="/championships/new" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Championship
          </Link>
        </div>
      )}
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