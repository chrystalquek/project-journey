import React from "react";
import { useField } from "formik";
import { FormHelperText } from "@material-ui/core";
import DropZoneCard from "@components/common/DropZoneCard";

type ImageFieldProps = {
  width?: string | number;
  height?: string | number;
  name: string;
};

const ImageField = ({ width, height, name }: ImageFieldProps) => {
  const [, meta, helpers] = useField(name);

  const { error, touched } = meta;
  const { setValue } = helpers;

  const onChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setValue(imageFile);

      return URL.createObjectURL(imageFile);
    }
    return null;
  };

  return (
    <>
      <div style={{ width, height }}>
        <DropZoneCard
          id={name}
          initialUrl={null}
          onChangeImage={onChangeImage}
        />
      </div>
      {touched && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
};

ImageField.defaultProps = {
  width: "100%",
  height: "200px",
};

export default ImageField;
