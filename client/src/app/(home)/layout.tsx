
import Header from "@/components/ui/views/home/header/Header";
import {type ReactNode } from "react";

interface props {
    children:ReactNode
}
export default function layout({children}:props):JSX.Element{
  return (
     <>
      <Header />
      {children}
     </>
  )
}