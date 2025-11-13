import { base64ToBuffer } from "./Base64Helper";

export const decryptPassword = async (
  sessionEncryptionKey,
  initializationVector_base64,
  cipherText_base64
) => {
  try {
    //1) sessionEncryption --> created using the master_password + enc_salt.

    //2) initializationVector_base64 --> this is store in the database.
    // when the vault was added (also it in base64 as iv:type(String)).

    //3) cipherText_base64 --> is also store in database when a vault was added
    // also converted the buffer to base64 as password is of type String.

    //4) we have the encrypted password (base64)-> "MdKBbvbkO4RNB...."

    //5) with this three -> Key,IV and chipher text we will decrypt the chipherObj
    // and get the encrypted data(i.e password).

    //6) we need to convert back to the buffer -> [54,184,32,221,45,194,...] ;

    //7) will use base64ToBuffer function which returns -> Buffer[];
    console.log({
      "Key :: ": sessionEncryptionKey,
      "IV :: ": initializationVector_base64,
      "Chipher :: ": cipherText_base64,
    });

    const iv_buffer = base64ToBuffer(initializationVector_base64);
    const cipher_buffer = base64ToBuffer(cipherText_base64);

    //Decryption
    console.log("IV_buffer ::",iv_buffer)
    console.log("cipher_buffer ::",cipher_buffer)
    const decryptBuffer = await crypto.subtle.decrypt(
        {name:"AES-GCM",iv:iv_buffer},
        sessionEncryptionKey,
        cipher_buffer
    )
    console.log("Decrypt Buffer data Object :: ",decryptBuffer);

    //now convert the decrypted arrayBuffer back to string;\
    const dec = new TextDecoder();
    console.log("What does the TextDecoder contains :: ",dec);
    console.log("Decrypted password :: ",dec.decode(decryptBuffer))
    return dec.decode(decryptBuffer);
  } catch (error) {
    console.error("Error while decryption the password :: ", error);
  }
};


