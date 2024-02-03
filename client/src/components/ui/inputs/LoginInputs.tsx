import { Control, fields, form } from "@/components/types/type";
import { Box, Flex, Input } from "@chakra-ui/react"
import { memo } from "react";
import { Controller, useFormContext} from 'react-hook-form'

function LoginInput({title,Name}:fields):JSX.Element{
  const {control} = useFormContext<form>();
    return (
       <Flex w='90%'
         alignItems='center'
         flexDirection='column'
         m='10px auto'>
          <Box w='100%'
            fontSize={18}>
            {title}
          </Box>
          <Controller
           control={control}
           name={Name}
           render={({field}):JSX.Element=>{
            const {onChange,name,value
            }:Control<`${typeof Name}`> = field;
             return (
                <Input w='100%'
                 bg='rgb(240,240,240)'
                 color='black'
                 placeholder={title}
                 borderRadius={10}
                 onChange={onChange}
                 value={value}
                 name={name}
                />
             )}}
          />
       </Flex>
    )
}

export default memo(LoginInput);