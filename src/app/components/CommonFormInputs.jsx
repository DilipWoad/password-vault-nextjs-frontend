"use client";

import { useState } from "react";

const CommonFormInputs = ({
  label,
  type = "text",
  name,
  id,
  stateValue,
  required,
  stateFunction,
  inputCss,
  divCss,
  isTextArea,
  textAreaRows,
  textAreaMaxLength,
  textAreaCss,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };
  const handleVaultFormChange = (e) => {
    const { name, value } = e.target;

    stateFunction((stateValue) => ({
      ...stateValue,
      [name]: value,
    }));
  };
  return (
    <div className={`flex justify-between items-center ${divCss}`}>
      <label
        className="w-22 py-2 flex justify-between font-semibold font-mono"
        htmlFor={name}
      >
        <p>{label} </p>
        <span className="">:</span>
      </label>

      {isTextArea ? (
        <textarea
          className={`bg-gray-200 p-2 rounded-lg h-32 ${textAreaCss} focus:outline-2 focus:outline-offset-1 focus:outline-blue-700`}
          type={type}
          name={name}
          id={id}
          rows={textAreaRows}
          maxLength={textAreaMaxLength}
          defaultValue={stateValue}
          placeholder={`Enter ${name}...`}
          required={required}
          onChange={handleVaultFormChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      ) : (
        <input
          className={`bg-gray-200 flex-1 ml-2 p-2 rounded-lg focus:outline-2 focus:outline-offset-1 focus:outline-blue-700 ${inputCss}`}
          type={type}
          name={name}
          id={id}
          defaultValue={stateValue}
          placeholder={`Enter ${name}...`}
          required={required}
          onChange={handleVaultFormChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      )}
    </div>
  );
};

export default CommonFormInputs;
