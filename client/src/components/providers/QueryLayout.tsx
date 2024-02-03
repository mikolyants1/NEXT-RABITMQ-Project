'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

interface props {
    children:JSX.Element
}
const query:QueryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false
      }
    }
})
function QueryLayout({children}:props):JSX.Element {
  return (
    <QueryClientProvider client={query}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryLayout