import { Flex } from '@chakra-ui/react'
import React from 'react'

interface props {
    add:()=>void,
    children:JSX.Element[]
}
function FilmCardWrapper({children,add}:props):JSX.Element {
  return (
    <Flex w={400}
      borderRadius={10}
      bg='rgb(50,50,50)'
      m='20px auto'
      color='white'
      alignItems='center'
      onClick={add}
      h={300}>
       {children}
    </Flex>
  )
}

export default FilmCardWrapper