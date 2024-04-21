"use client"

import getAdminMess from '@/components/api/query/mess/getAdminMess';
import { useStore } from '@/components/model/store/store';
import {type IMessToAdmin,type IStore} from '@/components/libs/types/type';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Loading from '@/components/ui/load/Loading';
import Error from '@/components/ui/load/Error';
import MessCount from './messages/MessCount';

interface IProps {
  adminId:string
};

function AdminLinks({adminId}:IProps):JSX.Element {
  const {role,token,id:_id}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<IMessToAdmin[]>({
    queryKey:["banusers",role,token,_id],
    queryFn:()=>getAdminMess({role,token,_id})
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  
    return (
       <Flex w="100%"
        fontSize={26}
        fontWeight="bold"
        color="white"
         justifyContent="space-between">
           <Link href={`/profile/${adminId}`}
            style={{
              fontSize:20,
              textDecoration:"underline"
            }}>
             back to profile
          </Link>
          <Link style={{display:"flex",gap:5}}
           href={`/profile/${adminId}/message`}>
            <Box>
               messages
            </Box>
            <MessCount length={data.length} />
          </Link>
        </Flex>
  )
}

export default AdminLinks