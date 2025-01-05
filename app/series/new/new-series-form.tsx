'use client'
import React from 'react';
import {League} from "@prisma/client";
import {Field, Form, Formik} from "formik";
import {createNewSeries} from "@/app/series/new/actions";

const newSeriesForm = ({league}: { league: League }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        logo: "",
        league_id: `${league.id}`
      }}
      onSubmit={createNewSeries}
    >
      <Form className={"flex flex-col gap-5"}>
        <div className="flex gap-2 items-center">
          <label htmlFor="name" className={"w-[50px] text-center"}>Name</label>
          <Field name={"name"} className={"rounded-md text-black p-2 border-slate-300 border"}/>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="logo" className={"w-[50px] text-center"}>Logo</label>
          <Field name={"logo"} className={"rounded-md text-black p-2 border-slate-300 border"}/>
        </div>
        <div className="flex">
          <button type={"submit"} className={"bg-green-300 px-4 py-2 rounded-lg hover:bg-green-500 start"}>Create</button>
        </div>
      </Form>
    </Formik>
  )
}

export default newSeriesForm