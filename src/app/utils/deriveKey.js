export const deriveKey = async(master_password,salt)=>{
    try {
        const enc = new TextEncoder();
        console.log("TextEncoder object :: ",enc);
        const passwordBuffer = enc.encode(master_password);
        console.log("Password Buffer :: ",passwordBuffer);

        const importedKey = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            {name :'PBKDF2'},
            false,
            ['deriveKey']
        )

        console.log("Imported Key :: ",importedKey);

        return await crypto.subtle.deriveKey({
            name:"PBKDF2",
            salt:salt,
            iterations:100000,
            hash:'SHA-256'
        },
        importedKey,
        {name:'AES-GCM',length:256},
        true,
        ['encrypt','decrypt']
    )
    } catch (error) {
        console.error("Error while Generating session key :: ",error)
    }
}