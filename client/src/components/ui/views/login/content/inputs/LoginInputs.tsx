import { type Form } from "@/components/libs/types/type";
import { Flex, Input } from "@chakra-ui/react";
import { ChangeEvent, memo } from "react";
import { Controller, useFormContext} from 'react-hook-form'

interface IProps {
   title:string,
   name:"pass"|"name",
   err:string[],
   focus:(e:ChangeEvent<HTMLInputElement>)=>void
}

function LoginInput({title,name,err,focus}:IProps):JSX.Element{
  const {control} = useFormContext<Form>();
  const invalid:boolean = err.some((i:string)=>i == name);
  const color:string = invalid ? "red" : "white";
    return (
       <Flex w='90%'
         alignItems='center'
         flexDirection='column'
         m='20px auto'>
          <Controller
           control={control}
           name={name}
           render={({field}):JSX.Element=>(
            <Input w='100%'
             variant="flushed"
             isInvalid={invalid}
             color={color}
             placeholder={title}
             _placeholder={{color}}
             onFocus={focus}
             {...field}
            />
           )}
          />
       </Flex>
    )
}

export default memo(LoginInput);