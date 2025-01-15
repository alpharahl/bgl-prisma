import React from 'react';
import {PrismaClient} from "@prisma/client";
import {isAdmin} from "@/utils/admin";
import Admin from "@/app/series/[series_id]/admin";

type seriesProps = {
  params: Promise<{
    series_id: string
  }>
}

const Page = async ({params}: seriesProps) => {
  const prisma = new PrismaClient();
  const series_id = (await params).series_id;
  const series = await prisma.series.findUniqueOrThrow({
    where: {
      id: parseInt(series_id),
    },
  })
  return (
    <div className={"mx-auto max-w-4xl w-screen"}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{series.name}</h1>
        {(await isAdmin()) && <Admin series={series}/>}
      </div>
    </div>
  )
}

export default Page