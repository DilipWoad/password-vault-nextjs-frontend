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

const PasswordGenerator = () => { // Renamed for convention
  const [showArrow, setShowArrow] = useState(false);
  const [showAddToVaultForm, setShowAddToVaultForm] = useState(false);
  const [disablePinButton, setDisablePinButton] = useState(true); // Should be true initially if PIN is not set
  const [showGeneratePinBox, setShowGeneratePinBox] = useState(false);
  const [animation, setAnimation] = useState(false); // For "Copied!" toast animation
  const [sliderValue, setSliderValue] = useState(8);
  const [showCopiedStatus, setShowCopiedStatus] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const selectedCharactersArray = ["", "", ""]; // Initial state for character types
  const [selectedCharacters, setSelectedCharacters] = useState(
    selectedCharactersArray
  );
  const checkedStatusObj = {
    letters: false,
    numbers: false,
    symbols: false,
  };
  const [checked, setChecked] = useState(checkedStatusObj);

  // Function to generate the password
  const passwordGeneratorFunction = (charArray) => {
    setGeneratedPassword(""); // Clear previous password
    let newPassword = "";
    const enabledCharSets = charArray.filter(set => set !== "");

    if (enabledCharSets.length === 0) {
      setGeneratedPassword("Select at least one option");
      return;
    }

    for (let i = 0; i < sliderValue; i++) {
      const randomSetIndex = Math.floor(Math.random() * enabledCharSets.length);
      const characterSet = enabledCharSets[randomSetIndex];
      const randomCharIndex = Math.floor(Math.random() * characterSet.length);
      newPassword += characterSet[randomCharIndex];
    }
    setGeneratedPassword(newPassword);
  };

  // Trigger password generation on initial load or when options change
  useEffect(() => {
    passwordGeneratorFunction(selectedCharacters);
  }, [sliderValue, selectedCharacters]); // Depend on sliderValue and selectedCharacters

  const handleCheckBoxChange = (e) => {
    const key = e.target.id;
    const index = parseInt(e.target.value, 10);
    const newSelectedCharacters = [...selectedCharacters];

    // Toggle the selected character type
    if (!checked[key]) {
      if (key === "letters") newSelectedCharacters[index] = PASSWORD_LETTERS;
      if (key === "numbers") newSelectedCharacters[index] = PASSWORD_NUMBERS;
      if (key === "symbols") newSelectedCharacters[index] = PASSWORD_SYMBOLS;
    } else {
      newSelectedCharacters[index] = "";
    }

    setSelectedCharacters(newSelectedCharacters);
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10)); // Ensure slider value is number
  };

  const handleCopyClick = async () => {
    const textToCopy = generatedPassword;
    if (textToCopy && textToCopy !== "Select at least one option") {
      await copyToClipBoard(textToCopy);
      setShowCopiedStatus(true);
    }
  };

  // Effect for "Copied!" toast animation
  useEffect(() => {
    if (showCopiedStatus) {
      setAnimation(false); // Reset animation state
      const hideTimer = setTimeout(() => {
        setAnimation(true); // Start slide-out animation
        const resetTimer = setTimeout(() => {
          setShowCopiedStatus(false);
          setAnimation(false); // Reset animation for next time
        }, 1000); // Allow animation to complete (e.g., 1000ms for slide-out)
        return () => clearTimeout(resetTimer);
      }, 1500); // Toast visible duration before slide-out starts (e.g., 1500ms)

      return () => clearTimeout(hideTimer);
    }
  }, [showCopiedStatus]);

  const userPinExists = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/vault/pin`, {
        withCredentials: true,
      });
      return res.data.data.pinCreated;
    } catch (error) {
      console.error("Error while checking user Pin exists:", error);
      return false; // Assume PIN needs to be created on error
    }
  };

  const handleCreateClick = async () => {
    const pinCreated = await userPinExists();
    if (!pinCreated) {
      setDisablePinButton(false); // Enable "Generate Pin" if no PIN exists
      setShowGeneratePinBox(true); // Automatically show PIN form
    } else {
      setShowAddToVaultForm(true); // Show add to vault form if PIN exists
    }
  };

  const handleGeneratePinClick = () => {
    setShowGeneratePinBox(true);
  };

  const handleGoToVaultClick = () => {
    redirect("/my-vault");
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4 font-mono">
      {/* Generate Pin button */}
      <div className="mb-8 self-end pr-8"> {/* Adjusted positioning */}
        <button
          disabled={disablePinButton}
          onClick={handleGeneratePinClick}
          className={`${
            disablePinButton
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:bg-indigo-600"
          } px-4 py-2 rounded-md font-semibold text-sm text-gray-100 transition-colors`}
        >
          Generate Pin
        </button>
      </div>

      <div className="bg-gray-700 rounded-lg shadow-xl p-8 max-w-md w-full flex flex-col">
        <h1 className="text-gray-100 text-3xl font-bold mb-6 text-center">
          Password Generator
        </h1>

        {/* Password Display Field + Copy button */}
        <div className="relative mb-6">
          <input
            id="password-display"
            type="text"
            readOnly
            value={generatedPassword}
            className="w-full bg-gray-600 text-gray-100 p-3 rounded-md pr-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            placeholder="Your Secure Password"
          />
          <button
            onClick={handleCopyClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:bg-emerald-500 transition-colors"
          >
            Copy
          </button>
          {showCopiedStatus && (
            <p
              className={`absolute left-1/2 -translate-x-1/2 mt-2 bg-gray-900 text-gray-100 px-3 py-1 text-sm rounded-md transition-all duration-1000 ${
                animation ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              Copied!
            </p>
          )}
        </div>

        {/* Password Length Slider */}
        <div className="mb-6">
          <h2 className="text-gray-100 text-lg mb-2">
            Password Length: {sliderValue}
          </h2>
          <input
            type="range"
            min="4"
            max="32"
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-indigo-400 [&::-webkit-slider-thumb]:focus:outline-none [&::-webkit-slider-thumb]:focus:ring-2 [&::-webkit-slider-thumb]:focus:ring-indigo-300
                       [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:bg-indigo-400 [&::-moz-range-thumb]:focus:outline-none [&::-moz-range-thumb]:focus:ring-2 [&::-moz-range-thumb]:focus:ring-indigo-300"
          />
          <div className="flex justify-between text-gray-400 text-sm mt-1">
            <p>4</p>
            <p>32</p>
          </div>
        </div>

        {/* Checkbox Options */}
        <div className="flex justify-around items-center my-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="letters"
              checked={checked.letters}
              onChange={handleCheckBoxChange}
              value={0}
              className="form-checkbox h-5 w-5 text-indigo-500 rounded border-gray-500 focus:ring-indigo-500 checked:bg-indigo-500 cursor-pointer"
            />
            <label htmlFor="letters" className="ml-2 text-gray-100 cursor-pointer">
              Letters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="numbers"
              checked={checked.numbers}
              onChange={handleCheckBoxChange}
              value={1}
              className="form-checkbox h-5 w-5 text-indigo-500 rounded border-gray-500 focus:ring-indigo-500 checked:bg-indigo-500 cursor-pointer"
            />
            <label htmlFor="numbers" className="ml-2 text-gray-100 cursor-pointer">
              Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="symbols"
              checked={checked.symbols}
              onChange={handleCheckBoxChange}
              value={2}
              className="form-checkbox h-5 w-5 text-indigo-500 rounded border-gray-500 focus:ring-indigo-500 checked:bg-indigo-500 cursor-pointer"
            />
            <label htmlFor="symbols" className="ml-2 text-gray-100 cursor-pointer">
              Symbols
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around mt-8">
          <button
            onClick={handleCreateClick}
            className="bg-indigo-500 text-gray-100 font-semibold px-6 py-3 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:bg-indigo-600 transition-colors"
          >
            Create
          </button>
          <button
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
            onClick={handleGoToVaultClick}
            className={`bg-gray-600 text-gray-100 font-semibold px-6 py-3 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 active:bg-gray-700 transition-colors flex items-center`}
          >
            Go to Vault
            <span className={`ml-2 transform transition-transform duration-300 ${showArrow ? 'translate-x-2' : ''}`}>
              {`→`}
            </span>
          </button>
        </div>
      </div>

      {showGeneratePinBox && (
        <PinForm
          showGeneratePinBox={showGeneratePinBox}
          setShowGeneratePinBox={setShowGeneratePinBox}
          setDisablePinButton={setDisablePinButton} // Pass setter to allow PinForm to enable/disable
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

export default PasswordGenerator;