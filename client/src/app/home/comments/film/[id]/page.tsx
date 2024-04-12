'use client'

import { useStore } from "@/components/model/store/store"
import {type IComment,type IFilms,type IParams,type IStore,type QResult } from "@/components/libs/types/type"
import CommEmpty from "@/components/ui/cards/empty/CommEmpty"
import CommFilmMapCard from "@/components/ui/views/home/comments/films/wrappers/content/CommFilmMapCard"
import CommentInput from "@/components/ui/views/home/comments/films/inputs/CommentInput"
import Error from "@/components/ui/load/Error"
import Loading from "@/components/ui/load/Loading"
import CommMapWrapper from "@/components/ui/views/home/comments/films/wrappers/CommMapWrapper"
import { Box, Input } from "@chakra-ui/react"
import { UseQueryResult, useQueries } from "@tanstack/react-query"
import { ChangeEvent, useRef, useState } from "react"
import queryData from "@/components/libs/getQueryData/queryData"
import { CommContext } from "@/components/model/context/CommContext"

interface IProps {
  params:IParams
};

function page({params:{id}}:IProps):JSX.Element {
 const [personal,setPersonal] = useState<string>("");
 const [text,setText] = useState<string>("");
 const {id:userId,token,role}:IStore = useStore();
 const inputRef = useRef<HTMLInputElement>(null!);
 const queries:QResult = useQueries({
   queries:queryData({token,id,role,userId})
 });

 const answer = (name:string) => ():void =>{
    setPersonal(name);
    inputRef.current.focus();
 }

 const change = (e:ChangeEvent<HTMLInputElement>):void => {
  setText(e.target.value);
 }

 if (queries.some((i:UseQueryResult<IComment[]|IFilms>)=>i.isLoading)){
   return <Loading />;
 }

 if (queries.some((i:UseQueryResult<IComment[]|IFilms>)=>i.isError)){
    return <Error />;
 }
 
 const [{data:comm},{data:film}]:QResult = queries;

 if (!comm || !film) return <Error />;

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
         filmID={id}>
         <Input
          onChange={change}
          borderRightRadius='none'
          bg='rgb(200,200,200)'
          placeholder='write your comment'
          name="text"
          ref={inputRef}
        />
       </CommentInput>
    </CommContext.Provider>
  )
}

export default page