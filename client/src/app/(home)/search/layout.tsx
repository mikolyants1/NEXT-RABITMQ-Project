import DelLayut from '@/components/model/providers/ReactDelLayout'
import {type Metadata } from 'next'
import {type ReactNode } from 'react'

interface props {
  children:ReactNode
};


export const metadata:Metadata = {
  title:"Search",
  description:"search films"
}

function layout({children}:props):JSX.Element {
  return (
    <DelLayut isDel={false}>
      {children}
    </DelLayut>
  )
}

export default layout