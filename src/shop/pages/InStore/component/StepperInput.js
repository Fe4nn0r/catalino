import React, { useState, useEffect } from "react";
import "./assets/style.scss";
import upload from "../../../resources/assets/img/upload.png";
import deleteImg from "../../../resources/assets/img/delete.png";

import { useForm } from "react-hook-form";

function StepperInput({ label, type, attribute, fillData, defaultValue }) {
  const { register } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [uploadedFileName, setUploadedFileName] = useState();
  useEffect(() => {
    if (type === "upload" && defaultValue) {
      setUploadedFileName(defaultValue[0].name);
    }
  }, []);
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };
  function handleInput(value) {
    if (value) {
      fillData(attribute, value);
      setUploadedFileName(value[0].name);
    } else {
      fillData(attribute, "");
      setUploadedFileName("");
    }
  }

  function emptyUploadedFile() {
    fillData(attribute, "");
    setUploadedFileName(null);
  }

  function onUploadFile() {
    document.getElementById(attribute).click();
  }

  function getInput() {
    return type === "upload" ? (
      <>
        <div className="inputFile">
          <div
            onClick={onUploadFile}
            className="uploadFile"
            style={{ display: uploadedFileName ? "none" : "flex" }}
          >
            <img className="uploadImg" src={upload} />
            <div className="uploadLabel">Upload your receipt</div>
          </div>
          <div
            className="uploadedFileText"
            style={{ display: !uploadedFileName ? "none" : "flex" }}
          >
            {uploadedFileName}
            <div className="deleteImg" onClick={emptyUploadedFile}>
              <img src={deleteImg} />
            </div>
          </div>
        </div>
        <input
          id={attribute}
          style={{ display: "none" }}
          type="file"
          placeholder={label}
          autoComplete="off"
          {...register(label, {
            required: true,
            validate: handleInput,
          })}
        />
      </>
    ) : (
      <input
        defaultValue={defaultValue}
        autoFocus={true}
        type="text"
        placeholder={label}
        autoComplete="off"
        {...register(label, {
          required: false,
          validate: handleInput,
        })}
      />
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onKeyUp={onEnter}
    >
      {getInput()}
    </form>
  );
}

export default StepperInput;
