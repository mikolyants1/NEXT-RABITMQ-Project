import { fields } from "@/components/types/type";

export const createFields = ():fields[] => {
  return [
      {
        Name:'name',
        title:'name'
      },
      {
        Name:'pass',
        title:'password'
      }
    ];
};