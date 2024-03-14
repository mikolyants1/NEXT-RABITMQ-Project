"use client"

import { getBanUsers } from "@/components/helpers/api/query/ban/getBanUsers";
import { useStore } from "@/components/store/store"
import { IBanUsers, IStore, IUsers } from "@/components/types/type"
import { useQuery } from "@tanstack/react-query";
import Loading from "../../load/Loading";
import Error from "../../load/Error";
import { Box } from "@chakra-ui/react";
import BanUserCard from "./user/BanUserCard";
import { BanContext } from "@/components/helpers/functions/context";

interface props {
  users:IUsers[]
};

function BanUserMapCard({users}:props):JSX.Element {
  const {token,id:_id,role}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<IBanUsers[]>({
    queryKey:["banusers",token,_id,role],
    queryFn:()=>getBanUsers({token,role,_id})
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  
  return (
    <BanContext.Provider value={data}>
      <Box w={300} m="10px auto">
       {users.map((i:IUsers):JSX.Element=>(
        <BanUserCard
         key={i._id}
         id={i._id}
         name={i.name}
         />
       ))}
      </Box>
    </BanContext.Provider>
  )
}

export default BanUserMapCard