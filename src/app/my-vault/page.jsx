"use client";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";
import axios from "axios";
import { BASE_URL } from "../constant";
import EachRow from "../components/EachRow.jsx";
import AddToVault from "../components/AddToVault.jsx";

const userPasswordVault = () => {
  const [vaults, setVaults] = useState([]);
  const [showAddToVaultForm, setShowAddToVaultForm] = useState(false);
  const getVault = async () => {
    try {
      console.log("inside");
      const res = await axios.get(`${BASE_URL}/vault`, {
        withCredentials: true,
      });
      console.log(res.data);
      setVaults(res.data.data);
    } catch (error) {
      console.log("Error while fetching user vault");
    }
  };
  useEffect(() => {
    getVault();
  }, []);
  if (!vaults) {
    <LoadingScreen />;
  }
  return (
    <div className="bg-red-500 flex items-center justify-center h-screen">
      <div className="bg-green-500 w-6/12 pt-2 pb-5 px-5 rounded-lg">
        <div className=" flex justify-between mb-4 mt-5">
          <button className="bg-lime-500 px-3 py-2 text-sm font-semibold font-mono rounded-md hover:bg-lime-600 hover:cursor-pointer hover:text-gray-200 transition-all duration-300">
            Delete
          </button>
          <div className="flex text-sm font-semibold font-mono gap-4">
            <button className="bg-pink-500 px-7 py-2 rounded-md hover:bg-pink-600 hover:cursor-pointer hover:text-gray-200 transition-all duration-300">
              Edit
            </button>
            <button
              onClick={() => setShowAddToVaultForm(true)}
              className="bg-purple-500 px-7 py-2 rounded-md hover:bg-purple-600 hover:cursor-pointer hover:text-gray-200 transition-all duration-300"
            >
              Add
            </button>
          </div>
        </div>
        {/* table header + rows */}
        <div className="bg-blue-500 flex justify-between font-mono font-semibold text-xl  ">
          <span className="rounded-tl-lg bg-pink-500 flex flex-1 px-2 py-1 justify-center border-y-1 border-l-1">
            Title
          </span>
          <span className="bg-lime-500 flex flex-1 px-2 py-1 justify-center border-y-1 border-l-1">
            Username
          </span>
          <span className="bg-violet-500 flex flex-1 px-2 py-1 justify-center border-y-1 border-l-1">
            Password
          </span>
          <span className="bg-sky-500 px-2 flex flex-1  py-1 justify-center border-y-1 border-l-1">
            URL
          </span>
          <span className="rounded-tr-lg bg-yellow-500 px-2 flex flex-1 py-1 justify-center border-y-1 border-x-1">
            Note
          </span>
        </div>
        {vaults &&
          vaults.map((vault, index) => (
            <EachRow
              key={vault.password}
              vaultIndex={index}
              vaultArrayLen={vaults.length}
              vault={vault}
            />
          ))}
      </div>

      {showAddToVaultForm && (
        <AddToVault setShowAddToVaultForm={setShowAddToVaultForm} setVaults={setVaults} vaults={vaults} />
      )}
    </div>
  );
};

export default userPasswordVault;
