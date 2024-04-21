import {type Form } from '@/components/libs/types/type'
import { Button, Flex } from '@chakra-ui/react';
import { SubmitHandler, useFormContext } from 'react-hook-form'

interface IProps {
  isHome:boolean,
  submit:SubmitHandler<Form>
};

function LoginButton({isHome,submit}:IProps):JSX.Element {
 const {handleSubmit} = useFormContext<Form>();
  return (
    <Flex mt={8} 
     justifyContent='center'>
     <Button w={150}
      colorScheme='green'
      onClick={handleSubmit(submit)}>
       {isHome ? 'login' : 'regist'}
     </Button>
   </Flex>
  )
}

export default LoginButton