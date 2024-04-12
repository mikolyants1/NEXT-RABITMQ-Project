import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { memo } from 'react'

interface IProps {
  path:string,
  name:string
}
function NavLinkCard({path,name}:IProps):JSX.Element {
  return (
    <Box mt={5}
     fontSize={18}
     mb={5}>
     <Link href={path}>
        {name}
     </Link>
   </Box>
  )
}

export default memo(NavLinkCard)