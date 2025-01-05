'use client'
import React from 'react';
import {Field, Form, Formik} from "formik";
import ImageHandler from "@/app/game/[game_id]/edit/image-handler";
import {Game} from "@prisma/client";

const Edit = ({game, handler}: {game: Game, handler: Function}) => {
  return (
    <Formik
      onSubmit={async (values) => {await handler(values, game)}}
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
          <ImageHandler/>
        </div>
        <div><button className={"p-2 rounded-md "} type={"submit"}>Update</button> </div>
      </Form>
    </Formik>
  )
}

export default Edit