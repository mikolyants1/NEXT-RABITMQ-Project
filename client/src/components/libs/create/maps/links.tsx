import {type ILinks } from "@/components/libs/types/type";

export const createLinks = (id:string):ILinks[] => {
  return [
        {
          path:`/profile/${id}`,
          name:"Profile"
        },
        {
          path:`/users/${id}`,
          name:"Users"
        },
        {
          path:"/search",
          name:"Search"
        },
        {
          path:`/comments/user`,
          name:"My comments"
        },
        {
          path:"/",
          name:"Exit"
        }
    ];
}