import { Flex } from '@chakra-ui/react'
import React from 'react'

interface props {
    children:JSX.Element[]
}
function FilmCardWrapper({children}:props):JSX.Element {
  return (
    <Flex w={400}
      borderRadius={10}
      bg='rgb(50,50,50)'
      m='20px auto'
      color='white'
      alignItems='center'
      position='relative'
      h={300}>
       {children}
    </Flex>
  )
}

export default FilmCardWrapper