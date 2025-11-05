"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen.jsx";
import axios from "axios";
import { BASE_URL } from "../constant.js";

const ComfirmationBox = ({
  setShowComfirmationBox,
  setSelectedRow,
  selectedRow,
  setVaults,
  vaults,
}) => {
  const [loading, setLoading] = useState(false);
  const handleCancelClick = () => {
    //close the comfirmation box
    //then also deselect the selected row
    setShowComfirmationBox(false);
    setSelectedRow([]);
  };

  const handleYesClick = async (arr) => {
    setLoading(true);
    try {
      // await axiosInstance.delete()
      const deleteArrayOfPromises = arr.map(
        async (vaultId) =>
          await axios.delete(`${BASE_URL}/vault/${vaultId}`, {
            withCredentials: true,
          })
      );
      //res give array of promises and it takes too much of time
      //this happens because this map func is fast it objective is over
      //but the request are waiting for each to finished so it lead to longer time
      //so we should do is promis.All to resolve all the pending promise in parallel
      const res = await Promise.all(deleteArrayOfPromises);
      console.log(res);
      //now remove the vault from the ui
      const arrayAfterDeletion = vaults.filter(
        (vault) => !selectedRow.includes(vault._id)
      );
      setVaults(arrayAfterDeletion);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSelectedRow([]);
      setShowComfirmationBox(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {loading && <LoadingScreen />}
      <div className="bg-black opacity-85 text-white flex flex-col font-mono px-2 py-4 rounded-lg w-72 text-center items-center gap-6">
        <div className="w-auto">Do you want to delete the selected vaults?</div>
        <div className="flex gap-10 text-sm">
          <button
            onClick={() => handleYesClick(selectedRow)}
            className="bg-blue-600 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-blue-500 hover:text-gray-200 transtion-all duration-300"
          >
            Yes
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-red-600 px-5 py-1 rounded-md hover:cursor-pointer hover:bg-red-500 hover:text-gray-200 transtion-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComfirmationBox;
