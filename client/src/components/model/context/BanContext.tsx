import { IBanUsers } from "@/components/libs/types/type";
import { createContext } from "react";

export const BanContext = createContext<IBanUsers[]>([] as IBanUsers[])