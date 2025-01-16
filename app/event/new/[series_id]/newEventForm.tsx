'use client'
import React from 'react';
import {Field, Form, Formik} from "formik";
import {addEvent} from "@/app/event/new/[series_id]/actions";
import {Series} from "@prisma/client";
import {useRouter} from "next/navigation";

const NewEventForm = ({series}: {series: Series}) => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        name: "",
        time: "",
        description: "",
        location: ""
      }}
      onSubmit={async (values) => {
        await addEvent({
          ...values,
          time: new Date(values.time) ||  "",
          series: {
            connect: {
              id: series.id
            }
          }
        })
        router.push(`/series/${series.id}`)
      }}
    >
      <Form>
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <Field name={"name"} className={"rounded-md text-black p-2 border-slate-300 border"}/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <Field name={"description"} className={"rounded-md text-black p-2 border-slate-300 border"}/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">Location</label>
              <Field name={"location"} className={"rounded-md text-black p-2 border-slate-300 border"}/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={"time"}>Date</label>
              <Field name={"time"} type={"datetime-local"} className={"rounded-md text-black p-2 border-slate-300 border"}/>
            </div>
            <button type={"submit"} className={"bg-green-200 px-3 py-1 rounded-full mt-3"}>Add</button>
          </div>
        </div>
      </Form>

    </Formik>
  )
}

export default NewEventForm