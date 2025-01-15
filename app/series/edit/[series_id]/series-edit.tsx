'use client'
import React from 'react';
import {Series} from "@prisma/client";
import {Field, Form, Formik} from "formik";
import {editSeries} from "@/app/series/edit/[series_id]/actions";
import {useRouter} from "next/navigation";

const SeriesEdit = ({series}: { series: Series }) => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        ...series,
      }}
      onSubmit={async (values) => {
        await editSeries({
          id: series.id,
          name: values.name,
          description: values.description,
          logo: values.logo,
        })
        router.push(`/series/${series.id}`)
      }}
    >
      <Form>
        <div className="flex flex-col gap-2">
          {Object.keys(series).filter(key => !key.toLowerCase().includes('id')).map(key => {
            return <div key={key} className={"flex flex-col gap"}>
              <label aria-label={key} className={""}>{key}</label>
              <Field name={key} className={"text-black p-2 border border-slate-400"}/>
            </div>
          })}
        </div>
        <button type={"submit"} className={"bg-green-200 px-3 py-1 rounded-full mt-3"}>Save</button>

      </Form>
    </Formik>
  )
}

export default SeriesEdit