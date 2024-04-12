
import LoginCard from "@/components/ui/views/login/LoginCard";
import LoginLinks from "@/components/ui/views/login/content/links/LoginLinks";

export default function Home() {
  return (
     <LoginCard isHome>
       <LoginLinks isHome />
     </LoginCard>
  );
}
