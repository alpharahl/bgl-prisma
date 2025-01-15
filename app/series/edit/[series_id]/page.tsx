import React from 'react';
import {PrismaClient} from "@prisma/client";
import {isAdmin} from "@/utils/admin";
import SeriesEdit from "@/app/series/edit/[series_id]/series-edit";

type seriesProps = {
  params: Promise<{
    series_id: string
  }>
}

const Page = async ({params}: seriesProps) => {
  const series_id = (await params).series_id;
  const prisma = new PrismaClient()
  const series = await prisma.series.findUniqueOrThrow({
    where: {
      id: parseInt(series_id),
    }
  })
  return (
    <div className={"mx-auto w-screen max-w-xl"}>
      <SeriesEdit series={series}/>
    </div>
  )
}

export default Page