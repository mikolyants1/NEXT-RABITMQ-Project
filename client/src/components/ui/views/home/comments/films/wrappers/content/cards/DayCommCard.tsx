
import getDayOfComment from '@/components/libs/create/time/getDayOfComm';
import { Box } from '@chakra-ui/react';
import React from 'react'

interface props {
    time:number
}
function DayCommCard({time}:props):JSX.Element {
 const date:string = getDayOfComment(time);
  return (
    <Box w='100%'
     textAlign="center"
     color='white'>
        {date}
    </Box>
  )
}

export default DayCommCard