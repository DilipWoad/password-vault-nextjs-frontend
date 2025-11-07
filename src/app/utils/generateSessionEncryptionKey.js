export const generateSessionEncryptionKey=async(master_password,salt)=>{
    try {
        const session = await crypto.subtle.deriveKey(master_password,salt);
        return session;
    } catch (error) {
        console.error("Error while generating Session Encryption Key ::",error.message);
    }
}