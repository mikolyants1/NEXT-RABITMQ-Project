'use client'

import  {default as getUserComments} from "@/components/helpers/api/query/comment/getUserComments";
import { useStore } from "@/components/store/store";
import { ICommBody, IStore } from "@/components/types/type";
import YourCommEmpty from "@/components/ui/blocks/empty/CommEmpty";
import CommUserMapCard from "@/components/ui/cards/comments/CommUserMapCard";
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