"use client";

import { useEffect, useState } from "react";
import { CLOSE_EYE, OPEN_EYE } from "../constant.js";
import LoadingScreen from "./LoadingScreen.jsx";
import UserPin from "./UserPin.jsx";
import Link from "next/link.js";

const EachRow = ({
  vault,
  vaultArrayLen,
  vaultIndex,
  selectedRow,
  setSelectedRow,
  setEditVault,
  handleCopyClick,
  id,
}) => {
  const { title, username, password, note, url, _id, iv } = vault;
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpenAfterPin, setEyeOpenAfterPin] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [cipherPassword, setCipherPassword] = useState("");

  const isChecked = selectedRow.includes(_id);

  const handleCheckBoxClick = () => {
    if (!isChecked) {
      //we can add it to the array
      setEditVault(vault);
      setSelectedRow([...selectedRow, _id]);
    } else {
      //remove from the array
      // console.log(_id);
      const newArray = selectedRow.filter((vaultId) => vaultId !== _id);
      setSelectedRow(newArray);
    }
  };
  ///////////////////////// MAKE IV AS A STATE FOR EACH
  const handleShowPasswordClick = () => {
    // so a pop-up screen asking for pin
    // setShowPassword(true);
    if (eyeOpen) {
      //then we don't need to ask for pin
      //
      setEyeOpen(false);
      setEyeOpenAfterPin(false);
      setCipherPassword(password);
    } else {
      // setEyeOpen(true);
      setShowPin(true);
    }
  };

  useEffect(()=>{
    setCipherPassword(password)
  },[password]);
  // console.log(`After pin click : ${eyeOpenAfterPin} :: eyeOpen : ${eyeOpen}`);
  useEffect(() => {
    // console.log("Outer running console....");
    if (eyeOpen && eyeOpenAfterPin) {
      // console.log("Inner running console....");
      const closeEyeTimer = setTimeout(() => {
        // console.log("Timer to close the eye start here ::....");
        setEyeOpen(false);
        setEyeOpenAfterPin(false);
        setCipherPassword(password);
      }, 10000);
      return () => clearTimeout(closeEyeTimer);
    }
  }, [eyeOpen, eyeOpenAfterPin]);

  console.log("Password that was passed from the page ::: ",password)
  console.log("Cipher Text :: in each row for control and uncontrol :: ",cipherPassword)

  return (
    <div className="flex relative font-mono ">
      <input
        type="checkbox"
        defaultValue={_id}
        checked={isChecked}
        onChange={handleCheckBoxClick}
        className={`${
          selectedRow.length > 1 ? "accent-red-500" : ""
        } absolute -left-7 top-1/2 -translate-y-1/2  hover:cursor-pointer `} //or -left-7
      ></input>
      <div className="flex text-sm w-full">
        <span
          className={`${
            vaultArrayLen - 1 === vaultIndex ? "rounded-bl-lg" : ""
          } 
          flex-1 px-2 py-1 bg-pink-500 
          text-wrap min-w-0 
          border-y-1 border-l-1`}
        >
          {title}
        </span>
        <span className="flex-1 px-2 py-1 bg-lime-500 truncate min-w-0 border-y-1 border-l-1 text-center">
          {/* <-- Kept truncate for username, but added min-w-0 and removed fixed width */}
          {username}
        </span>

        {/* <-- Password column fix --> */}
        <span className="flex flex-[1.5] px-2 py-1 min-w-0 z-10  bg-violet-500 items-center justify-between border-l-1 border-y-1 ">
          <div className=" flex w-full items-center">
            <input
              id={`${eyeOpen ? id : ""}`}
              type={eyeOpen && eyeOpenAfterPin ? "text" : "password"}
              className={`
            font-mono px-1 py-1
             flex-1 min-w-0 truncate 
            `}
              value={eyeOpen && eyeOpenAfterPin ? cipherPassword : password} //here error of controll and uncroll due to value changed from defined to undefined due to error
              readOnly
            ></input>
            <div
              onClick={handleShowPasswordClick}
              className=" hover:cursor-pointer hover:bg-gray-300 rounded-md h-fit p-1 transition-all duration-300 
            flex-shrink-0 "
            >
              <img
                className="w-5"
                src={eyeOpen && eyeOpenAfterPin ? OPEN_EYE : CLOSE_EYE}
                alt="see-password-icon"
              />
            </div>
            <button
              onClick={() => handleCopyClick()}
              disabled={!(eyeOpen && eyeOpenAfterPin)}
              className={` text-sm font-semibold tracking-tighter px-0.5 py-1 rounded-md ml-1 transition-all duration-300  ${
                eyeOpen && eyeOpenAfterPin
                  ? "cursor-pointer hover:bg-gray-400  bg-gray-300"
                  : "cursor-not-allowed hover:bg-gray-400 bg-gray-300 text-slate-500"
              }`}
            >
              Copy
            </button>
          </div>
        </span>

        <Link
          href={url}
          target="_blank"
          rel="noopener"
          className="flex-1 px-2 py-1 bg-sky-500 text-wrap min-w-0 border-y-1 border-l-1 hover:underline transition-all duration-300 break-words"
        >
          {/* <-- THIS IS YOUR FIX: removed truncate, added min-w-0 & items-start */}
          {url}
        </Link>

        <span
          className={`${
            vaultArrayLen - 1 === vaultIndex ? "rounded-br-lg" : ""
          } 
          flex flex-1 px-2 py-1 bg-yellow-500 items-start text-wrap min-w-0 border-y-1 border-x-1`}
        >
          {/* <-- REMOVED fixed width & truncate, ADDED min-w-0 & items-start */}
          {note}
        </span>
      </div>
      {showPin && (
        <UserPin
          setShowPin={setShowPin}
          // setDisablePinButton={setDisablePinButton}
          setEyeOpenAfterPin={setEyeOpenAfterPin}
          setEyeOpen={setEyeOpen}
          setCipherPassword={setCipherPassword}
          cipherPassword={cipherPassword}
          initializationVectorBase64={iv}
        />
      )}
    </div>
  );
};

export default EachRow;
