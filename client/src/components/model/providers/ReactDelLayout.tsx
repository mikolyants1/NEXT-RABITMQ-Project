'use client'

import {type ReactNode } from "react"
import { DelContext } from "../context/DelContext"

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