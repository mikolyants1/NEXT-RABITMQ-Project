'use client'

import React, { ReactNode } from 'react'
import {ChakraProvider, theme} from '@chakra-ui/react';

interface props {
    children:ReactNode
};

function ChakraLayout({children}:props):JSX.Element {
  return (
    <ChakraProvider theme={theme}>
        {children}
    </ChakraProvider>
  )
}

export default ChakraLayout