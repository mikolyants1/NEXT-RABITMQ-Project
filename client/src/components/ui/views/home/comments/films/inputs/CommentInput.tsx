import addComment from '@/components/api/mutation/comment/addComment';
import { useStore } from '@/components/model/store/store';
import {type ICommBody,type IComments,type IStore,type IToken } from '@/components/libs/types/type';
import { Button, Flex, useMediaQuery } from '@chakra-ui/react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

interface props {
    filmID:string,
    personal:string,
    name:string,
    text:string
    children:JSX.Element
};

function CommentInput({personal,name,filmID,children,text}:props):JSX.Element {
 const [isWidth] = useMediaQuery('(max-width: 700px)');
 const {token,name:username,id:userId,role}:IStore = useStore();
 const {invalidateQueries}:QueryClient = useQueryClient();
 const {mutate} = useMutation<unknown,IComments,ICommBody&IToken>({
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
        filmID,
        role
      });
   };
 };

  return (
      <Flex m='auto'
       w={isWidth ? '80%' : '70%'}>
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