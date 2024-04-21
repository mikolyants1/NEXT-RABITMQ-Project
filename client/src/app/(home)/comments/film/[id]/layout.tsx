import {type Metadata } from "next";
import {type ReactNode } from "react";

export const metadata:Metadata = {
  title:"Film Comments",
  description:"All film's comments"
}

export default function Layout({
  children
}:Readonly<{
  children:ReactNode
}>):JSX.Element {
  return (
    <>
    {children}
    </>
  )
}
