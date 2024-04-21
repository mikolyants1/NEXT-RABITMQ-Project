import {type IOptimisticContext } from "@/components/libs/types/type";
import { createContext } from "react";

export const OptimisticContext = createContext<IOptimisticContext>({} as IOptimisticContext);