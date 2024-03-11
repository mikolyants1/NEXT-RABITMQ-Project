"use client"

import getAdminMess from '@/components/helpers/api/query/mess/getAdminMess'
import { useStore } from '@/components/store/store'
import { IMessToAdmin, IStore, IUsers } from '@/components/types/type'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import Loading from '../load/Loading'
import Error from '../load/Error'

interface props {
    adminId:string
};

function AdminLinks({adminId}:props):JSX.Element {
  const {role,token,id:_id}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<IMessToAdmin[]>({
    queryKey:["banusers",role,token,_id],
    queryFn:()=>getAdminMess({role,token,_id})
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  const isBe:string = data.length ? "red" : "white";
    return (
       <Flex w="100%"
        fontSize={26}
        fontWeight="bold"
        color="white"
         justifyContent="space-between">
           <Link href={`/home/profile/${adminId}`}
            style={{
              fontSize:20,
              textDecoration:"underline"
            }}>
             back to profile
          </Link>
          <Link href={`/home/profile/${adminId}/message`}>
            messages {" "}
            <Text as="span"
             color={isBe}>
                {data.length}
            </Text>
          </Link>
        </Flex>
  )
}

export default AdminLinks