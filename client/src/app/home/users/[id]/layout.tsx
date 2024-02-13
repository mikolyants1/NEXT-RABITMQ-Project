import DelLayut from '@/components/providers/ReactDelLayout'
import React, { ReactNode } from 'react'

interface props {
    children:ReactNode
};

function layout({children}:props):JSX.Element {
  return (
    <DelLayut isDel={false}>
      {children}
    </DelLayut>
  )
}

export default layout