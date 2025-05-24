import React from 'react';
import prisma from "@/lib/prisma";
import Championship from "@/components/championship";

const Page = async () => {
  const championships = await prisma.series.findMany(
    {
      include: {
        cars: true,
        sections: true
      },
      orderBy: {
        order: 'asc',
      }
    }
  );
  return (
    <div className={"px-5 lg:max-w-[75%] bg-transparent mx-auto"}>{
      championships.map(championship => <Championship
        key={championship.id}
        championship={championship}
      >
      </Championship>)
    }</div>
  )
}

export default Page