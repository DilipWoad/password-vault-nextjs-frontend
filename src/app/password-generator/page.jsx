"use client";

import { useEffect, useState } from "react";
import {
  BASE_URL,
  PASSWORD_LETTERS,
  PASSWORD_NUMBERS,
  PASSWORD_SYMBOLS,
} from "../constant.js";
import { copyToClipBoard } from "../utils/copyToClipboard.js";
import PinForm from "../components/PinForm.jsx";
import axios from "axios";
import AddToVault from "../components/AddToVault.jsx";
import { redirect } from "next/navigation.js";

const passwordGenerator = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [showAddToVaultForm, setShowAddToVaultForm] = useState(false);
  const [disablePinButton, setDisablePinButton] = useState(true);
  const [showGeneratePinBox, setShowGeneratePinBox] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [sliderValue, setSliderValue] = useState(8);
  const [showCopiedStatus, setShowCopiedStatus] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const selectedCharactersArray = ["", "", ""];
  const [selectedCharacters, setSelectedCharacters] = useState(
    selectedCharactersArray
  );
  const checkedStatusObj = {
    letters: false,
    numbers: false,
    symbols: false,
  };
  const [checked, setChecked] = useState(checkedStatusObj);

  const passwordGeneratorFunction = (charArray) => {
    for (let i = 0; i < sliderValue; i++) {
      const selectCharacterIndex = Math.floor(Math.random() * 3);

      //check if anyone field is non-empty.
      // console.log("first loop", charArray);
      if (
        charArray.some((feild) => {
          return feild !== "";
        })
      ) {
        // console.log("selectCharacterIndex : ", selectCharacterIndex);
        let characterArray = charArray[selectCharacterIndex];
        // console.log("before :", characterArray);
        while (characterArray === "") {
          //first choose the index btween(0,1,2)
          // console.log("Inside while loop");
          const selectCharIndex = Math.floor(Math.random() * 3);
          characterArray = charArray[selectCharIndex];
          // console.log("Inside while charValue :", characterArray);
        }
        //check again
        // console.log("After array : ", characterArray);
        //now take a randon index from letter/number/symbol
        let min = 0;
        let max = characterArray.length - 1;
        let randomChar = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log("randomChar : ", randomChar);
        // console.log("choosen char : ", characterArray[randomChar]);
        //then add it to the generatedPassword state->by first get the prevs vaule then add into it
        setGeneratedPassword((prev) => prev + characterArray[randomChar]);
      }
      // setGeneratedPassword("");
      // return;
    }
    //this will get which to choose letter/number/symbols
    //once choosed
  };

  const handleCheckBoxChnage = (e) => {
    // setUseEffectStartCounter(2)
    setGeneratedPassword("");
    console.log(e.target);
    const key = e.target.id;
    const index = parseInt(e.target.value, 10);
    const newSelectedCharacters = [...selectedCharacters];
    // console.log("This is with . notation",checked.key)
    // console.log("This is with [] notation", checked[key]);
    // console.log("This is index", index);
    //add in the array if the checked[key] is false
    if (!checked[key]) {
      console.log("does it");

      if (index === 0) {
        newSelectedCharacters[0] = PASSWORD_LETTERS;
      }
      if (index === 1) {
        newSelectedCharacters[1] = PASSWORD_NUMBERS;
      }
      if (index === 2) {
        newSelectedCharacters[2] = PASSWORD_SYMBOLS;
      }
    } //if checked[Key] true remove from the array
    else {
      newSelectedCharacters[index] = "";
    }

    setSelectedCharacters(newSelectedCharacters);
    console.log(newSelectedCharacters);
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    passwordGeneratorFunction(newSelectedCharacters);
  };

  const handleSliderChnage = (e) => {
    // setUseEffectStartCounter(2);
    setGeneratedPassword("");
    setSliderValue(e.target.value);
    passwordGeneratorFunction(selectedCharacters);
  };

  const handleCopyClick = async () => {
    //get the display-password div element
    const passwordDisplay = document.getElementById("password-display");
    // console.log("Password Display : ",passwordDisplay.innerHTML)
    const text = passwordDisplay.innerHTML;
    copyToClipBoard(text);
    setShowCopiedStatus(true);
  };

  const userPinExists = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vault/pin`, {
        withCredentials: true,
      });

      return res.data.data.pinCreated;
    } catch (error) {
      console.error("Error while checking user Pin exists.");
      return true;
    }
  };

  const handleCreateClick = async () => {
    //first check if pin is create
    const res = await userPinExists();
    //if not having pin
    console.log("res", res);
    if (!res) {
      //if false
      //show the generate pin button and also chage it from disable{true}to-> disabled{false}
      setDisablePinButton(false);
      //then call for creating pin
    }
    //if true it comes here
    console.log("If true come here!!");
    //we will send it to my-vault page /OR/
    // i can do if call a addValutForm component here too
    setShowAddToVaultForm(true);
  };

  const handleGeneratePinClick = async () => {
    setShowGeneratePinBox(true);
  };

  const handleGoToVaultClick = () => {
    //just move it to my-vault page\
    redirect("/my-vault");
  };

  useEffect(() => {
    if (showCopiedStatus) {
      // setShowCopiedStatus(false);
      setAnimation(false);

      const hideTimer = setTimeout(() => {
        console.log("Animation ?");
        setAnimation(true); // Start slide-out animation
        setTimeout(() => {
          console.log("Animation ?");
          setShowCopiedStatus(false);
        }, 2000); // Allow animation to complete
      }, 2000); // Toast visible duration

      return () => clearTimeout(hideTimer);
    }
  }, [showCopiedStatus]);
  return (
    <div className="bg-blue-700 flex flex-col justify-center items-center h-screen">
      <div className="mb-8 flex justify-end w-6/12">
        <button
          disabled={disablePinButton}
          onClick={handleGeneratePinClick}
          className={`${
            disablePinButton
              ? "hover:cursor-not-allowed hover:bg-green-400 hover:text-gray-600 bg-green-300 text-gray-500"
              : "bg-green-500 hover:cursor-pointer hover:bg-green-600 text-white"
          }  px-3 py-2 rounded-md  font-semibold text-sm`}
        >
          Generate Pin
        </button>
      </div>
      <div className="bg-red-500 w-6/12 h-8/12 rounded-4xl shadow-2xl overflow-hidden flex flex-col">
        {/* Display Field + copy button div */}
        <div className=" flex px-20 py-10 items-center">
          <div className="flex-1 relative">
            <div id="password-display" className="bg-green-500 p-2 rounded-md">
              {generatedPassword || "Your Password Here"}
            </div>
            {showCopiedStatus && (
              <p
                className={`bg-yellow-500 px-2 py-1 text-sm w-fit absolute left-50 top-11 transition-all duration-1000 ${
                  animation ? "sm:translate-y-5 opacity-0  " : ""
                } rounded-md`}
              >
                Copied!
              </p>
            )}
          </div>
          <button
            onClick={handleCopyClick}
            className="bg-yellow-500 ml-2 p-2 rounded-md hover:cursor-pointer font-semibold hover:bg-yellow-400"
          >
            Copy
          </button>
        </div>
        {/* container for length slidder + all char selector */}
        <div className=" flex-1 flex flex-col items-center justify-center gap-4">
          <div className=" w-8/12">
            <h2>Password Length: {sliderValue}</h2>
            <input
              type="range"
              min="4"
              max="32"
              value={sliderValue}
              onChange={handleSliderChnage}
              className="w-full"
            />
            <div className="flex justify-between font-semibold">
              <p>4</p>
              <p>32</p>
            </div>
          </div>
          <div className="flex w-6/12 justify-between mt-8 p-2 font-semibold">
            <div>
              <input
                type="checkbox"
                id="letters"
                checked={checked.letters}
                onChange={handleCheckBoxChnage}
                value={0}
              />
              <label className="ml-1">Letters</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="numbers"
                checked={checked.numbers}
                onChange={handleCheckBoxChnage}
                value={1}
              />
              <label className="ml-1">Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="symbols"
                checked={checked.symbols}
                onChange={handleCheckBoxChnage}
                value={2}
              />
              <label className="ml-1">Symbols</label>
            </div>
          </div>
        </div>
        <div className="py-8 flex gap-4 justify-center text-white">
          <button
            onClick={handleCreateClick}
            className="bg-green-500 px-3 py-2 rounded-lg hover:cursor-pointer hover:bg-green-600 hover:text-gray-300"
          >
            Create
          </button>
          <button
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
            onClick={handleGoToVaultClick}
            className="transition-all duration-500 bg-yellow-500 px-3 py-2 rounded-lg hover:cursor-pointer hover:bg-yellow-600 hover:text-gray-300"
          >
            {`Go to Vault`}
            {showArrow && <span>{`->`}</span>}
          </button>
        </div>
      </div>
      {showGeneratePinBox && (
        <PinForm
          showGeneratePinBox={showGeneratePinBox}
          setShowGeneratePinBox={setShowGeneratePinBox}
        />
      )}
      {showAddToVaultForm && (
        <AddToVault
          setShowAddToVaultForm={setShowAddToVaultForm}
          setGeneratedPassword={setGeneratedPassword}
          fromGenerator={true}
        />
      )}
    </div>
  );
};

export default passwordGenerator;
