'use client'
import React from 'react';
import {Field, Form, Formik} from "formik";
import {FaSave} from "react-icons/fa";

type AddPenaltyProps = {
  createPenalty: Function
}
const AddPenalty = ({
  createPenalty
                    }: AddPenaltyProps) => {

  const inputClass = "px-2 py-1 rounded-md"
  return (
    <Formik
      initialValues={{
        code: 0.0,
        points: 0,
        name: "Penalty Name",
        description: "Penalty Description"
      }}
      onSubmit={async (values) => {createPenalty(values)}}
    >
      <Form className="flex gap-2 w-full items-center">
        <div>
          <div>Code</div>
          <Field name={"code"} type={"number"} steps={2} className={inputClass}/>
        </div>
        <div>
          <div>Points</div>
          <Field name={"points"} type={"number"} className={inputClass}/>
        </div>
        <div>
          <div>Name</div>
          <Field name={"name"} className={inputClass}/>
        </div>
        <div className={"flex-grow"}>
          <div>Description</div>
          <Field name={"description"} as={"textarea"} className={inputClass + " w-full"} rows={2}/>
        </div>
        <div>
          <button type={"submit"} className={"bg-green-300 px-3 py-2 rounded-lg"}><FaSave/></button>
        </div>
      </Form>
    </Formik>
  )
}

export default AddPenalty