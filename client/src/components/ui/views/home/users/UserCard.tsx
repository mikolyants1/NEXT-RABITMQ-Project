"use client"

import {IStore, type IFilms } from '@/components/libs/types/type';
import { Box, Text} from '@chakra-ui/react';
import { useEffect, useState,useLayoutEffect } from 'react';
import {Socket, io} from 'socket.io-client';
import { useStore } from '@/components/model/store/store'
import UserShowMapCard from './content/UserShowMapCard';

interface IProps {
  name:string,
  films:IFilms[],
  role:string,
  pass:string,
  _id:string
}

function UserCard({name,films,_id}:IProps):JSX.Element {
  const [isOnline,setOnline] = useState<boolean>(false);
  const [socket,setSocket] = useState<Socket>();
  const {id:userId}:IStore = useStore();

  useLayoutEffect(() => {
    setSocket(io("http://localhost:5000/"));
  },[]);

  useEffect(()=>{
   socket?.emit("join",_id);
   socket?.on("online",(users:string[]) => {
    const online = users.some(id => id == userId);
     setOnline(online);
   })
  },[socket]);

  return (
    <Box w='100%' mt={10}>
      <Box w='100%'
       pt={2} pb={2}
       textAlign='center'
       fontWeight='bold'
       borderTop='1px solid white'
       borderBottom='1px solid white'
       fontSize={30}
       color='white'>
        {name} {" "}
        <Text fontSize={20}
         color={isOnline ? "green" : "red"}>
          {isOnline ? "online" : "offline"}
        </Text>
      </Box>
      <UserShowMapCard
       name={name}
       films={films}
       _id={_id}
      />
    </Box>
  )
}

export default UserCard