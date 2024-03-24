'use client'

import { ReactNode } from "react"
import { DelContext } from "../helpers/functions/context"

interface props {
    children:ReactNode,
    isDel:boolean
};

function DelLayut({children,isDel}:props):JSX.Element{
   return (
     <DelContext.Provider value={isDel}>
        {children}
     </DelContext.Provider>
   )
}

export default DelLayut