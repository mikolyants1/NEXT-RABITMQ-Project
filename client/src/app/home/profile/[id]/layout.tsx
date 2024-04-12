import DelLayut from '@/components/model/providers/ReactDelLayout'
import React, { ReactNode } from 'react'

interface props {
    children:ReactNode
};

function layout({children}:props):JSX.Element {
  return (
    <DelLayut isDel>
      {children}
    </DelLayut>
  )
}

export default layout