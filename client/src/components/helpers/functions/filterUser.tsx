import { IUsers } from "@/components/types/type";

export const filterUser = (User:string,text:string):boolean => {
  const user:string = text.toLowerCase().trim();
  return User.toLowerCase().includes(user);
};