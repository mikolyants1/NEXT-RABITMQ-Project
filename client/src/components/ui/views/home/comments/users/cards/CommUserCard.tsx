
import delComment from "@/components/api/mutation/comment/delComment";
import { useStore } from "@/components/model/store/store";
import {type ICommDelBody,type IComments,type IStore } from "@/components/libs/types/type";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import createTime from "@/components/libs/create/time/createCommTime";

interface IProps {
  time:number,
  text:string,
  name:string,
  userId:string
};

function CommUserCard({text,time,name,userId:id}:IProps):JSX.Element {
  const {token,id:userId,role}:IStore = useStore();
  const {invalidateQueries}:QueryClient = useQueryClient();
  const {mutate} = useMutation<unknown,IComments,ICommDelBody>({
    mutationFn:(body:ICommDelBody)=>delComment(body),
    onSuccess:()=>invalidateQueries({queryKey:['comments']})
  });

  const del = ():void => {
    mutate({id,time,token,userId,role});
  };
 
  return (
    <Grid w={300}
     bg='rgb(80,80,80)'
     borderRadius={10}
     gridTemplateRows='minmax(40px,auto) 1fr 50px'
     color='white'
     minH={200}>
      <Box w='95%'
      fontSize={20}
      borderBottom='1px solid white'
       m='auto' pb={2}>
        film : {name}
      </Box>
      <Box w='95%'
       borderBottom='1px solid white'
       fontSize={24}
       mr='auto' ml='auto'>
          {text}
      </Box>
      <Flex w='95%'
       alignItems='center'
       justifyContent="space-between"
       h='100%' m='auto'>
         <Box>
           {createTime(time)}
         </Box>
         <Button
          colorScheme="red"
          onClick={del}>
          delete
         </Button>
      </Flex>
    </Grid>
  )
}

export default CommUserCard