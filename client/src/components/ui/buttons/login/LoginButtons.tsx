import { form } from '@/components/types/type'
import { Button, Flex } from '@chakra-ui/react';
import { SubmitHandler, useFormContext } from 'react-hook-form'

interface props {
    isHome:boolean,
    submit:SubmitHandler<form>
};

function LoginButton({isHome,submit}:props):JSX.Element {
 const {handleSubmit} = useFormContext<form>();
  return (
    <Flex mt={5}
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