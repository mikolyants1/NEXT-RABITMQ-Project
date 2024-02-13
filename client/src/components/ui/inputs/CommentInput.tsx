import addComment from '@/components/helpers/mutation/comment/addComment';
import { useStore } from '@/components/store/store';
import { ICommBody, IToken } from '@/components/types/type';
import { Button, Flex, Input, useMediaQuery } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, MutableRefObject, useState } from 'react'

interface props {
    filmID:string,
    personal:string,
    name:string,
    text:string
    children:JSX.Element
};

function CommentInput({personal,name,filmID,children,text}:props):JSX.Element {
 const [isWidth] = useMediaQuery('max-width:700px');
 const {token,name:username,id:userId} = useStore();
 const {invalidateQueries} = useQueryClient();
 const {mutate} = useMutation({
  mutationFn:(body:ICommBody&IToken)=>addComment(body),
  onSuccess:()=>invalidateQueries({queryKey:['comments']})
 });
 
 const setNewComment = ():void => {
  if (text){
       mutate({
        token,
        userId,
        username,
        time:Date.now(),
        name,
        text:`${personal}${text}`,
        filmID
      });
   };
 };


  return (
      <Flex m='auto'
       w={isWidth ? '100%' : '70%'}>
        {children}
        <Button
         onClick={setNewComment}
         borderLeftRadius='none'
         colorScheme='blue'>
           add comment
        </Button>
      </Flex>
  )
}

export default CommentInput