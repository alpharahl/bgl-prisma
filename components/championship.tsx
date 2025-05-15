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
    <div className={"w-screen border-2 border-primary max-w-4xl p-3 m-5"}>
      <div className="flex justify-between border-b-2 border-primary/50">
        <div>{championship.name}</div>
        <div className="ml-auto flex gap-2">
          {championship.cars.map(car => <div className={"py-1 rounded-full px-3 bg-green-200"}>{car.shorthand}</div>)}
        </div>
      </div>
      <p>Championship info</p>
    </div>
  )
}

export default Championship