'use client'
import React, {ReactNode} from 'react';
import {useSession} from "next-auth/react";
import {Field, FieldArray, Form, Formik, FormikValues} from "formik";

type EditableTextProps<O> = {
  targetObject: O,
  updateFn: Function,
  targetKey: string,
  children: ReactNode,
  formType?: 'text' | 'array',
}


function EditableText<O extends FormikValues>({
                                                targetObject,
                                                targetKey,
                                                updateFn,
                                                children,
                                                formType,
                                              }: EditableTextProps<O>) {
  const session = useSession();
  const forms = {
    text: <Form>
      <Field className={"!text-white bg-primary/25 p-3 rounded-md "} name={targetKey}/>
      <button type="submit"></button>
    </Form>,
    array: <FieldArray
      name={targetKey}
      render={({form: {values}, remove, insert}) => (

        <Form className="flex flex-col gap-1">
          {values[targetKey].map((content: string, index: number) => {
            return <div className={"flex"} key={content}>
              <Field
                className={"text-white flex-grow bg-primary/25 rounded-l-md"}
                name={`${targetKey}.${index}`}
              />
              <button
                className={"bg-red-200 px-2 hover:bg-red-400 text-black text-2xl round-r-md"}
                onClick={() => {remove(index)}}
              >
                X
              </button>
            </div>
          })}
          <div className={"flex w-full"}>
            <button
              className={"bg-green-200 px-2 hover:bg-green-400 text-black text-2xl round-md "}
              onClick={() => insert(values.length, "")}
            >+
            </button>
            <button type="submit" className={"bg-slate-200 hover:bg-slate-600 hover:text-white  px-2 ml-2 text-black rounded-md"}>Save</button>
          </div>
        </Form>
      )}
    />,
  }
  const admin = !!session?.data?.user?.admin;
  const [editing, setEditing] = React.useState(false);
  if (admin && !editing) {
    return <button
      onClick={() => {
        setEditing(true)
      }}
      className={"hover:bg-slate-700 duration-250 transition-colors rounded-md hover:text-white w-full text-center"}
    >
      {children}
    </button>
  }
  if (admin && editing) {
    return <Formik initialValues={targetObject} onSubmit={async (values) => {
      await updateFn(values);
      setEditing(false);
    }}>
      {forms[formType ?? 'text']}
    </Formik>
  }
  return <div>
    {children}
  </div>
}

export default EditableText