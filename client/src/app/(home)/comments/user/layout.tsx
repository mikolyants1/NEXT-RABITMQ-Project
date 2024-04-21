import {type Metadata } from "next";
import {type ReactNode } from "react";

export const metadata:Metadata = {
    title:"User comments",
    description:"All user's commnets"
}

export default function Layout({
  children
}:Readonly<{
  children:ReactNode
}>):JSX.Element{
  return (
    <>
      {children}
    </>
  )
}