import LoginLinks from "@/components/ui/views/login/content/links/LoginLinks";
import LoginCard from "@/components/ui/views/login/LoginCard";
import {type Metadata } from "next";

export const metadata:Metadata = {
    title:"Registration",
    description:"registration page"
}

export default function Regist():JSX.Element{
    return (
        <LoginCard isHome={false}>
           <LoginLinks isHome={false} />
        </LoginCard>
    )
}