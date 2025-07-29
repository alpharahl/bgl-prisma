import React from 'react';
import {Championship, Prisma} from "@prisma/client";
import Link from 'next/link';
import { auth } from "@/auth";
import isAdmin from "@/lib/isAdmin";

type SeriesWithCarsAndSections = Prisma.SeriesGetPayload<{
  include: { cars: true, sections: true }
}>;

interface ChampionshipProps {
  championship: Championship;
  isAdmin?: boolean;
}

const Championship = ({championship, isAdmin}: ChampionshipProps) => {
  
  const sections = championship.sections
  return (
    <div className={`w-full border-2 border-primary mx-auto bg-primary/70 text-white m-5`}>        <div
          className={`w-full h-36 relative p-3 bg-repeat bg-[url(/assets/twill.png)] flex justify-center items-center`}
        >
          <h2 className={"text-2xl md:text-6xl text-orange-400"}>{championship.name}</h2>
          {isAdmin && (
            <Link
              href={`/championships/${championship.id}/edit`}
              className="absolute top-2 right-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition flex items-center gap-1 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </Link>
          )}
        </div>
      <div className="md:grid grid-cols-2 gap-5 p-2">
        {sections && sections.map(section => (
          <div key={`${championship.id} -- ${section.name}`}>
            <h3 className={"text-2xl text-left text-orange-300 font-bold mb-2 border-b-2 border-b-orange-300"}>
              {section.name}
            </h3>
            <ol className={"px-3"}>
              {section.bullets.map((content, index) => (
                <li className={"mb-1 text-left max-w-md"} key={`${championship.id} -- ${section.id} -- ${index}`} dangerouslySetInnerHTML={{ __html: content }}>

                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Championship
