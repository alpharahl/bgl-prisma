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

const ChampionshipPage = ({championship, isAdmin}: ChampionshipProps) => {
  //@ts-ignore
  const sections = championship.sections
  return (
    <div className={`w-full border-2 border-primary mx-auto bg-primary/70 text-white m-5`}>        <div
          className={`w-full h-36 relative p-3 bg-repeat bg-[url(/assets/twill.png)] flex justify-center items-center`}
        >
          <h2 className={"text-2xl md:text-6xl text-orange-400"}>{championship.name}</h2>
          
        </div>
        {/* <div>
          {championship.description}
        </div> */}
      <div className="md:grid grid-cols-2 gap-5 p-2">
        
        { //@ts-ignore
        sections && sections.map((section: any) => (
          <div key={`${championship.id} -- ${section.name}`}>
            <h3 className={"text-2xl text-left text-orange-300 font-bold mb-2 border-b-2 border-b-orange-300"}>
              {section.name}
            </h3>
            <ol className={"px-3"}>
              {section.bullets.map((content: string, index: number) => (
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
export default ChampionshipPage
