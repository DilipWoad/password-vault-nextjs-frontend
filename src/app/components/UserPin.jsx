"use client";

import { useState } from "react";

const UserPin = ({ setShowPin }) => {
  const inputPinObj = {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  };

  const [eachPin, setEachPin] = useState(inputPinObj);
  const [pin, setPin] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEachPin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOkClick = () => {
    Object.values(eachPin).forEach((value) => {
      setPin((prev) => prev + value);
    });
    
  };

  console.log("Each pin : ", eachPin);
  console.log("Pin :", pin);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className=" bg-black/85 rounded-md h-48 flex flex-col justify-between p-2">
        <div className="flex  gap-3 justify-center items-center flex-1">
          <input
            onChange={handleInputChange}
            name="input1"
            defaultValue={eachPin.input1}
            className="bg-gray-100 w-10 h-12 rounded-md text-center text-2xl "
            maxLength={1}
            enterKeyHint=""
          />
          <input
            onChange={handleInputChange}
            name="input2"
            defaultValue={eachPin.input2}
            className="bg-gray-100 w-10 h-12 rounded-md text-center text-2xl"
            maxLength={1}
          />
          <input
            onChange={handleInputChange}
            name="input3"
            defaultValue={eachPin.input3}
            className="bg-gray-100 w-10 h-12 rounded-md text-center text-2xl"
            maxLength={1}

          />
          <input
            onChange={handleInputChange}
            name="input4"
            defaultValue={eachPin.input4}
            className="bg-gray-100 w-10 h-12 rounded-md text-center text-2xl"
            maxLength={1}
          />
        </div>
        <div className=" flex gap-3 justify-center">
          <button
            onClick={() => setShowPin(false)}
            className="px-7 py-2 text-sm hover:bg-gray-300 hover:text-gray-500  bg-gray-200 font-semibold rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleOkClick}
            className="bg-blue-500 hover:bg-blue-400 hover:text-gray-300 px-9 py-2 text-sm font-semibold rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPin;
