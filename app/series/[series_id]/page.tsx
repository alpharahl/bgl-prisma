import React from 'react';
import {PrismaClient} from "@prisma/client";
import {isAdmin} from "@/utils/admin";
import Admin from "@/app/series/[series_id]/admin";
import Image from "next/legacy/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

type seriesProps = {
  params: Promise<{
    series_id: string
  }>
}

const Page = async ({params}: seriesProps) => {
  const series_id = (await params).series_id;
  const series = await prisma.series.findUniqueOrThrow({
    where: {
      id: parseInt(series_id),
    },
    include: {
      Event: {
        where: {
          time: {
            gt: new Date()
          }
        }
      }
    }
  })
  return (
    <div className={"mx-auto max-w-4xl w-screen"}>
      <div className="flex flex-col gap-3 items-center justify-center">
        <Image src={`/${series.logo}`} alt={`${series.name} logo`} width={250} height={250}/>
        <h1 className="text-3xl">{series.name}</h1>
      </div>
      <div className="mx-auto max-w-sm w-full my-10">
        {series.description}
      </div>
      <div>
        <div className="flex justify-between max-w-lg mx-auto items-center">
          <h2 className={"text-xl"}>Upcoming Events</h2>
          {(await isAdmin()) && <Link href={`/event/new/${series.id}`} className={"border-l-2 pl-3 border-l-orange-600 hover:bg-orange-200 p-2 rounded-md"}>Add Event</Link> }
        </div>
        <div className="flex max-w-xs w-full flex-col gap-2 mx-auto">
          {series.Event.map(event => (
            <div key={event.id} className={"flex justify-between w-full p-3 "}>
              <div>
                {event.name}
              </div>
              <div>
                {event.time.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {(await isAdmin()) && <Admin series={series}/>}
      </div>
    </div>
  );
}

export default Page