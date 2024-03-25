import { setMessAtion } from '@/components/helpers/functions/actions/setMessAction';
import { useStore } from '@/components/store/store';
import { IStore } from '@/components/types/type';
import { Box, Button, Flex, Input, Modal,
 ModalContent, ModalOverlay, Textarea } from '@chakra-ui/react';
import React, { memo } from 'react'

interface IProps {
    isOpen:boolean,
    onClose:()=>void
}

function ModalContainer({isOpen,onClose}:IProps):JSX.Element {
  const store:IStore = useStore();
  const sendToAdmin = setMessAtion.bind(null,{onClose,store});
  
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
                <Input
                 w={150} mt={5}
                 bg="rgb(240,240,240)" 
                 placeholder="title"
                 name="text"
                 ml={5}
                />
               <Textarea mt={5}
                ml={5} w="90%"
                name='description'
                placeholder="description"
                bg="rgb(240,240,240)"
                h={200} 
               />
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