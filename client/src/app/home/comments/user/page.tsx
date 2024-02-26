'use client'

import getUserComments from "@/components/helpers/api/query/comment/getUserComments";
import { useStore } from "@/components/store/store";
import { IStore } from "@/components/types/type";
import YourCommEmpty from "@/components/ui/blocks/empty/CommEmpty";
import CommUserMapCard from "@/components/ui/cards/comments/CommUserMapCard";
import Error from "@/components/ui/load/Error";
import Loading from "@/components/ui/load/Loading";
import { useQuery } from "@tanstack/react-query";

function page():JSX.Element {
  const {id,token}:IStore = useStore();
  const {data,isError,isLoading} = useQuery({
    queryKey:['comments',id,token],
    queryFn:()=>getUserComments(id,token)
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