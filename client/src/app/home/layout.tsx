import Header from "@/components/ui/blocks/Header";
import { ReactNode } from "react";

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