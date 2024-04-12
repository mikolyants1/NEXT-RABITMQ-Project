import { ILinks } from "@/components/libs/types/type";

export const createLinks = (id:string):ILinks[] => {
  return [
        {
          path:`/home/profile/${id}`,
          name:"Profile"
        },
        {
          path:`/home/users/${id}`,
          name:"Users"
        },
        {
          path:"/home/search",
          name:"Search"
        },
        {
          path:`/home/comments/user`,
          name:"My comments"
        },
        {
          path:"/",
          name:"Exit"
        }
    ];
}