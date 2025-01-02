import React from 'react';
import {useFormikContext} from "formik";

const ImageHandler = () => {
  const props = useFormikContext()
  return (
    <input id="logo" name="logo" type="file" onChange={(event) => {
      if (event.currentTarget.files) {
        props.setFieldValue("logo", event.currentTarget?.files[0]);
      }
    }}/>
  )
}

export default ImageHandler;