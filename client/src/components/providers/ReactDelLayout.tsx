'use client'

import { ReactNode, createContext } from "react"

interface props {
    children:ReactNode,
    isDel:boolean
};

export const DelContext = createContext<boolean>(true);

function DelLayut({children,isDel}:props):JSX.Element{
   return (
     <DelContext.Provider
      value={isDel}>
        {children}
     </DelContext.Provider>
   )
}

export default DelLayut