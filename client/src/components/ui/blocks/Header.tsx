"use client"

import {useDisclosure } from '@chakra-ui/react'
import React from 'react'
import NavMenu from './headerNav/NavMenu';
import HeaderCard from '../cards/header/HeaderCard';

function Header():JSX.Element {
  const {onOpen,isOpen,onClose} = useDisclosure();
  return (
    <>
      <HeaderCard
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