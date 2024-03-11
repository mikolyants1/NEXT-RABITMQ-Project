'use client'

import { ICheck,IStore,Mutate,fields,form } from '@/components/types/type'
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

type MutateArg = Omit<IUsers,"_id"|"films">;


export default function LoginCard({isHome,children}:props):JSX.Element {
 const router:AppRouterInstance = useRouter();
 const [error,setError] = useState<boolean>(false);
 const {invalidateQueries}:QueryClient = useQueryClient();
 const {mutate:add} = useMutation<unknown,IUsers,MutateArg>({
    mutationFn:(body:MutateArg)=>addUser(body),
    onSuccess:()=>invalidateQueries({queryKey:['users']})
  })
 const {setName,setId,setToken,setRole}:IStore = useStore();
 const methods = useForm<form>({
  defaultValues:{name:"",pass:""}
 });
 const fields:fields[] = createFields();

 const submit:SubmitHandler<form> = async (date):Promise<void> => {
   try {
      const {_id,token,role}:ICheck = await checkUsers(date);
      if (response(_id,isHome)){
        setError(true);
        methods.reset();
        return;
       };
      if (isHome){
       setName(date.name);
       setId(_id);
       setToken(token);
       setRole(role);
       router.push(`/home/profile/${_id}`);
      } else add(date);
    } catch(e) {
      console.log(e);
      setError(true);
      methods.reset();
    };
 };
 
  return (
    <FormProvider {...methods}>
      <LoginCardWrapper>
        <Box fontSize={25}
         fontWeight='bold'
         textAlign='center'>
          {isHome ? "Entrance" : "Registration"}
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