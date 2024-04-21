import { setMessAtion } from '@/components/model/actions/serverActions/setMessAction';
import { useStore } from '@/components/model/store/store';
import {type IStore } from '@/components/libs/types/type';
import { Box, Button, Flex, Input, Modal,ModalContent,
 ModalOverlay, Textarea } from '@chakra-ui/react';
import { memo, useState } from 'react'

interface IProps {
    isOpen:boolean,
    onClose:()=>void
}

function ModalContainer({isOpen,onClose}:IProps):JSX.Element {
  const store:IStore = useStore();
  const [error,setError] = useState<string[]>([]);
  const sendToAdmin = setMessAtion.bind(null,{
    setError,
    onClose,
    store
  });
  
  const isError = (name:string):boolean => {
    return error.some((i:string)=>i == name);
  }

    return (
        <Modal
         isOpen={isOpen}
         onClose={onClose}>
          <ModalOverlay />
          <ModalContent
           bg="rgb(50,50,50)"
           borderRadius={20}
           w={400} mt={200}>
            <form action={sendToAdmin}>
              <Box w={400}>
                <Input w={150} mt={5} ml={5}
                 isInvalid={isError("text")}
                 bg="rgb(240,240,240)" 
                 placeholder="title"
                 name="text"
                />
               <Textarea mt={5} ml={5} w="90%"
                isInvalid={isError("description")}
                placeholder="description"
                name='description'
                bg="rgb(240,240,240)"
                h={200} 
               />
               {Boolean(error.length)&&(
                <Box w="100%"
                 textAlign="center"
                 color="red" mt={5}>
                  server error
                </Box>
               )}
              <Flex w="95%"
               justifyContent="end"
               mt={5} mb={5}>
                <Button
                 colorScheme="red"
                 type="submit">
                  send
                </Button>
              </Flex>
            </Box>
          </form>
        </ModalContent>
      </Modal>
    )
}

export default memo(ModalContainer)