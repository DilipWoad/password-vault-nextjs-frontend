"use client";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";
import axios from "axios";
import { BASE_URL } from "../constant";
import EachRow from "../components/EachRow.jsx";
import AddToVault from "../components/AddToVault.jsx";
import { copyToClipBoard } from "../utils/copyToClipboard.js";
import ShowPasswordContextProvider from "../context/ShowPasswordContextProvider.jsx";
import ComfirmationBox from "../components/ComfirmationBox.jsx";
import Link from "next/link.js";
import PinForm from "../components/PinForm.jsx";
import {
  EncryptionContext,
  useEncryptionContext,
} from "../utils/ContextApi/EncryptionContext.js";
import { redirect } from "next/navigation";
import UserPin from "../components/UserPin.jsx";


const userPasswordVault = () => {
  const [vaults, setVaults] = useState([]);
  const [showAddToVaultForm, setShowAddToVaultForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [editVault, setEditVault] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCopiedStatus, setShowCopiedStatus] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [showComfirmationBox, setShowComfirmationBox] = useState(false);
  const [disablePinButton, setDisablePinButton] = useState(true);
  const [pinExists, setPinExists] = useState(false);
  const [showGeneratePinBox, setShowGeneratePinBox] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [cipherPassword,setCipherPassword] = useState(null);


  ///////////
  const { sessionEncryptionKey } = useContext(EncryptionContext);
  ///////////

  const getVault = async () => {
    setLoading(true);
    try {
      console.log("inside");
      const res = await axios.get(`${BASE_URL}/vault`, {
        withCredentials: true,
      });
      console.log(res.data);
      setVaults(res.data.data);
    } catch (error) {
      console.log("Error while fetching user vault");
    } finally {
      setLoading(false);
    }
  };

  // console.log("Vault after deletion : ", arrayAfterDeletion);
  const handleEditClick = () => {
    //show the pinForm
    //if pinform return true then setShowEditForm
    //else -> return false return from here
    console.log("Edit Vault :: ",editVault)
    //only thing happen here is show User Pin\
    setShowPin(true)
    // setShowEditForm(true);
  };

  const handleCopyClick = async () => {
    //get the display-password div element
    const passwordDisplay = document.getElementById("passwordBox");

    // const text = passwordDisplay?.innerHTML;
    // console.log("Texxxxxxxxxxxxxxxxxt : ", text);
    // if (text !== undefined) {
    //   copyToClipBoard(text);
    //   setShowCopiedStatus(true);
    // }
    if (passwordDisplay) {
      const selected = passwordDisplay?.select();
      console.log("Selected text :: ", selected);
      document?.execCommand("copy");
      setShowCopiedStatus(true);
    }

    passwordDisplay.setSelectionRange(0, 0);
  };

  const handleDeleteClick = () => {
    setShowComfirmationBox(true);
  };

  const userPinExists = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vault/pin`, {
        withCredentials: true,
      });

      console.log("sdfghjkl;");
      return res.data.data.pinCreated;
    } catch (error) {
      console.error("Error while checking user Pin exists.");
      return false;
    }
  };

  const handleGeneratePinClick = () => {
    setShowGeneratePinBox(true);
  };
  useEffect(() => {
    console.log("SessionObj :: ", sessionEncryptionKey);
    if (!sessionEncryptionKey) {
      console.log("No key in memory. Redirecting to login.");

      redirect("/login");
    }
    getVault();
    const VaultPinExists = userPinExists();
    console.log("Vault pin exists", VaultPinExists);
    setDisablePinButton(VaultPinExists);
    setPinExists(VaultPinExists);
  }, []);
  useEffect(() => {
    if (showCopiedStatus) {
      setAnimation(false);

      const animationTimer = setTimeout(() => {
        setAnimation(true); // Start slide-out animation
      }, 2000); // Toast visible duration

      const hideTimer = setTimeout(() => {
        setShowCopiedStatus(false);
      }, 4000); // Total time to hide (2s visible + 2s animation)

      return () => {
        clearTimeout(animationTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [showCopiedStatus]);
  if (!vaults) {
    <LoadingScreen />;
  }
  return (
    <ShowPasswordContextProvider>
      <div className="bg-red-500 flex items-center justify-center h-screen relative">
        <div className="bg-green-500 pt-2 pb-4 px-10 rounded-lg flex-shrink-1 min-w-0 ">
          <div className=" flex justify-between mb-4 mt-5  text-sm  font-mono font-semibold">
            <button
              disabled={selectedRow.length < 1}
              onClick={handleDeleteClick}
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
            <span className="rounded-tl-lg bg-pink-500 flex flex-1 px-2 py-1 justify-center border-y-1 border-l-1 min-w-0 truncate">
              Title
            </span>
            <span className="bg-lime-500 flex flex-1 px-2 py-1 justify-center border-y-1 border-l-1 min-w-0 truncate">
              Username
            </span>
            <span className="bg-violet-500 flex flex-[1.5] px-2 py-1 justify-center border-y-1 border-l-1 min-w-0 truncate">
              Password
            </span>
            <span className="bg-sky-500 px-2 flex flex-1  py-1 justify-center border-y-1 border-l-1 min-w-0 truncate">
              URL
            </span>
            <span className="rounded-tr-lg bg-yellow-500 px-2 flex flex-1 py-1 justify-center border-y-1 border-x-1 min-w-0 truncate">
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
                id={"passwordBox"}
                handleCopyClick={handleCopyClick}
                showGeneratePinBox={showGeneratePinBox}
                setShowGeneratePinBox={setShowGeneratePinBox}
              />
            ))}
          <div className="py-2 flex gap-4 justify-center font-semibold text-sm">
            <button
              disabled={disablePinButton}
              onClick={handleGeneratePinClick}
              className={`${
                disablePinButton
                  ? "hover:cursor-not-allowed hover:bg-blue-400 hover:text-gray-600 bg-blue-300 text-gray-500"
                  : "bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white"
              }  px-3 py-2 rounded-md  `}
            >
              Generate Pin
            </button>
            <Link
              className="px-5 py-2 bg-blue-500 rounded-md"
              href={"/password-generator"}
              rel="_blank"
            >
              Generate Password
            </Link>
          </div>
        </div>

        {showGeneratePinBox && (
          <PinForm setShowGeneratePinBox={setShowGeneratePinBox} />
        )}

        {showAddToVaultForm && (
          <AddToVault
            setShowAddToVaultForm={setShowAddToVaultForm}
            setVaults={setVaults}
            isEdit={false}
            vaults={vaults}
          />
        )}
        {loading && <LoadingScreen />}

        {showPin && (
        <UserPin
          setShowPin={setShowPin}
          // setDisablePinButton={setDisablePinButton}
          // setEyeOpenAfterPin={setEyeOpenAfterPin}
          // setEyeOpen={setEyeOpen}
          setShowEditForm={setShowEditForm}
          setCipherPassword={setCipherPassword}
          cipherPassword={editVault.password}
          initializationVectorBase64={editVault.iv}
          setSelectedRow={setSelectedRow}
          setEditVault={setEditVault}
          isEditForm={true}
        />
      )}
        {showEditForm && (
          <AddToVault
            setShowAddToVaultForm={setShowEditForm}
            setVaults={setVaults}
            vaults={vaults}
            editVault={{...editVault,password:cipherPassword}}
            isEdit={true}
            setSelectedRow={setSelectedRow}
          />
        )}
        {showComfirmationBox && (
          <ComfirmationBox
            setShowComfirmationBox={setShowComfirmationBox}
            setSelectedRow={setSelectedRow}
            selectedRow={selectedRow}
            vaults={vaults}
            setVaults={setVaults}
          />
        )}

        {showCopiedStatus && (
          <p
            className={`bg-yellow-500 px-2 py-1 text-sm w-fit absolute top-50 transition-all duration-1000 ${
              animation ? "sm:translate-y-5 opacity-0  " : ""
            } rounded-md`}
          >
            Copied!
          </p>
        )}
      </div>
    </ShowPasswordContextProvider>
  );
};

export default userPasswordVault;
