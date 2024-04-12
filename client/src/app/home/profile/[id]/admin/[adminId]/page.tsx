
import getUsers from '@/components/api/query/user/getUsers'
import { Roles } from '@/components/libs/enum/enum';
import { IUsers } from '@/components/libs/types/type'
import BanUserMapCard from '@/components/ui/views/home/profile/admin/ban/BanUserMapCard';
import AdminLinks from '@/components/ui/views/home/profile/admin/links/AdminLinks';
import { Box, Flex } from '@chakra-ui/react';
import React, { use } from 'react'

interface IParams {
  params:{
    adminId:string
  }
};

function page({params}:IParams):JSX.Element {
  const users:IUsers[] = use(getUsers())
  .filter((i:IUsers)=>i.role !== Roles.ADMIN);

  return (
      <Flex w="90%"
       m="20px auto"
       justifyContent="center"
       flexDirection="column">
         <AdminLinks
          adminId={params.adminId}
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