import { ICommContext } from "@/components/libs/types/type";
import { createContext } from "react";

export const CommContext = createContext<ICommContext>({} as ICommContext);
