"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "../constant.js";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { deriveKey } from "../utils/deriveKey.js";
import { useEncryptionContext } from "../utils/ContextApi/EncryptionContext.js";

export default function login() {
  const loginFormObj = {
    email: "dilip7@gmail.com",
    password: "12345678",
  };
  const [loginDetails, setLoginDetails] = useState(loginFormObj);
  const [loading, setLoading] = useState(false);
  // const [sessionEncryptionKey,setSessionEncryptionKey] = useState(null);
  const { updateSessionEncryptionState } =
    useEncryptionContext();
  const loginUser = async () => {
    let redirectPath = null;
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, loginDetails, {
        withCredentials: true,
      });
      // console.log(res.data);
      redirectPath = "/home";
      //Actually to should have context api to hold user info
      const master_password = loginDetails.password;

      // const salt = base64ToBuffer(res.data.data.user.enc_salt);
      const salt = Buffer.from(res.data.data.user.enc_salt, "base64");
      console.log("salt :: ", salt);
      // const sessionEncKey = await generateSessionEncryptionKey(master_password,salt);
      const sessionEncKey = await deriveKey(master_password, salt);
      console.log("sessionEncKey ::", sessionEncKey);
      // setSessionEncryptionKey(sessionEncKey);
      updateSessionEncryptionState(sessionEncKey);
      setLoading(false);
    } catch (error) {
      console.log("Error while login : ", error);
      redirectPath = "/login";
      setLoading(false);
    } finally {
      setLoginDetails((prev) => ({ ...prev, password: "" }));
      if (redirectPath) {
        redirect(redirectPath);
      }
    }
  };

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    //set them in the setLoginDetails based on the name
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(loginDetails);
    loginUser();
  };

  return (
    <div className="flex justify-center h-screen items-center bg-yellow-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white min-w-80 flex  flex-col gap-10 p-4 rounded-lg shadow-lg"
      >
        {/* Email */}
        <div className="flex justify-between items-center">
          <label htmlFor="name">Email : </label>
          <input
            className="bg-gray-200 p-2 rounded-lg"
            type="email"
            name="email"
            id="email"
            defaultValue={loginDetails.email}
            //   value={email}
            placeholder="Enter Email..."
            required={true}
            onChange={handleChange}
          />
        </div>
        {/* Password */}
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password : </label>
          <input
            className="bg-gray-200 p-2 rounded-lg"
            type="password"
            name="password"
            id="password"
            defaultValue={loginDetails.password}
            //   value={email}
            placeholder="Enter Password..."
            required={true}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="hover:cursor-pointer hover:bg-blue-600 bg-blue-500 rounded-md px-7 py-2 text-sm font-semibold"
        >
          Login
        </button>
        <p className="bg-green-500 text-center text-sm">
          New to the website?
          <span
            className="hover:cursor-pointer hover:text-underline mx-2  text-bold"
            onClick={() => redirect("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
      {loading && <LoadingScreen />}
    </div>
  );
}
