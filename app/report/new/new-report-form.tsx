'use client'
import React, {useState} from 'react';
import {Prisma} from '@prisma/client';
import {Field, Form, Formik} from "formik";
import {classifyReport} from "@/actions/penalty";

type newReportFormProps = {
  series: SeriesWithEvents[];
}

type SeriesWithEvents = Prisma.SeriesGetPayload<{
  include: { Event: true }
}>
const newReportForm = ({series}: newReportFormProps) => {
  const [selectedSeries, setSelectedSeries] = useState<SeriesWithEvents>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  return (
    <div>
      <div>
        <h2>Select Series for Report</h2>
        <div className="grid grid-cols-2 gap-3">

          {series.map(s => <button
            onClick={() => setSelectedSeries(s)} key={s.id}
            className={`border-2 rounded-md py-4 px-2 hover:bg-primary hover:text-white ${selectedSeries?.id === s.id ? "bg-primary/60 text-white" : ""}`}
          >
            {s.name}
          </button>)}
        </div>
        {selectedSeries && <Formik
          initialValues={{
            description: "",
            offendingDriver: "",
            carNumber: "",
            offendingDriverCarNumber: "",
            link: "",
            round: ""
          }}
          onSubmit={async (values, {resetForm}) => {
            setSubmitting(true);
            await classifyReport({...values, series: selectedSeries} );
            resetForm()
            setSubmitting(false);
          }
        }
        >
          <Form className={"w-full mt-10 flex flex-col gap-3"}>
            <div>
              <div className="text-lg">Round Number</div>
              <Field name={"round"} type="number" required className={"w-full p-2 rounded-md"}/>
            </div>
            <div>
              <div className={"text-lg"}>Describe the incident</div>
              <Field name={"description"} as={"textarea"} required className={"w-full p-2 rounded-md"} rows={6}/>
            </div>
            <div>
              <div className={"text-lg"}>Offending driver</div>
              <Field name={"offendingDriver"} required className={"w-full p-2 rounded-md"}/>
            </div>
            <div>
              <div className="text-lg">Offending Driver's Car Number</div>
              <Field name={"offendingDriverCarNumber"} required className={"w-full p-2 rounded-md"}/>
            </div>
            <div>
              <div className="text-lg">Your Car Number</div>
              <Field name={"carNumber"} required className={"w-full p-2 rounded-md"}/>
            </div>
            <div>
              <div className={"text-lg"}>Video Link</div>
              <Field name={"link"} required className={"w-full p-2 rounded-md"}/>
            </div>
            <div>
              <button type={"submit"} className={"bg-primary text-white px-3 py-2 rounded-md"} disabled={submitting}>Submit</button>
            </div>
          </Form>
        </Formik>}
      </div>
    </div>
  )
}

export default newReportForm