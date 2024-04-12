import { Box } from '@chakra-ui/react'
import React, { memo } from 'react'

interface props {
    item:string
};

function FilmPosterCard({item}:props):JSX.Element {
  return (
        <Box
         w='100%'
         textAlign='center'
         borderTop='1px solid white'
         boxSizing="border-box"
         fontSize={23}
         p={5}>
          {item}
        </Box>
  )
}

export default memo(FilmPosterCard)