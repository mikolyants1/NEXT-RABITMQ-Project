"use client"

import setMessToAdmin from "@/components/helpers/api/mutation/mess/setMessToAdmin";
import { useStore } from "@/components/store/store";
import { IMessBody, IMessToAdmin, IStateMess, IStore } from "@/components/types/type";
import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, use, useState } from "react"

function page():JSX.Element {
  const {name:user,token,role,id}:IStore = useStore();
  const {mutate,data} = useMutation<unknown,IMessToAdmin[],IMessBody>({
    mutationFn:(body:IMessBody)=>setMessToAdmin(body)
  });
  const [state,setState] = useState<IStateMess>({
    text:"",description:""
  });

  const change = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>):void => {
    setState((prv:IStateMess)=>({
        ...prv,[e.target.name]:e.target.value
    }))
  };

  const send = ():void => {
    if (state.description && state.text){
       mutate({
         text:state.text,
         description:state.description,
         _id:id,
         user,
         token,
         role
       })
    }
    console.log(data)
  };

  return (
    <Flex w="100%"
     justifyContent="center"
     alignItems="center"
     mt={10}>
      <Box w={400}>
        <Input
         w={150} mt={20}
         bg="rgb(240,240,240)" 
         placeholder="title"
         onChange={change}
         name="text"
         />
        <Textarea
         mt={10} w="100%"
         name='description'
         placeholder="description"
         bg="rgb(240,240,240)"
         onChange={change}
         h={200}
        />
        <Flex w="100%"
         justifyContent="end"
         mt={5}>
          <Button onClick={send}
           colorScheme="red">
            send
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default page