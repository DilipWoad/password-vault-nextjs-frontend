import { useState } from "react"
import ShowPasswordContext from "./ShowPasswordContext.js"

const ShowPasswordContextProvider = ({children})=>{
    const [showPassword,setShowPassword] = useState(false)
    return(
        <ShowPasswordContext.Provider value={{showPassword,setShowPassword}}>
            {children}
        </ShowPasswordContext.Provider>
    )
}

export default ShowPasswordContextProvider;