import React from 'react';
import prisma from "@/lib/prisma";
import NewReportForm from "@/app/report/new/new-report-form";

const Page = async () => {
  const series = await prisma.series.findMany({
    include: {
      Event: true
    }
  });
  return (
    <div className={"max-w-4xl mx-auto w-full flex flex-col gap-5"}>
      {series.map(s =>
        <NewReportForm series={s}/>
      )}
    </div>
  )
}

export default Page