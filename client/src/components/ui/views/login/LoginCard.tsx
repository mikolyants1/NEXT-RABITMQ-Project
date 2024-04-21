'use client'

import { Box,} from '@chakra-ui/react';
import {type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FormProvider,type SubmitHandler, useForm } from 'react-hook-form';
import { useStore } from '@/components/model/store/store';
import { useMutation, useQueryClient,QueryClient } from '@tanstack/react-query';
import LoginCardWrapper from './content/LoginCardWrapper';
import LoginButton from './content/buttons/LoginButtons';
import LoginErrorCard from './content/error/LoginErrorCard';
import addUser from '@/components/api/mutation/user/addUser';
import {type ICheck,type IFields,type IStore,type IUsers,type Form } from '@/components/libs/types/type';
import { response } from '@/components/libs/compare/response';
import checkUsers from '@/components/api/query/user/checkUsers';
import { createFields } from '@/components/libs/create/maps/fileds';
import LoginInputs from './content/inputs/LoginInputs';

interface props {
  isHome:boolean,
  children:JSX.Element
};

type MutateArg = Omit<IUsers,"_id"|"films">;

export default function LoginCard({isHome,children}:props):JSX.Element {
 const [errArray,setErrArray] = useState<string[]>([]);
 const hashArray:string[] = useMemo(()=>errArray,[errArray]);
 const router:AppRouterInstance = useRouter();
 const [error,setError] = useState<boolean>(false);
 const {invalidateQueries}:QueryClient = useQueryClient();
 const {mutate:add} = useMutation<unknown,IUsers,MutateArg>({
    mutationFn:(body:MutateArg)=>addUser(body),
    onSuccess:()=>invalidateQueries({queryKey:['users']})
  })
 const {setName,setId,setToken,setRole}:IStore = useStore();
 const methods = useForm<Form>({
  defaultValues:{name:"",pass:""}
 });
 const fields:IFields[] = createFields();

 const submit:SubmitHandler<Form> = async (date):Promise<void> => {
  setErrArray([]);
  if (!date.name) errorHandler("name");
  if (!date.pass) errorHandler("pass");
  if (!date.name || !date.pass) return;
  try {
    const check:ICheck = await checkUsers(date);
    if (response(check._id,isHome)){
      setError(true);
      methods.reset();
      return;
    };
    if (isHome){
      setName(date.name);
      setId(check._id);
      setToken(check.token);
      setRole(check.role);
      router.push(`/profile/${check._id}`);
    } else add(date);
  } catch(e) {
    console.log(e);
    setError(true);
    methods.reset();
  };
 };
 
 const errorHandler = (value:string):void => {
  setErrArray((prv:string[])=>([
    ...prv,value
  ]));
 };

 const focus = useCallback((e:ChangeEvent<HTMLInputElement>):void => {
   const newArrArray:string[] = errArray
   .filter((i:string)=>i !== e.target.name);
   setErrArray(newArrArray);
 },[errArray]);

  return (
    <FormProvider {...methods}>
      <LoginCardWrapper>
        <Box fontSize={25}
         fontWeight='bold'
         textAlign='center'
         mt={5}>
          {isHome ? "Entrance" : "Registration"}
        </Box>
        <>
         {fields.map((i:IFields):JSX.Element=>(
           <LoginInputs
            key={i.name}
            err={hashArray}
            focus={focus}
            {...i}
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