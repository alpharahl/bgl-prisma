'use client'
import React from 'react';
import {Field, Form, Formik, useFormik, useFormikContext} from "formik";

const Edit = ({game}: {game: any}) => {
  return (
    <Formik
      onSubmit={(e) => e.preventDefault()}
      initialValues={{
        name: game.name,
        logo: null
      }}
    >
      <Form>
        <div className="flex gap-5 items-center">
          <div>Name</div>
          <Field name={"name"} className={"text-black p-2"}/>
        </div>
        <div className="flex gap-5 items-center">
          <div>Logo</div>
          <input id="logo" name="logo" type="file" onChange={(event) => {
            if (event.currentTarget.files) {
              useFormikContext().setFieldValue("logo", event.currentTarget?.files[0]);
            }
          }}/>
        </div>
      </Form>
    </Formik>
  )
}

export default Edit