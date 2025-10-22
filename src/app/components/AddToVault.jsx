"use client";

import { useState } from "react";

import CommonFormInputs from "./CommonFormInputs.jsx";
import axios from "axios";
import { BASE_URL } from "../constant.js";
import LoadingScreen from "./LoadingScreen.jsx";

const AddToVault = ({ setShowAddToVaultForm,setVaults,vaults }) => {
  const [loading, setLoading] = useState(false);

  const vaultFormObj = {
    title: "",
    username: "",
    password: "",
    url: "",
    note: "",
  };

  const [vaultForm, setVaultForm] = useState(vaultFormObj);

  console.log("Vault form : ", vaultForm);
//   const handleVaultFormChange = (e) => {
//     const { name, value } = e.target;

//     setVaultForm((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
    const createVault = async (e) => {
      // let redirectPath = null;
      e.preventDefault();
      console.log("Inside Generate Vault.");
      setLoading(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/vault`,
          vaultForm ,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setVaults([...vaults,res.data.data])
        setShowAddToVaultForm(false);
        setLoading(false);
      } catch (error) {
        console.error("Error while creating vault: ", error);
        //   redirectPath = "/login";
        setLoading(false);
      }
    };

  //   const handlePinSubmit = async (e) => {
  //     e.preventDefault();
  //     //first check if pin and retry-pin are same
  //     if (pin.length !== 4) {
  //       console.error("Pin length should be 4.");
  //     }
  //     if (pin !== retypePin) {
  //       console.error("Pin and the retypePin are not same.");
  //       return;
  //     }
  //     // console.log(loginDetails);
  //     await generatePin();
  //   };

  const handleCancelVaultForm = () => {
    setShowAddToVaultForm(false);
  };

  // const handlePinSubmit=()=>{
  //   //on click set pin
  //   //we will first check if pin is of length 4 and if both pin and retry pin matches

  // }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <form
        onSubmit={createVault}
        className="bg-white w-4/12  flex flex-col gap-5 p-4 rounded-lg shadow-lg"
      >
        <p className="text-2xl p-2 font-semibold">Add to Vault</p>

        {/* Title */}
        <CommonFormInputs
          label={"Title"}
          type={"text"}
          name={"title"}
          id={"name"}
          stateValue={vaultForm.title}
          required={true}
          stateFunction={setVaultForm}
        />

        {/* Username */}
        <CommonFormInputs
          label={"Username"}
          type={"text"}
          name={"username"}
          id={"username"}
          stateValue={vaultForm.username}
          required={true}
          stateFunction={setVaultForm}
        />

        {/* Password */}
        <CommonFormInputs
          label={"Password"}
          type={"password"}
          name={"password"}
          id={"password"}
          stateValue={vaultForm.password}
          required={true}
          stateFunction={setVaultForm}
        />

        {/* Url */}
        <CommonFormInputs
          label={"Url"}
          type={"text"}
          name={"url"}
          id={"url"}
          stateValue={vaultForm.url}
          required={true}
          stateFunction={setVaultForm}
        />

        {/* Note */}
        <CommonFormInputs
          label={"Note(optional)"}
          type={"text"}
          name={"note"}
          id={"note"}
          textAreaRows={6}
          isTextArea={true}
          textAreaMaxLength={200}
          stateValue={vaultForm.note}
          required={false}
          stateFunction={setVaultForm}
          divCss={"items-start"}
          textAreaCss={"ml-10 "}
        />
        <div className="flex gap-4 justify-end text-white ">
          <button
            onClick={handleCancelVaultForm}
            className="hover:cursor-pointer hover:bg-red-600 bg-red-500 hover:text-gray-300 rounded-md px-3 py-2 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="hover:cursor-pointer hover:bg-blue-600 bg-blue-500 hover:text-gray-300 rounded-md px-3 py-2 text-sm font-semibold"
          >
            Add to Vault
          </button>
        </div>
      </form>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default AddToVault;
