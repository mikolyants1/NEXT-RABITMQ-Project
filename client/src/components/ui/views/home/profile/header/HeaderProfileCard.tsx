"use client"

import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import {memo} from 'react';
import ModalContainer from './modals/ModalContainer';

interface IProps {
  role:string,
  id:string
}

function HeaderProfileCard({role,id}:IProps):JSX.Element {
  const {isOpen,onClose,onOpen} = useDisclosure();
  
  return (
    <>
     <Flex w="95%"
      justifyContent="end"
      mt={5} fontSize={25}>
      {role == "admin" ? (
       <Link href={`${id}/admin/${role}`}>
         admin panel
       </Link>
      ) : (
       <Text onClick={onOpen}>
         send mess to admin
       </Text>
      )}
     </Flex>
     <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      />
   </>
  )
}

export default memo(HeaderProfileCard)