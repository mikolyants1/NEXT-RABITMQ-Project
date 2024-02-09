'use client'

import getUsers from "@/components/helpers/query/user/getUsers"
import { useStore } from "@/components/store/store";
import { IUsers } from "@/components/types/type";
import UserCard from "@/components/ui/cards/users/UserCard";
import Error from "@/components/ui/load/Error";
import Loading from "@/components/ui/load/Loading";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

 function page():JSX.Element {
  const {id} = useStore();
  const {data,isError,isLoading} = useQuery({
  queryKey:['films'],queryFn:getUsers});
  
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const userFilms:IUsers[] = data
  .filter((i:IUsers)=>i._id !== id);
  
  return (
     <Box w='100%' mt={30}>
       {userFilms.map((i:IUsers):JSX.Element=>{
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