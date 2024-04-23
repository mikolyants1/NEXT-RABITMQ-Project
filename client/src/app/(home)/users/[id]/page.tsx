
import getUsers from "@/components/api/query/user/getUsers"
import {type IParams,type IUsers } from "@/components/libs/types/type";
import UserCard from "@/components/ui/views/home/users/UserCard";
import { Box } from "@chakra-ui/react";

interface IProps {
  params:IParams
}

async function page({params:{id}}:IProps):Promise<JSX.Element> {
  const data:IUsers[] = await getUsers();
  const users:IUsers[] = data.filter((i:IUsers)=>i._id !== id);

  return (
     <Box w='100%' mt={30}>
      {users.map((i:IUsers):JSX.Element=>(
        <UserCard key={i._id} {...i} />
      ))}
    </Box>
  )
}

export default page