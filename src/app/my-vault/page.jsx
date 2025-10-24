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
  const [selectedRow, setSelectedRow] = useState([]);
  const [editVault, setEditVault] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const handleDelete = async (arr) => {
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
    }
  };

  // console.log("Vault after deletion : ", arrayAfterDeletion);
  const handleEditClick = () => {
    setShowEditForm(true);
  };
  // const handleSaveEditClick = async (id) => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.patch(`${BASE_URL}/vault/${id}`, {
  //       withCredentials: true,
  //     });
  //     setVaults(res.data.data);
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //     setVideoEditOption(true);
  //     setSelectedRow([]);
  //   }
  // };

  console.log("Selected edit Row : ", editVault);
  useEffect(() => {
    getVault();
  }, []);
  if (!vaults) {
    <LoadingScreen />;
  }
  return (
    <div className="bg-red-500 flex items-center justify-center h-screen">
      <div className="bg-green-500 w-auto pt-2 pb-10 px-10 rounded-lg ">
        <div className=" flex justify-between mb-4 mt-5  text-sm  font-mono font-semibold">
          <button
            disabled={selectedRow.length < 1}
            onClick={() => handleDelete(selectedRow)}
            className={`${
              selectedRow.length >= 1
                ? "hover:bg-red-500      bg-red-600 hover:cursor-pointer hover:text-gray-200 "
                : "hover:cursor-not-allowed bg-red-400 text-slate-300 "
            }transition-all duration-300 px-3 py-2 rounded-md`}
          >
            Delete
          </button>
          <div className="flex text-sm font-semibold font-mono gap-4">
            <button
              onClick={handleEditClick}
              disabled={selectedRow.length < 1 || selectedRow.length > 1}
              className={`${
                selectedRow.length === 1
                  ? "hover:bg-pink-500  bg-pink-600 hover:cursor-pointer hover:text-gray-200 "
                  : "bg-pink-400 hover:cursor-not-allowed text-slate-300"
              } px-7 py-2 rounded-md transition-all duration-300 `}
            >
              Edit
            </button>
            <button
              onClick={() => setShowAddToVaultForm(true)}
              className="hover:bg-purple-500 px-7 py-2 rounded-md bg-purple-700 hover:cursor-pointer hover:text-gray-200 transition-all duration-300"
            >
              Add
            </button>
          </div>
        </div>
        {/* table header + rows */}
        <div className="bg-blue-500 flex justify-between font-mono font-semibold text-xl  ">
          {/* <span className="rounded-tl-lg bg-pink-500 flex flex-1 px-2 py-1 justify-center border-y-1 border-l-1 text-sm">Select</span> */}
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
              key={vault._id}
              vaultIndex={index}
              vaultArrayLen={vaults.length}
              vault={vault}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
              setEditVault={setEditVault}
            />
          ))}
      </div>

      {showAddToVaultForm && (
        <AddToVault
          setShowAddToVaultForm={setShowAddToVaultForm}
          setVaults={setVaults}
          isEdit={false}
          vaults={vaults}
        />
      )}
      {loading && <LoadingScreen />}
      {showEditForm && (
        <AddToVault
          setShowAddToVaultForm={setShowEditForm}
          setVaults={setVaults}
          vaults={vaults}
          editVault={editVault}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default userPasswordVault;
