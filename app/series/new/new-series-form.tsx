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
      <Form>
        <Field name={"name"}/>
        <Field name={"logo"}/>
        <button type={"submit"}>Create</button>
      </Form>
    </Formik>
  )
}

export default newSeriesForm