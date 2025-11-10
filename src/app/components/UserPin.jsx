"use client";

import { useState, useRef, useContext } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";
import { decryptPassword } from "../utils/decryptPassword.js";
import { EncryptionContext } from "../utils/ContextApi/EncryptionContext";

const UserPin = ({
  setShowPin,
  length = 4,
  setEyeOpen,
  setDisablePinButton,
  setEyeOpenAfterPin,
  cipherPassword,
  setCipherPassword,
  initializationVectorBase64,
}) => {
  const inputRef = useRef([]);
  const [eachPin, setEachPin] = useState(["", "", "", ""]);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);

  const { sessionEncryptionKey } = useContext(EncryptionContext);

  const handleInputChange = (value, index) => {
    //we have the value -> means onChange in the input we got the text typed on it
    //now need to update the state with new value
    //as we have index also so we know which input to update
    const newArray = [...eachPin];
    newArray[index] = value;
    //so the newArray will have updated array
    //so we can replace the original with this newArray
    setEachPin(newArray);

    //other logic

    //to move to next input
    //if my current input index length ==1 that mean the value is added
    // and it is not the last input feild
    //if value is added move to the next input
    if (value.length === 1 && index < length - 1) {
      console.log("Each input element :", inputRef.current);
      inputRef.current[index + 1]?.focus();
    }

    //if we change the value mean delete the input value string "" so move back to prev index
    if (value.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    //if it reaches the end input with no empty value
    //do a function call or we can click on OK
    if (newArray.every((value) => value !== "")) {
      //do a call to backend? for pin check
      //combine the string
      //function(newArray.join(''))
      const concatPin = newArray.join("");
      setPin(concatPin);
    }
  };
  const userPinExists = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vault/pin`, {
        withCredentials: true,
      });

      return res.data.data.pinCreated;
    } catch (error) {
      console.error("Error while checking user Pin exists.");
      return true;
    }
  };

  const handleOkClick = async () => {
    try {
      const isPinGenerated = await userPinExists();
      if (!isPinGenerated) {
        //if false
        //show the generate pin button and also chage it from disable{true}to-> disabled{false}
        setDisablePinButton(false);
        //then call for creating pin
      }
      console.log("igyuyufy", pin);
      const res = await axios.post(
        `${BASE_URL}/vault/pin/verify`,
        { pin },
        {
          withCredentials: true,
        }
      );

      console.log("Gen pin value : ", res.data.data);
      if (res.data.data) {
        //decrypt pass here
        const truePassword = await decryptPassword(
          sessionEncryptionKey,
          initializationVectorBase64,
          cipherPassword
        );
        console.log("Decoded Password is  :: ",truePassword)
        setCipherPassword(truePassword);
        setShowPin(false);
      } else {
        setError("Invalid Pin");
      }

      setEyeOpenAfterPin(res.data.data);
      setEyeOpen(res.data.data);
    } catch (error) {
      console.error("Error while checking user pin. :: ", error);
    }
  };

  const handlePinCancelClick = () => {
    setEyeOpenAfterPin(false);
    setShowPin(false);
    setEyeOpen(false);
  };

  console.log("Each pin : ", eachPin);
  console.log("Pin :", pin);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className=" bg-black/85 rounded-md h-auto flex flex-col justify-between p-2 font-mono">
        <p className="text-white text-lg text-center ">Enter Pin</p>
        <div className="flex  gap-3 justify-center items-center py-2 flex-1 ">
          {Array.from({ length }, (_, index) => (
            <input
              key={index}
              type="text"
              defaultValue={eachPin[index]}
              onChange={(e) => handleInputChange(e.target.value, index)}
              ref={(element) => (inputRef.current[index] = element)}
              className={`${
                error && eachPin[index].length === 1
                  ? "border-red-600"
                  : "focus:border-blue-600"
              } bg-gray-100 w-10 h-12 rounded-md text-center text-2xl border-2 border-solid border-border-slate-500  outline-none `}
              maxLength={1}
            />
          ))}
        </div>
        <p
          className={`${
            error ? "text-red-500" : ""
          }  py-2  text-center text-sm `}
        >
          {error}
        </p>

        <div className=" flex gap-3 justify-center ">
          <button
            onClick={handlePinCancelClick}
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
