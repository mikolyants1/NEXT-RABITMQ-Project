import DelLayut from '@/components/model/providers/ReactDelLayout'
import ScrollLayout from '@/components/model/providers/ScrollLayout'
import ClearJournalButton from '@/components/ui/cards/films/content/buttons/ClearJournalButton'
import {type Metadata } from 'next'
import React, {type ReactNode } from 'react'

interface IProps {
  children:ReactNode
};

export const metadata:Metadata = {
  title:"Profile",
  description:"User profile"
}

function layout({children}:IProps):JSX.Element {
  return (
    <DelLayut isDel>
      <ScrollLayout>
        {children}
        <ClearJournalButton />
      </ScrollLayout>
    </DelLayut>
  )
}

export default layout