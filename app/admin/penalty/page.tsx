import React from 'react';
import prisma from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import PenaltyCreateInput = Prisma.PenaltyCreateInput;
import isAdmin from "@/lib/isAdmin";
import AddPenalty from "@/app/admin/penalty/addPenalty";
import Penalty from "@/app/admin/penalty/penalty";
import ReportTester from "@/app/admin/penalty/report-tester";

const Page = async () => {
  const penalties = await prisma.penalty.findMany({
    orderBy: {
      code: 'asc'
    }
  });



  const addPenalty = async (penalty: PenaltyCreateInput) => {
    'use server'
    if (!(await isAdmin())){
      return;
    }
    await prisma.penalty.create({
      data: penalty
    })
  }

  const removePenalty = async (id: number) => {
    'use server'
    if (!(await isAdmin())){
      return;
    }
    await prisma.penalty.delete({
      where: {
        id
      }
    })
  }
  return (
    <div className="min-h-screen p-5">
      <ReportTester />
      <div className="grid grid-cols-8 gap-2 w-full font-bold border-b-primary border-b-2 text-left">
        <div>Code</div>
        <div>Points</div>
        <div className={"col-span-2"}>Name</div>
        <div className={"col-span-3"}>Description</div>
      </div>
      {penalties.map(penalty =>
       <Penalty penalty={penalty} removePenalty={removePenalty} />
      )}
      <AddPenalty createPenalty={addPenalty} />
    </div>
  )
}

export default Page