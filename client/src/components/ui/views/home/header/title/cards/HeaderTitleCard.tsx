"use client"

import { Box} from '@chakra-ui/react'
import { memo } from 'react'
import LogoCard from './logo/LogoCard'
import HeaderWrapper from '../HeaderWrapper'

interface IProps {
  onOpen:()=>void
}
function HeaderTitleCard({onOpen}:IProps):JSX.Element {
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

export default memo(HeaderTitleCard)