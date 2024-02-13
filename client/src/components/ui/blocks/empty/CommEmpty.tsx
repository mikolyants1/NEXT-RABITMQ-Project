'use client'

import { Box } from '@chakra-ui/react'
import React from 'react'

interface props {
  text:string
}
function CommEmpty({text}:props):JSX.Element {
  return (
    <Box w='100%'
     textAlign='center'
     fontSize={30}
     color='white'
     mt={20}>
      {text}
    </Box>
  )
}

export default CommEmpty