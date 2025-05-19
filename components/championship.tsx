import React from 'react';
import {Prisma, Series} from "@prisma/client";
import Image from "next/legacy/image";

type SeriesWIthCarsAndSections = Prisma.SeriesGetPayload<{
  include: { cars: true, sections: true }
}>
type ChampionshipProps = {
    championship: SeriesWIthCarsAndSections
}
const Championship = ({championship}: ChampionshipProps) => {
  return (
    <div className={"w-full border-2 border-primary  mx-auto max-w-4xl p-3 m-5"}>
      <div className="flex justify-between border-b-2 mb-2 flex-wrap gap-5 items-center pb-1 border-primary/50">
        {!championship.headerImage && <div>{championship.name}</div>}
        {championship.headerImage &&  <div className="relative w-full h-32 md:h-80">
          <Image src={championship.headerImage} layout={"fill"} objectFit={"contain"} />
        </div>}
        <div className="ml-auto flex gap-2">
          {championship.cars.map(car => <div key={`${championship.id}-${car.id}`} className={"py-1 rounded-full px-3 bg-green-200"}>{car.shorthand}</div>)}
        </div>
      </div>
      {championship.description && <div className={"prose"} dangerouslySetInnerHTML={{ __html: championship.description }}></div>}
      <div className="md:grid grid-cols-2 gap-5 mt-5">

        {championship.sections.map(section => {
          return <div key={`${championship.id} -- ${section.id}`}>
            <h3 className={"text-2xl text-primary mb-2 border-b-2 border-b-primary"}>{section.title}</h3>
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
