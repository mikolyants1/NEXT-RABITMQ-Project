'use client'

import { Box, useMediaQuery } from '@chakra-ui/react'
import {memo} from 'react'

interface props {
    children:JSX.Element[]
}
function FilmCompleteWrapper({children}:props):JSX.Element {
 const [isWidth] = useMediaQuery("(max-width: 800px)")
  return (
    <Box minH={400}
     m='60px auto'
     borderRadius={20}
     w={isWidth ? "100%" : 600}
     boxSizing="border-box"
     bg='rgb(50,50,50)'
     color='white'
     pt={5} pb={5}>
      {children}
    </Box>
  )
}

export default memo(FilmCompleteWrapper)