import DelLayut from '@/components/model/providers/ReactDelLayout'
import {type Metadata } from 'next'
import {type ReactNode } from 'react'

export const metadata:Metadata = {
  title:"Users",
  description:"Users page"
}

function layout({children}:{children:ReactNode}):JSX.Element {
  return (
    <DelLayut isDel={false}>
      {children}
    </DelLayut>
  )
}

export default layout