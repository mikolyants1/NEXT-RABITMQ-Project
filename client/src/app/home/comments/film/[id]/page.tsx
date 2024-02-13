'use client'

import { CommContext } from "@/components/helpers/functions/context"
import getDataFromQueries from "@/components/helpers/functions/getQueryData/getDataFromQueries"
import queryData from "@/components/helpers/functions/getQueryData/queryData"
import { IParams } from "@/components/types/type"
import CommEmpty from "@/components/ui/blocks/empty/CommEmpty"
import CommFilmMapCard from "@/components/ui/cards/comments/CommFilmMapCard"
import CommentInput from "@/components/ui/inputs/CommentInput"
import Error from "@/components/ui/load/Error"
import Loading from "@/components/ui/load/Loading"
import CommMapWrapper from "@/components/ui/wrappers/comment/CommMapWrapper"
import { Box, Input } from "@chakra-ui/react"
import { useQueries } from "@tanstack/react-query"
import { ChangeEvent, useRef, useState } from "react"

interface props {
    params:IParams
};

function page({params}:props):JSX.Element {
 const [personal,setPersonal] = useState<string>("");
 const [text,setText] = useState<string>("");
 const inputRef = useRef<HTMLInputElement>(null!);
 const queries = useQueries({
   queries:queryData(params.id)
 });

 const answer = (name:string) => ():void =>{
    setPersonal(name);
    inputRef.current.focus();
 };

 const change = (e:ChangeEvent<HTMLInputElement>):void => {
  setText(e.target.value);
 };

 if (queries.some((i)=>i.isLoading)){
   return <Loading />
 };

 if (queries.some((i)=>i.isError)){
    return <Error />
 };
 
 const {comm,film} = getDataFromQueries(queries);
  return (
    <CommContext.Provider value={{answer}}>
      <Box w='100%'
       textAlign='center'
       fontSize={30}
       color='white'
       mt={10}>
        Comments to "{film.Title}"
      </Box>
       <CommMapWrapper
        length={comm.length}>
         <>
          {comm.length ? (
            <CommFilmMapCard
              data={comm}
            />
           ) : (
            <CommEmpty
             text="Where is no comments"
            />
           )}
          </>
       </CommMapWrapper>
       <CommentInput personal={personal}
        name={film.Title} text={text}
        filmID={params.id}>
         <Input
          onChange={change}
          borderRightRadius='none'
          bg='rgb(200,200,200)'
          placeholder='write your comment'
          ref={inputRef}
        />
       </CommentInput>
    </CommContext.Provider>
  )
}

export default page