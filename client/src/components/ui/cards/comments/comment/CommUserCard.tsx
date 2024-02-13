import { DelCommContext } from "@/components/helpers/functions/context";
import createTime from "@/components/helpers/functions/time";
import delComment from "@/components/helpers/mutation/comment/delComment";
import { useStore } from "@/components/store/store";
import { ICommDelBody } from "@/components/types/type";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface props {
  time:number,
  text:string,
  name:string,
  id:string
};

function CommUserCard({text,time,name,id}:props):JSX.Element {
  const {token} = useStore();
  const now:string = createTime(time);
  const {invalidateQueries} = useQueryClient();
  const {mutate} = useMutation({
    mutationFn:(body:ICommDelBody)=>delComment(body),
    onSuccess:()=>invalidateQueries({queryKey:['comments']})
  });

  const del = ():void => {
    mutate({id,time,token});
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
           {now}
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