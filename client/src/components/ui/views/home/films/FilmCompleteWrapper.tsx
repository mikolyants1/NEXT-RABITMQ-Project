'use client'

import { Box, useMediaQuery } from '@chakra-ui/react'
import {memo} from 'react'

interface IProps {
  children:JSX.Element[]
}

function FilmCompleteWrapper({children}:IProps):JSX.Element {
 const [isWidth] = useMediaQuery("(max-width: 800px)")
  return (
    <Box minH={400}
     m='60px auto'
     borderRadius={20}
     w={isWidth ? "100%" : 600}
     boxSizing="border-box"
     position="relative"
     bg='rgb(50,50,50)'
     color='white'
     pt={1} pb={5}>
      {children}
    </Box>
  )
}

export default memo(FilmCompleteWrapper)