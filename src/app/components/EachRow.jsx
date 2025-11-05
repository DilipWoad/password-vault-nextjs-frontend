"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CLOSE_EYE, OPEN_EYE } from "../constant.js";
import ShowPasswordContext from "../context/ShowPasswordContext.js";
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
  const { title, username, password, note, url, _id } = vault;
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpenAfterPin, setEyeOpenAfterPin] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const isChecked = selectedRow.includes(_id)

  const handleCheckBoxClick = () => {
    if (!isChecked) {
      //we can add it to the array
      setEditVault(vault);
      setSelectedRow([...selectedRow, _id]);
    } else {
      //remove from the array
      console.log(_id);
      const newArray = selectedRow.filter((vaultId) => vaultId !== _id);
      setSelectedRow(newArray);
    }
  };

  const handleShowPasswordClick = () => {
    // so a pop-up screen asking for pin
    // setShowPassword(true);
    if (eyeOpen) {
      //then we don't need to ask for pin
      //
      setEyeOpen(false);
      setEyeOpenAfterPin(false);
    } else {
      // setEyeOpen(true);
      setShowPin(true);
    }
  };
  console.log(`After pin click : ${eyeOpenAfterPin} :: eyeOpen : ${eyeOpen}`);
  useEffect(() => {
    console.log("Outer running console....");
    if (eyeOpen && eyeOpenAfterPin) {
      console.log("Inner running console....");
      const closeEyeTimer = setTimeout(() => {
        console.log("Timer to close the eye start here ::....");
        setEyeOpen(false);
        setEyeOpenAfterPin(false);
      }, 10000);
      return () => clearTimeout(closeEyeTimer);
    }
  }, [eyeOpen,eyeOpenAfterPin]);

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
        <span className="flex flex-1 px-2 py-1 min-w-0  bg-violet-500 max-w-[155px] items-center justify-between border-l-1 border-y-1  ">
          <span
            onClick={() => handleCopyClick()}
            id={`${eyeOpen ? id : ""}`}
            className={` ${
              eyeOpen ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
            } 
            font-mono px-1 py-1 
            flex-1 truncate 
            `}
          >
            {eyeOpen && eyeOpenAfterPin ? password : "*************"}
          </span>
          <div
            onClick={handleShowPasswordClick}
            className=" hover:cursor-pointer hover:bg-gray-300 rounded-md h-fit p-1 transition-all duration-300 
            flex-shrink-0 "
          >
            <img
              className="w-5 "
              src={eyeOpen && eyeOpenAfterPin ? OPEN_EYE : CLOSE_EYE}
              alt="see-password-icon"
            />
          </div>
        </span>

        <Link
          href={url}
          target="_blank"
          rel="noopener"
          className="flex-1 px-2 py-1 bg-sky-500 text-wrap min-w-0 border-y-1 border-l-1 hover:underline transition-all duration-300"
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
        />
      )}
    </div>
  );
};

export default EachRow;
