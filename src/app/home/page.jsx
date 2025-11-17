"use client";
import { redirect } from "next/navigation";
import { useEncryptionContext } from "../utils/ContextApi/EncryptionContext";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

const vaultPage = () => {
  const { sessionEncryptionKey } = useEncryptionContext();
  useEffect(() => {
    if (!sessionEncryptionKey) {
      console.log("No key in memory. Redirecting to login.");
      
      // redirect("/login");
    }
  }, [sessionEncryptionKey]);
  if (!sessionEncryptionKey) {
    return <LoadingScreen />; // Show nothing while redirecting
  }
  return (
    <div className="bg-blue-700 h-screen text-2xl font-mono flex justify-center items-center">
      <div className=" flex flex-col gap-4 ">
        <button
          onClick={() => redirect("/password-generator")}
          className="bg-green-500 px-2 py-3 rounded-lg hover:cursor-pointer hover:bg-green-600 transition-all duration-400 hover:text-white"
        >
          Generate and Store Password
        </button>
        <button
          onClick={() => redirect("/my-vault")}
          className="bg-yellow-500 px-2 py-3 rounded-md hover:cursor-pointer hover:bg-yellow-600 hover:text-white transition-all duration-400"
        >
          View Stored Passwords
        </button>
      </div>
    </div>
  );
};

export default vaultPage;
