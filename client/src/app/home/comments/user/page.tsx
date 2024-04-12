'use client'

import  {default as getUserComments} from "@/components/api/query/comment/getUserComments";
import { useStore } from "@/components/model/store/store";
import { ICommBody, IStore } from "@/components/libs/types/type";
import YourCommEmpty from "@/components/ui/cards/empty/CommEmpty";
import CommUserMapCard from "@/components/ui/views/home/comments/users/CommUserMapCard";
import { default as Error } from "@/components/ui/load/Error";
import {default as Loading } from "@/components/ui/load/Loading";
import { useQuery } from "@tanstack/react-query";

function page():JSX.Element {
  const {id,token,role}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<ICommBody[]>({
    queryKey:['comments',id,token,role],
    queryFn:()=>getUserComments({id,token,role})
  });
      
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      {data.length ? (
        <CommUserMapCard
          data={data}
        />
      ) : (
       <YourCommEmpty
        text="You didn`t send comments"
       />
      )}
    </>
  )
}

export default page