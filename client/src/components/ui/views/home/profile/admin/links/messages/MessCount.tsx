import { Box } from '@chakra-ui/react'

interface IProps {
  length:number
}

function MessCount({length}:IProps):JSX.Element {
 const size:string = length ?
  length >= 10 ? "23px" : "20px" : "20px";

  return (
    <Box fontSize={14}
     borderRadius="50%" h={size}
     bg={length ? "red" : "white"}
     color={length ? "white" : "black"}
     textAlign="center" w={size}
     pt={length >= 10 ? 0.5 : 0}>
      {length}
   </Box>
  )
}

export default MessCount