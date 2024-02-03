import LoginCard from "@/components/ui/cards/login/LoginCard";
import LoginLinks from "@/components/ui/links/LoginLinks";

export default function Home() {
  return (
     <LoginCard isHome>
       <LoginLinks isHome />
     </LoginCard>
  );
}
