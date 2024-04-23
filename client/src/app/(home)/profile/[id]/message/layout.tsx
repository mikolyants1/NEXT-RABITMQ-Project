import {type Metadata } from "next";
import {type ReactNode } from "react";

export const metadata:Metadata = {
  title:"Messages",
  description:"messages for admin"
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