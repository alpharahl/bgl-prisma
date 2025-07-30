'use client'
import React, {useState} from 'react';
import {Prisma} from '@prisma/client';
import {Field, Form, Formik, ErrorMessage} from "formik";
import {classifyReport} from "@/actions/penalty";
import * as Yup from 'yup';
import { Router } from 'next/router';

type newReportFormProps = {
  series: SeriesWithEvents[];
}

type SeriesWithEvents = Prisma.SeriesGetPayload<{
  include: { Event: true }
}>
const validationSchema = Yup.object({
  round: Yup.number()
    .required('Round number is required')
    .positive('Round number must be positive'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  offendingDriver: Yup.string()
    .required('Offending driver name is required'),
  offendingDriverCarNumber: Yup.string()
    .required('Offending driver car number is required'),
  carNumber: Yup.string()
    .required('Your car number is required'),
  link: Yup.string()
    .required('Video link is required')
    .url('Please enter a valid URL'),
});
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
          validationSchema={validationSchema}
          onSubmit={async (values, {resetForm, setStatus}) => {
            try {
              setSubmitting(true);
              await classifyReport({...values, series: selectedSeries});
              resetForm();
              setStatus({success: true});
            } catch (error) {
              setStatus({success: false, error: "Failed to submit report. Please try again. Contact an admin if the problem persists"});
            } finally {
              setSubmitting(false);
              
            }
          }}
        >
          {({status}) => (
            <Form className={"w-full mt-10 flex flex-col gap-3"}>
              {status?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {status.error}
                </div>
              )}
              {status?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  Report submitted successfully!
                </div>
              )}
              <div>
                <div className="text-lg">Round Number</div>
                <Field name={"round"} type="number" required className={"w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"}/>
                <ErrorMessage name="round" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <div className={"text-lg"}>Describe the incident</div>
                <Field name={"description"} as={"textarea"} required className={"w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"} rows={6}/>
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <div className={"text-lg"}>Offending driver</div>
                <Field name={"offendingDriver"} required className={"w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"}/>
                <ErrorMessage name="offendingDriver" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <div className="text-lg">Offending Driver's Car Number</div>
                <Field name={"offendingDriverCarNumber"} required className={"w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"}/>
                <ErrorMessage name="offendingDriverCarNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <div className="text-lg">Your Car Number</div>
                <Field name={"carNumber"} required className={"w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"}/>
                <ErrorMessage name="carNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <div className={"text-lg"}>Video Link</div>
                <Field name={"link"} required className={"w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"}/>
                <ErrorMessage name="link" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <button 
                  type={"submit"} 
                  className={"bg-primary text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors"} 
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>}
      </div>
    </div>
  )
}

export default newReportForm