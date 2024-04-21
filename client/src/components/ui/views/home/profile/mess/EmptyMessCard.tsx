import { Box } from '@chakra-ui/react'

function EmptyMessCard():JSX.Element {
  return (
    <Box w="100%"
     m="40px auto"
     color="white"
     textAlign="center"
     fontWeight="bold"
     fontSize={34}>
       No Messages
    </Box>
  )
}

export default EmptyMessCard