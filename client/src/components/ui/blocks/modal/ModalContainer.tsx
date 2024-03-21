import setMessToAdmin from '@/components/helpers/api/mutation/mess/setMessToAdmin';
import { useStore } from '@/components/store/store';
import { IMessBody, IMessToAdmin, IStateMess, IStore } from '@/components/types/type';
import { Box, Button, Flex, Input, Modal, ModalContent, ModalOverlay, Textarea } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, memo, useState } from 'react'

interface IProps {
    isOpen:boolean,
    onClose:()=>void
}

function ModalContainer({isOpen,onClose}:IProps):JSX.Element {
  const {name:user,token,role,id}:IStore = useStore();
  const {mutate} = useMutation<unknown,IMessToAdmin[],IMessBody>({
    mutationFn:(body:IMessBody)=>setMessToAdmin(body)
  });
  const [state,setState] = useState<IStateMess>({
    text:"",
    description:""
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
      });
    };
  };
      
    return (
        <Modal
         isOpen={isOpen}
         onClose={onClose}>
          <ModalOverlay />
          <ModalContent
           bg="rgb(50,50,50)"
           borderRadius={20}
           w={400} mt={200}>
            <Box w={400}>
              <Input
               w={150} mt={5}
               bg="rgb(240,240,240)" 
               placeholder="title"
               onChange={change}
               name="text"
               ml={5}
               />
              <Textarea mt={5}
               ml={5} w="90%"
               name='description'
               placeholder="description"
               bg="rgb(240,240,240)"
               onChange={change}
               h={200} 
              />
            <Flex w="95%"
             justifyContent="end"
             mt={5} mb={5}>
              <Button onClick={send}
               colorScheme="red">
                send
              </Button>
            </Flex>
          </Box>
        </ModalContent>
      </Modal>
        )
      }

export default memo(ModalContainer)