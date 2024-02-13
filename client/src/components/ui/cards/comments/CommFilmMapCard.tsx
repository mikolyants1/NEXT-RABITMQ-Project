import { IComment } from '@/components/types/type'
import { Flex} from '@chakra-ui/react'
import React from 'react'
import CommFilmCard from './comment/CommFilmCard';

interface props {
    data:IComment[]
};

function CommFilmMapCard({data}:props):JSX.Element {
  console.log(data)
  return (
     <Flex w='100%' h='100%'
      flexDirection='column'>
       {data.map((i:IComment):JSX.Element=>(
         <CommFilmCard
          key={i._id}
          text={i.text}
          time={i.time}
          name={i.username}
         />
       ))}
     </Flex>
  );
};

export default CommFilmMapCard