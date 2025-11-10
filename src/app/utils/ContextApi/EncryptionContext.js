"use client";
import { createContext, useContext,useState } from "react";

export const EncryptionContext = createContext();

export const EncryptionContextProvider = ({ children }) => {
  const [sessionEncryptionKey, setSessionEncryptionKey] = useState(null);

  const updateSessionEncryptionState = (newValue) => {
    console.log("Updating State :: ",newValue)
    setSessionEncryptionKey(newValue);
  };


  const clearSessionEncryptionState = () => {
    console.log("Encryption Key cleared from context. Vault is locked.");
    setSessionEncryptionKey(null);
  };
  return (
    <EncryptionContext.Provider
      value={{
        sessionEncryptionKey,
        updateSessionEncryptionState,
        clearSessionEncryptionState
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
};

export const useEncryptionContext = ()=> useContext(EncryptionContext);