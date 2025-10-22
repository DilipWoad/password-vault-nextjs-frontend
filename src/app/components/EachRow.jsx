"use client";

import { useState } from "react";

const EachRow = ({ vault, vaultArrayLen, vaultIndex }) => {
  const { title, username, password, note, url } = vault;
  const [eyeOpen, setEyeOpen] = useState(false);
  return (
    //  <input type="checkbox"></input>
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
            {eyeOpen ? password : "*****************"}
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
  );
};

export default EachRow;
