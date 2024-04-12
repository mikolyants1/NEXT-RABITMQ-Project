"use client"

import { getBanUsers } from "@/components/api/query/ban/getBanUsers";
import { useStore } from "@/components/model/store/store"
import { IBanUsers, IStore, IUsers } from "@/components/libs/types/type"
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../load/Loading";
import Error from "../../../../../load/Error";
import { Box } from "@chakra-ui/react";
import BanUserCard from "./cards/BanUserCard";
import { ChangeEvent, useCallback, useState } from "react";
import FilterInput from "./inputs/FilterInput";
import { BanContext } from "@/components/model/context/BanContext";
import { filterUser } from "@/components/libs/compare/filterUser";

interface props {
  users:IUsers[]
};

function BanUserMapCard({users}:props):JSX.Element {
  const [text,setText] = useState<string>("");
  const {token,id:_id,role}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<IBanUsers[]>({
    queryKey:["banusers",token,_id,role],
    queryFn:()=>getBanUsers({token,role,_id})
  });

  const change = useCallback((e:ChangeEvent<HTMLInputElement>):void => {
    setText(e.target.value);
  },[]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  
  return (
    <BanContext.Provider value={data}>
      <FilterInput change={change} />
      <Box w={300} m="10px auto">
       {users.map((i:IUsers):JSX.Element=>(
        <>
         {filterUser(i.name,text)&&(
           <BanUserCard
            key={i._id}
            id={i._id}
            name={i.name}
           />
          )}
        </>
       ))}
      </Box>
    </BanContext.Provider>
  )
}

export default BanUserMapCard