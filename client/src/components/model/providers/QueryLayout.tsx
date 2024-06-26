'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface props {
    children:JSX.Element
}

const query:QueryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false,
        keepPreviousData:true
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