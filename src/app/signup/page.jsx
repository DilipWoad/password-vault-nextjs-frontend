"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "../constant.js";
import LoadingScreen from "../components/LoadingScreen.jsx";

export default function signup() {
  const signupFormObj = {
    email: "dilip7@gmail.com",
    password: "12345678",
  };
  const [signupDetails, setSignupDetails] = useState(signupFormObj);
  const [loading, setLoading] = useState(false);
  const signupUser = async () => {
    let redirectPath = null;
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, signupDetails, {
        withCredentials: true,
      });
      // console.log(res.data);
      redirectPath = "/login";
      setLoading(false);
    } catch (error) {
      console.log("Error while signup : ", error);
      redirectPath = "/signup";
      setLoading(false);
    } finally {
      if (redirectPath) {
        redirect(redirectPath);
      }
    }
  };

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    //set them in the setLoginDetails based on the name
    setSignupDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(loginDetails);
    signupUser();
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
            defaultValue={signupDetails.email}
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
            defaultValue={signupDetails.password}
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
          Signup
        </button>
        <p className="text-center">
          Already register?
          <span
            className="hover:cursor-pointer hover:text-underline mx-2  text-bold"
            onClick={() => redirect("/login")}
          >
            Login
          </span>
        </p>
      </form>
      {loading && <LoadingScreen />}
    </div>
  );
}
