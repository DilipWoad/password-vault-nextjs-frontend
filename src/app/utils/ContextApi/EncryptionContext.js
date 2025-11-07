"use client";
import { createContext, useContext,useState } from "react";

export const EncryptionContext = createContext();

export const EncryptionContextProvider = ({ children }) => {
  const [sessionEncryptionKey, setSessionEncryptionKey] = useState(null);

  const updateSessionEncryptionState = (newValue) => {
    console.log("Updating State :: ",newValue)
    setSessionEncryptionKey(newValue);
  };

  return (
    <EncryptionContext.Provider
      value={{
        sessionEncryptionKey,
        updateSessionEncryptionState,
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
};

export const useEncryptionContext = ()=> useContext(EncryptionContext);