import { createContext, useState } from "react";



    export let UserContext=createContext()

   export default function UserContextProvider({children}){ 

    let [useToken,setUseToken]=useState(null);
    let [userData,setUserData]=useState(null)

    return  <UserContext.Provider value={{useToken,setUseToken,userData,setUserData}}>
        {children}
    </UserContext.Provider>
}