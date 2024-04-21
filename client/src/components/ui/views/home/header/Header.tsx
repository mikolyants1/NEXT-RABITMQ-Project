"use client"

import { useDisclosure } from '@chakra-ui/react'
import NavMenu from './navigate/NavMenu';
import HeaderTitleCard from './title/cards/HeaderTitleCard';

function Header():JSX.Element {
  const {onOpen,isOpen,onClose} = useDisclosure();
  return (
    <>
      <HeaderTitleCard
       onOpen={onOpen}
       />
      <NavMenu
       isOpen={isOpen}
       onClose={onClose} 
       />
    </>
  )
}

export default Header