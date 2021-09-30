import React, { useEffect, useState } from "react";

import "./assets/style.scss";
import { useForm } from "react-hook-form";
import union from "../../../resources/assets/img/union.png";
function InputText({
  defaultValue,
  type,
  placeholder,
  autoComplete,
  handleInput,
  required,
  pattern,
  errorMessage,
  setIsValid,
  displayErrors,
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const showPlaceHolder = watch(placeholder);
  useEffect(() => {
    console.log(errors[placeholder]);
    if (errors[placeholder]) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors[placeholder]]);

  useEffect(() => {
    handleInput(showPlaceHolder);
  }, [showPlaceHolder]);

  return (
    <>
      <div className="top-placeholder">
        {showPlaceHolder ? placeholder : ""}
      </div>
      <input
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(placeholder, {
          required: required,
          pattern: pattern,
        })}
      />
      {displayErrors && errors[placeholder] && (
        <div className="input-error-message">
          {errorMessage}
          <img src={union} />
        </div>
      )}
    </>
  );
}

export default InputText;
