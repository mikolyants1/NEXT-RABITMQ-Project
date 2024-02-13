import { ILinks } from "@/components/types/type";

export const createLinks = (id:string):ILinks[] => {
    return [
        {
          path:`/home/profile/${id}`,
          name:"Profile"
        },
        {
          path:'/home/users',
          name:"Users"
        },
        {
          path:"/home/search",
          name:"Search"
        },
        {
          path:`/home/comments/user`,
          name:"my comments"
        },
        {
          path:"/",
          name:"exit"
        }
    ];
}