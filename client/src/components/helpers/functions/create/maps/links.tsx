import { ILinks } from "@/components/types/type";

export const createLinks = (id:string,role:string):ILinks[] => {
  const links:ILinks[] = [
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
          name:"my comments"
        },
        {
          path:"/",
          name:"exit"
        }
    ];
    if (role == "guest"){
       links.push({
         path:'/home/comments/admin',
         name:"send to admin"
       });
    };

    return links;
}