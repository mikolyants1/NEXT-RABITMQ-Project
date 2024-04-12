"use client"

import getAdminMess from '@/components/api/query/mess/getAdminMess';
import { useStore } from '@/components/model/store/store';
import { IMessToAdmin, IStore } from '@/components/libs/types/type'
import Error from '@/components/ui/load/Error';
import Loading from '@/components/ui/load/Loading';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import MessAdminCard from '@/components/ui/views/home/profile/mess/MessAdminCard';
import EmptyMessCard from '@/components/ui/views/home/profile/mess/EmptyMessCard';

function page():JSX.Element {
  const rout:AppRouterInstance = useRouter();
  const {id:_id,role,token}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<IMessToAdmin[]>({
    queryKey:["messages",_id,role,token],
    queryFn:()=>getAdminMess({_id,role,token})
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
      <>
       <Box w="95%"
        color="white"
        textDecor="underline"
        onClick={rout.back.bind(rout)}
        fontSize={20}
        m="20px auto">
         back
       </Box>
       <Flex w="95%"
        flexWrap="wrap"
        gap={10} m="30px auto">
        {data.length ? (
          <>
           {data.map((i:IMessToAdmin):JSX.Element=>(
            <MessAdminCard key={i._id} {...i} />
           ))}
          </>
          ) : <EmptyMessCard />}
        </Flex>
      </>
  )
}

export default page