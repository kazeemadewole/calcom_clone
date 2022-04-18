/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface inputType {
  id: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  classname: string;
  oninput?: any;
  required: boolean;
}
const Input = ({ id, type, name, value, placeholder, oninput, classname, required }: inputType) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      className={classname}
      required={required}
      onInput={oninput}
      placeholder={placeholder}
    />
  );
};

export default Input;
