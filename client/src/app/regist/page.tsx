import LoginLinks from "@/components/ui/views/login/content/links/LoginLinks";
import LoginCard from "@/components/ui/views/login/LoginCard";

export default function Regist():JSX.Element{
    return (
        <LoginCard isHome={false}>
           <LoginLinks isHome={false} />
        </LoginCard>
    )
}