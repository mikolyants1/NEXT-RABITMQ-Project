import { Control, form } from "@/components/types/type";
import { Flex, Input } from "@chakra-ui/react"
import { ChangeEvent, memo } from "react";
import { Controller, useFormContext} from 'react-hook-form'

interface IProps {
   title:string,
   Name:"pass"|"name",
   err:string[],
   focus:(e:ChangeEvent<HTMLInputElement>)=>void
}

function LoginInput({title,Name,err,focus}:IProps):JSX.Element{
  const {control} = useFormContext<form>();
  const invalid:boolean = err.some((i:string)=>i == Name);
  const color:string = invalid ? "red" : "white";
    return (
       <Flex w='90%'
         alignItems='center'
         flexDirection='column'
         m='20px auto'>
          <Controller
           control={control}
           name={Name}
           render={({field}):JSX.Element=>{
            const {onChange,name,value
            }:Control<`${typeof Name}`> = field;
             return (
                <Input w='100%'
                 variant="flushed"
                 isInvalid={invalid}
                 color={color}
                 placeholder={title}
                 _placeholder={{color}}
                 onChange={onChange}
                 onFocus={focus}
                 value={value}
                 name={name}
                />
             )}}
          />
       </Flex>
    )
}

export default memo(LoginInput);