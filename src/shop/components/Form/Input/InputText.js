import React, { useEffect } from "react";

import "./assets/style.scss";
import { useForm } from "react-hook-form";
import union from "../../../resources/assets/img/union.png";
function InputText({
  defaultValue,
  autoFocus,
  type,
  placeholder,
  autoComplete,
  handleInput,
  required,
  pattern,
  errorMessage,
  setIsValid,
}) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    if (errors[placeholder]) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors[placeholder]]);

  function validateInput(value) {
    handleInput(value);
  }

  return (
    <>
      <input
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(placeholder, {
          required: required,
          pattern: pattern,
          validate: validateInput,
        })}
      />
      {errors[placeholder] && (
        <div className="input-error-message">
          {errorMessage}
          <img src={union} />
        </div>
      )}
    </>
  );
}

export default InputText;
