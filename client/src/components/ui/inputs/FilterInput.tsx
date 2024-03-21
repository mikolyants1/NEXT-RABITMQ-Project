import { Input } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'

interface IProps {
  change:(e:ChangeEvent<HTMLInputElement>)=>void
}

function FilterInput({change}:IProps):JSX.Element {
  return (
    <Input
     placeholder="search"
     _placeholder={{color:"grey"}}
     onChange={change}
     variant="flushed"
     m="10px auto 20px auto"
     w={290}
    />
  )
}

export default FilterInput