"use client"

import { IFilms } from '@/components/types/type'
import { Box, Text} from '@chakra-ui/react'
import React, { useEffect, useState,useLayoutEffect } from 'react'
import FilmMapCard from '../films/FilmMapCard'
import {Socket, io} from 'socket.io-client';
import { useStore } from '@/components/store/store'

interface props {
  name:string,
  films:IFilms[],
  id:string
};

function UserCard({name,films,id}:props):JSX.Element {
  const [isOnline,setOnline] = useState<boolean>(false);
  const [socket,setSocket] = useState<Socket>();
  const {id:userId} = useStore();

  useLayoutEffect(()=>{
    setSocket(io("http://localhost:5000/"));
  },[]);

  useEffect(()=>{
   socket?.emit("join",id);
   socket?.on("online",(users:string[])=>{
    const online:boolean = users
    .some((i:string)=> i == userId);
    console.log(users)
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
      <FilmMapCard data={films} />
    </Box>
  )
}

export default UserCard