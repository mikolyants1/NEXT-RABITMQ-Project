"use client"

import { Box} from '@chakra-ui/react'
import React, { memo } from 'react'
import LogoCard from './LogoCard';
import HeaderWrapper from '../../wrappers/HeaderWrapper';

interface props {
    onOpen:()=>void
}
function HeaderCard({onOpen}:props):JSX.Element {
  return (
    <Box w='100%'
     fontWeight='bold'
     bg='rgb(60,60,60)'>
      <HeaderWrapper>
        <Box onClick={onOpen}
         fontSize={20}>
          Menu
        </Box>
        <Box fontSize={30}>
          Film Note
        </Box>
        <LogoCard />
      </HeaderWrapper>
    </Box>
  )
}

export default memo(HeaderCard)