
import getUsers from "@/components/helpers/query/user/getUsers"
import { IParams, IUsers } from "@/components/types/type";
import UserCard from "@/components/ui/cards/users/UserCard";
import { Box } from "@chakra-ui/react";

interface props {
  params:IParams
};

async function page({params:{id}}:props):Promise<JSX.Element> {
  const data:IUsers[] = await getUsers();
  const users:IUsers[] = data.filter((i:IUsers)=>i._id !== id);
  
  return (
     <Box w='100%' mt={30}>
       {users.map((i:IUsers):JSX.Element=>{
        const {name,films,_id}:IUsers = i;
        return (
         <UserCard
          key={_id}
          name={name}
          films={films}
        />)
       })}
    </Box>
  )
}

export default page