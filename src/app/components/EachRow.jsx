"use client";

import axios from "axios";
import { useState } from "react";

const EachRow = ({
  vault,
  vaultArrayLen,
  vaultIndex,
  selectedRow,
  setSelectedRow,
}) => {
  const { title, username, password, note, url, _id } = vault;
  const [eyeOpen, setEyeOpen] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  const handleCheckBoxClick = () => {
    if (!checkboxStatus) {
      //we can add it to the array
      setSelectedRow([...selectedRow, _id]);
    } else {
      //remove from the array
      console.log(_id);
      const newArray = selectedRow.filter((vaultId) => vaultId !== _id);
      console.log("New Array : ", newArray);
      setSelectedRow(newArray);
    }
    //change the status of checkbox
    setCheckboxStatus(!checkboxStatus);
  };
  
  return (
    <div className="flex relative ">
      <input
        type="checkbox"
        defaultValue={_id}
        defaultChecked={checkboxStatus}
        onChange={handleCheckBoxClick}
        className={`${selectedRow.length>1 ? "accent-red-500":""} absolute -left-7 bg-red-500 h-full hover:cursor-pointer `}
      ></input>
      <div className=" flex justify-between truncate text-sm ">
        <span
          className={`${
            vaultArrayLen - 1 === vaultIndex ? "rounded-bl-lg" : ""
          } truncate justify-center bg-pink-500 flex flex-1 px-2 py-1 w-[133px] text-wrap items-center  border-y-1 border-l-1`}
        >
          {title}
        </span>
        <span className="justify-center truncate bg-lime-500 flex flex-1 px-2 py-1 w-[133px] border-y-1 items-center  border-l-1">
          {username}
        </span>
        <span className="flex flex-1 max-w-[133px] bg-violet-500 items-center justify-between border-l-1 border-y-1 ">
          <span className="truncate  px-1 py-1 transition-all  items-center  ">
            {eyeOpen ? password : "******************"}
          </span>
          <button
            onClick={() => setEyeOpen(!eyeOpen)}
            className="hover:cursor-pointer h-fit"
          >
            eye
          </button>
        </span>
        <span className="truncate bg-sky-500 px-2 flex flex-1  py-1 w-[133px]  border-y-1 items-center  border-l-1">
          {url}
        </span>
        <span
          className={`${
            vaultArrayLen - 1 === vaultIndex ? "rounded-br-lg" : ""
          }  truncate text-wrap bg-yellow-500 px-2 flex flex-1 py-1 w-[133px]  border-y-1 items-center  border-x-1`}
        >
          {note}
        </span>
      </div>
    </div>
  );
};

export default EachRow;
