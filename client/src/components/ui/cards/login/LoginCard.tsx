'use client'

import { ICheck,fields,form } from '@/components/types/type'
import LoginInputs from '@/components/ui/inputs/LoginInputs'
import { Box,} from '@chakra-ui/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import LoginErrorCard from './LoginErrorCard'
import LoginButton from '../../buttons/login/LoginButtons'
import { useStore } from '@/components/store/store'
import { useMutation, useQueryClient,UseMutationResult, QueryClient } from '@tanstack/react-query'
import addUser from '@/components/helpers/api/mutation/user/addUser'
import { IUsers } from '@/components/types/type'
import { response } from '@/components/helpers/functions/response'
import checkUsers from '@/components/helpers/api/query/user/checkUsers'
import LoginCardWrapper from '../../wrappers/LoginCardWrapper'
import { createFields } from '@/components/helpers/functions/create/maps/fileds'

interface props {
  isHome:boolean,
  children:JSX.Element
};

export default function LoginCard({isHome,children}:props):JSX.Element {
 const router:AppRouterInstance = useRouter();
 const title:string = isHome ? 'Entrance' : 'Registration';
 const [error,setError] = useState<boolean>(false);
 const {invalidateQueries}:QueryClient = useQueryClient();
 const {mutate:add}:UseMutationResult<unknown,
  IUsers,Omit<IUsers,"_id"|"films">> = useMutation({
  mutationFn:(body:Omit<IUsers,"_id"|"films">)=>addUser(body),
  onSuccess:()=>invalidateQueries({queryKey:['users']})
})
 const {setName,setId,setToken} = useStore();
 const methods = useForm<form>({
  defaultValues:{name:"",pass:""}
 });
 const fields:fields[] = createFields();
 const {reset} = methods;

 const submit:SubmitHandler<form> = async (date):Promise<void> => {
   try {
   const data:ICheck = await checkUsers(date);
   console.log(data._id)
      if (response(data._id,isHome)){
        setError(true);
        reset();
        return;
       };
      if (isHome){
       setName(date.name);
       setId(data._id);
       setToken(data.token);
       router.push(`/home/profile/${data._id}`);
      } else add(date);
    } catch(e) {
      console.log(e);
      setError(true);
      reset();
    }
 };
 
  return (
    <FormProvider {...methods}>
      <LoginCardWrapper>
        <Box fontSize={25}
         fontWeight='bold'
         textAlign='center'>
          {title}
        </Box>
        <>
         {fields.map((i:fields):JSX.Element=>(
           <LoginInputs
            key={i.Name}
            title={i.title}
            Name={i.Name}
           />
          ))}
        </>
         <LoginButton
          isHome={isHome}
          submit={submit}
          />
        <LoginErrorCard error={error} />
          {children}
      </LoginCardWrapper>
    </FormProvider>
  )
};