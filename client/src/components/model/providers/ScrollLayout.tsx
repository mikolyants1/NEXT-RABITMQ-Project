import { Box } from '@chakra-ui/react'
import React, {type ReactNode } from 'react'

function ScrollLayout({
  children
 }:{
  children:ReactNode
 }):JSX.Element {
  return (
    <Box w="100%"
     position="relative"
     overflow="hidden"
     h={640}>
      {children}
    </Box>
  )
}

export default ScrollLayout