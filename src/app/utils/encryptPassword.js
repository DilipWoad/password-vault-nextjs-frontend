import { bufferToBase64 } from "./Base64Helper.js";

export const encryptPassword=async(cryptoKeyObject,hidingData)=>{
    try {
        //1) make a textEncoder obj
        console.log("CryptoKeyObject :: ",cryptoKeyObject)
        const enc = new TextEncoder();

        //2) create an IV intialization vector
        const iv = crypto.getRandomValues(new Uint8Array(12));
        console.log("Initialization Vector :: ",iv)

        //3) use ASE-GCM algorithm for encryption
        const encryptedBuffer = await crypto.subtle.encrypt(
            {name:"AES-GCM",iv:iv},
            cryptoKeyObject,
            enc.encode(hidingData) //converting the plain password of a vault to Uint8Array[]
        )
        console.log("Encrypted Buffer :: ",encryptedBuffer)
        // console.log("using toString on cipher :: ",encryptedBuffer.toString("base64"))
        // const bufferEncryption1 = Buffer.from(encryptedBuffer, 'base64');
       

        // console.log("using Buffer on cipher :: ",bufferEncryption1)
        console.log("using BufferToBase64 on cipher :: ",bufferToBase64(encryptedBuffer))

        // console.log("using toString on iv :: ",iv.toString("base64"))
        console.log("using bufferToBase64 on iv :: ",bufferToBase64(iv))

        return {
            cipherText:bufferToBase64(encryptedBuffer),
            iv:bufferToBase64(iv)
        }
    } catch (error) {
        console.error("Error while encrypting the vault password :: ",error.message)
    }
}