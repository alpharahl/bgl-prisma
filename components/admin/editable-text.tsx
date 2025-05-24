'use client'
import React, {ReactNode} from 'react';
import {useSession} from "next-auth/react";
import {Field, Form, Formik, FormikValues} from "formik";

type EditableTextProps<O> = {
  targetObject: O,
  updateFn: Function,
  targetKey: string,
  children: ReactNode
}

function EditableText<O extends FormikValues> ({targetObject, targetKey, updateFn, children}: EditableTextProps<O>) {
  const session = useSession();
  const admin = !!session?.data?.user?.admin;
  const [editing, setEditing] = React.useState(false);
  if (admin && !editing){
    return <button
      onClick={() => {setEditing(true)}}
      className={"hover:bg-slate-700 duration-250 transition-colors rounded-md hover:text-black"}
      >
      {children}
    </button>
  }
  if (admin && editing){
    return <Formik initialValues={targetObject} onSubmit={async (values) => {
      await updateFn(values);
      setEditing(false);
    }}>
      <Form>
        <Field className={"!text-white bg-primary/25 p-3 rounded-md "} name={targetKey}/>
        <button type="submit"></button>
      </Form>
    </Formik>
  }
  return <div>
    {children}
  </div>
}

export default EditableText