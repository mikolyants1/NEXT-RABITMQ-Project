import { Box } from "@chakra-ui/react"
import { memo } from "react"

interface props {
    children:JSX.Element[]
};

function LoginCardWrapper({children}:props):JSX.Element {
  return (
    <Box w={400}
      m='100px auto'
      bg='rgb(40,40,40)'
      color='white'
      position='absolute'
      right={0} left={0}
      borderRadius={20}
      minH={300} overflow='hidden'>
      {children}
    </Box>
  )
}

export default memo(LoginCardWrapper)