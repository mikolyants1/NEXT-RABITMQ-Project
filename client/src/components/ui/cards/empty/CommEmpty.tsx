'use client'

import { Box } from '@chakra-ui/react'

interface IProps {
  text:string
}
function CommEmpty({text}:IProps):JSX.Element {
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