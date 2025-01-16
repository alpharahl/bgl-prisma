import React from 'react';
import NewSeriesForm from "@/app/series/new/new-series-form";
import NewEventForm from "@/app/event/new/[series_id]/newEventForm";
import {PrismaClient} from "@prisma/client";

type newEventProps = {
  params: Promise<{
    series_id: string
  }>
}

const Page = async ({params}: newEventProps) => {
  const prisma = new PrismaClient()
  const series = await prisma.series.findUniqueOrThrow({
    where: {
      id: parseInt((await params).series_id)
    }
  })
  return (
    <div className={"mx-auto w-screen max-w-xl"}>
      <h1 className={"text-2xl"}>New Event</h1>
      <NewEventForm series={series}/>
    </div>
  )
}

export default Page