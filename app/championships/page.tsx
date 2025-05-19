import React from 'react';
import prisma from "@/lib/prisma";
import Championship from "@/components/championship";

const Page = async () => {
  const championships = await prisma.series.findMany(
    {
      include: {
        cars: true,
        sections: true
      }
    }
  );
  return (
    <div className={"px-5 max-w-4xl mx-auto"}>{
      championships.map(championship => <Championship
        key={championship.id}
        championship={championship}
      >
      </Championship>)
    }</div>
  )
}

export default Page