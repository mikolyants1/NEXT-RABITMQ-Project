
import getUser from '@/components/api/query/user/getUser';
import getUsers from '@/components/api/query/user/getUsers'
import { Roles } from '@/components/libs/enum/enum';
import {type IUsers } from '@/components/libs/types/type'
import BanUserMapCard from '@/components/ui/views/home/profile/admin/ban/BanUserMapCard';
import AdminLinks from '@/components/ui/views/home/profile/admin/links/AdminLinks';
import { Box, Flex } from '@chakra-ui/react';
import {type Metadata } from 'next';
import { redirect } from 'next/navigation';

interface IParams {
  params:{
    id:string,
    role:string
  }
};
export const metadata:Metadata = {
  title:"Admin panel",
  description:"Admin panel"
}

async function page({params}:IParams):Promise<JSX.Element> {
  const users:IUsers[] = await getUsers();
  const data:IUsers[] = users.filter(u => u.role !== Roles.ADMIN);
  
  if (params.role !== Roles.ADMIN){
    redirect(`/profile/${params.id}`);
  }

  return (
      <Flex w="90%"
       m="20px auto"
       justifyContent="center"
       flexDirection="column">
         <AdminLinks
          adminId={params.id}
          />
         <Box w="100%"
          color="white"
          textAlign="center"
          fontSize={30}>
            Admin Panel
         </Box>
         <BanUserMapCard
          users={users}
         />
      </Flex>
  )
}

export default page