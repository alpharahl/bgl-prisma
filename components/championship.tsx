import React from 'react';
import {Prisma} from "@prisma/client";
import EditableText from "@/components/admin/editable-text";
import {SessionProvider} from "next-auth/react";
import isAdmin from "@/lib/isAdmin";
import prisma from "@/lib/prisma";

type SeriesWIthCarsAndSections = Prisma.SeriesGetPayload<{
  include: { cars: true, sections: true }
}>


const Championship = ({championship}: ChampionshipProps) => {
  const editChampionship = async (values: any) => {
    'use server'
    const admin = await isAdmin();
    if (await isAdmin()) {
      console.log('running save')
      await prisma.series.update({
        where: {
          id: championship.id,
        },
        data: values,
      })
    }
  }
  return (
    <SessionProvider>

      <div className={`w-full border-2 border-primary  mx-auto bg-primary/70 text-white m-5`}>
        <div
          className={`w-full h-36 relative p-3 bg-repeat bg-[url(/assets/twill.png)] flex justify-center items-center`}
        >

          <EditableText targetObject={{name: championship.name}} updateFn={editChampionship} targetKey={'name'}>
            <h2 className={"text-2xl md:text-6xl text-orange-400"}>{championship.name}</h2>
          </EditableText>

        </div>
        <div className="md:grid grid-cols-2 gap-5 p-2">

          {championship.sections.map(section => {
            const editSection = async (values: any) => {
              'use server'
              const admin = await isAdmin();
              if (await isAdmin()) {
                console.log('running save')
                await prisma.seriesSection.update({
                  where: {
                    id: section.id,
                  },
                  data: values,
                })
              }
            }
            return <div key={`${championship.id} -- ${section.id}`}>
              <EditableText
                targetObject={{title: section.title}}
                updateFn={editSection}
                targetKey={'title'}
              >

                <h3
                  className={"text-2xl text-orange-300 font-bold mb-2 border-b-2 border-b-orange-300"}>{section.title}</h3>
              </EditableText>
              <ol className={"px-3"}>
                {section.content.map((content, index) => <li className={"mb-1"}
                                                             key={`${championship.id} -- ${section.id} -- ${index}`}>{content}</li>)}
              </ol>
            </div>
          })}
        </div>
      </div>
    </SessionProvider>
  )
}
type ChampionshipProps = {
  championship: SeriesWIthCarsAndSections
}

export default Championship
