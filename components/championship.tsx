import React from 'react';
import {Prisma, Series} from "@prisma/client";
import Image from "next/legacy/image";
import Twill from '@/assets/twill.png';

type SeriesWIthCarsAndSections = Prisma.SeriesGetPayload<{
  include: { cars: true, sections: true }
}>
type ChampionshipProps = {
    championship: SeriesWIthCarsAndSections
}
const Championship = ({championship}: ChampionshipProps) => {
  return (
    <div className={`w-full border-2 border-primary  mx-auto bg-primary/70 text-white m-5`}>
      <div
        className={`w-full h-36 relative p-3 bg-repeat bg-[url(/assets/twill.png)] flex justify-center items-center`}
      >
        <h2 className={"text-2xl md:text-6xl text-orange-400"}>{championship.name}</h2>
      </div>
      <div className="flex justify-between border-b-2 flex-wrap gap-5 items-center pb-1 border-primary/50">
        {/*<div className="ml-auto flex gap-2">*/}
        {/*  {championship.cars.map(car => <div key={`${championship.id}-${car.id}`} className={"py-1 rounded-full px-3 bg-green-200"}>{car.shorthand}</div>)}*/}
        {/*</div>*/}
      </div>
      <div className="md:grid grid-cols-2 gap-5 p-2">

        {championship.sections.map(section => {
          return <div key={`${championship.id} -- ${section.id}`}>
            <h3 className={"text-2xl text-orange-300 font-bold mb-2 border-b-2 border-b-orange-300"}>{section.title}</h3>
            <ol className={"px-3"}>
              {section.content.map((content, index) => <li className={"mb-1"} key={`${championship.id} -- ${section.id} -- ${index}`}>{content}</li>)}
            </ol>
          </div>
        })}
      </div>
    </div>
  )
}

export default Championship
