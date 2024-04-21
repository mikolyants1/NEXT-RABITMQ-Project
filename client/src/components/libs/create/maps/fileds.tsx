import {type IFields } from "@/components/libs/types/type";

export const createFields = ():IFields[] => {
  return [
      {
        name:'name',
        title:'name'
      },
      {
        name:'pass',
        title:'password'
      }
    ];
};