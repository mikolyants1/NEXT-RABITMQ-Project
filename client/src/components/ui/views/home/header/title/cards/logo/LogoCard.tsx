
import { useStore } from '@/components/model/store/store';
import { ILogo, IStore } from '@/components/libs/types/type';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import React, { memo } from 'react'
import { createLogo } from '@/components/libs/create/logo';

function LogoCard():JSX.Element {
 const {name,id}:IStore = useStore();
 const lett:string = name[0].toUpperCase();
 const {one,two}:ILogo = createLogo();
  return (
    <Link href={`/home/profile/${id}`}>
      <Box w={12}
       background={`linear-gradient(45deg,${one},${two})`}
       textAlign='center'
       borderRadius='50%'
       fontSize={21}
       boxSizing="border-box"
       p='8px'
       h={12}>
       {lett}
      </Box>
    </Link>
  )
}

export default memo(LogoCard)