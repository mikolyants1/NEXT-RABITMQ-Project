import { IBanUsers, ICommContext } from "@/components/types/type";
import { createContext } from "react";

export const DelContext = createContext<boolean>(true);

export const DelCommContext = createContext<string>("");

export const CommContext = createContext<ICommContext>({} as ICommContext);

export const BanContext = createContext<IBanUsers[]>([] as IBanUsers[])