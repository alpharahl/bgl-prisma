import React from 'react';
import {Prisma, Series} from "@prisma/client";

type SeriesWIthCars = Prisma.SeriesGetPayload<{
  include: { cars: true }
}>
type ChampionshipProps = {
    championship: SeriesWIthCars
}
const Championship = ({championship}: ChampionshipProps) => {
  return (
    <div className={"w-full border-2 border-primary  mx-auto max-w-4xl p-3 m-5"}>
      <div className="flex justify-between border-b-2 mb-2 flex-wrap gap-5 items-center pb-1 border-primary/50">
        <div>{championship.name}</div>
        <div className="ml-auto flex gap-2">
          {championship.cars.map(car => <div key={`${championship.id}-${car.id}`} className={"py-1 rounded-full px-3 bg-green-200"}>{car.shorthand}</div>)}
        </div>
      </div>
      {championship.description && <div className={"prose"} dangerouslySetInnerHTML={{ __html: championship.description }}></div>}
    </div>
  )
}

export default Championship
