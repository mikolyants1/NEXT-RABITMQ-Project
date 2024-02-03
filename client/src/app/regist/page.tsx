import LoginCard from "@/components/ui/cards/login/LoginCard";
import LoginLinks from "@/components/ui/links/LoginLinks";

export default function Regist():JSX.Element{
    return (
        <LoginCard isHome={false}>
           <LoginLinks isHome={false} />
        </LoginCard>
    )
}