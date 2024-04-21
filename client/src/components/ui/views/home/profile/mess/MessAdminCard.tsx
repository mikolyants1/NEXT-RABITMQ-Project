import delAdminMess from '@/components/api/mutation/mess/delAdminMess';
import { useStore } from '@/components/model/store/store';
import {type ICheck,type IMessToAdmin,type IStore } from '@/components/libs/types/type';
import { Box, Button, Flex, Grid } from '@chakra-ui/react';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import createTime from '@/components/libs/create/time/createCommTime';

interface props {
  _id:string,
  text:string,
  description:string,
  user:string,
  time:number
}
function MessAdminCard({_id:id,text,description,user,time}:props):JSX.Element {
  const {role,id:_id,token}:IStore = useStore();
  const {invalidateQueries}:QueryClient = useQueryClient();
  const date:string = createTime(time);
  const {mutate} = useMutation<unknown,IMessToAdmin,ICheck&{id:string}>({
    mutationFn:(body:ICheck&{id:string})=>delAdminMess(body),
    onSuccess:()=>invalidateQueries({queryKey:["messages"]})
  });

  const delMess = ():void => {
    mutate({token,role,_id,id});
  };

  return (
    <Grid w={300}
     gridTemplateRows="40px 1fr 40px"
     bg="rgb(60,60,60)"
     borderRadius={10}
     color="white"
     h={170}>
      <Box w="100%"
       borderBottom="1px solid grey"
       textAlign="center"
       fontSize={23}>
         {text}
      </Box>
      <Box pl={2}
       fontSize={20}
       borderBottom="1px solid grey"
       w="100%">
        {description}
      </Box>
      <Flex w="95%"
       justifyContent="space-between"
       alignItems="center"
       m="auto">
        <Box fontSize={18}
         textDecor="underline">
          {user}{" "}{date}
        </Box>
        <Button
         colorScheme='red'
         onClick={delMess}
         h={30}>
          delete
        </Button>
      </Flex>
    </Grid>
  )
}

export default memo(MessAdminCard);