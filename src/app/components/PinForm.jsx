"use client";

import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constant.js";
import LoadingScreen from "../components/LoadingScreen.jsx";

const PinForm = ({showGeneratePinBox,setShowGeneratePinBox}) => {
  const [pin, setPin] = useState("");
  const [retypePin, setRetryPin] = useState("");
  const [loading, setLoading] = useState(false);
  const generatePin = async () => {
    // let redirectPath = null;
    console.log("Inside Generate Pin.")
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/vault/pin`,
        { pin },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      //   redirectPath = "/home";
      setShowGeneratePinBox(false);
      setLoading(false);
    } catch (error) {
      console.log("Error while generating pin : ", error);
      //   redirectPath = "/login";
      setLoading(false);
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    //first check if pin and retry-pin are same
    if(pin.length !== 4){
      console.error("Pin length should be 4.")
    }
    if (pin !== retypePin) {
      console.error("Pin and the retypePin are not same.");
      return;
    }
    // console.log(loginDetails);
    await generatePin();
  };

  const handleCancelPinClick =()=>{
    setShowGeneratePinBox(false)
  }

  // const handlePinSubmit=()=>{
  //   //on click set pin
  //   //we will first check if pin is of length 4 and if both pin and retry pin matches

  // }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <form
        onSubmit={handlePinSubmit}
        className="bg-white min-w-80 flex  flex-col gap-10 p-4 rounded-lg shadow-lg"
      >
        {/* Email */}
        <p className="text-lg font-semibold text-center">Generate Pin</p>

        <div className="flex justify-between items-center">
          <label htmlFor="pin">Pin : </label>
          <input
            className="bg-gray-200 p-2 rounded-lg"
            type="pin"
            name="pin"
            id="pin"
            defaultValue={pin}
            //   value={email}
            placeholder="Enter Pin..."
            required={true}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        {/* Re-Type Pin */}
        <div className="flex justify-between items-center">
          <label htmlFor="retype-pin">Re-Type Pin : </label>
          <input
            className="bg-gray-200 p-2 rounded-lg ml-2"
            type="retype-pin"
            name="retype-pin"
            id="retype-pin"
            defaultValue={retypePin}
            //   value={email}
            placeholder="Enter Re-Type Pin..."
            required={true}
            onChange={(e) => setRetryPin(e.target.value)}
          />
        </div>
        <div className="flex gap-4 justify-end text-white ">
          <button
          onClick={handleCancelPinClick}
          className="hover:cursor-pointer hover:bg-red-600 bg-red-500 hover:text-gray-300 rounded-md px-3 py-2 text-sm font-semibold"
        >
          Cancel
        </button>
          <button
          type="submit"
          className="hover:cursor-pointer hover:bg-blue-600 bg-blue-500 hover:text-gray-300 rounded-md px-3 py-2 text-sm font-semibold"
        >
          Create Pin
        </button>
        </div>
      </form>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default PinForm;
