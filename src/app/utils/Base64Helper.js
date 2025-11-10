export const bufferToBase64 = (bufferString)=>{
    //so bufferString will be in binary/Uint8Array -> [123,34,76,212]etc

    //so 1) make a binary string by converting the numbers/buffer to its ascii
    let binaryString = '';
    //we will loop through each array index and convert it to it's ascii then add it to the binaryString
    //get the length of the bufferString
    const bytes = new Uint8Array(bufferString);
  const len = bytes.byteLength;
    
    for(let i=0;i<len;i++){
        binaryString+= String.fromCharCode(bytes[i])
        console.log(binaryString)
    }
    //now we have ascii string club together
    //now convert it to base64 with the help of btoa

    return window.btoa(binaryString);
}


export const base64ToBuffer =(base64String)=>{
    //so we have base64String -> "CxEy=ndfienWrfNDgm"
    //1) convert back it to it's binaryString form -> the ascii string "$1/2+==" type
    //2)then we can use uint8Array to convert it to the buffer/binary form
    //
    const binaryString = window.atob(base64String);
    const binaryString_length = binaryString.length;
    const bytesArray = new Uint8Array(binaryString_length);
    //this bytesArray -> is in this form [0,0,0,0,0,0] array as it is just initialized with length 
    //so now we need to fill the array[index] with binaryStringChar[index] value;
    for(let i=0;i<binaryString_length;i++){
        bytesArray[i] = binaryString.charCodeAt(i);
        console.log(bytesArray)
    }

    //now we have bytesArray with [154,92,54,255];
    //now make it as a buffer
    return bytesArray.buffer
    
}