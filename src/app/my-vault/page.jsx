"use client";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";
import axios from "axios";
import { BASE_URL } from "../constant";

const userPasswordVault = () => {
  const [vaults, setVaults] = useState(null);
  const getVault = async () => {
    try {
        console.log("inside")
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
  return <div>Welcome to User Password Vault Page!</div>;
};

export default userPasswordVault;
