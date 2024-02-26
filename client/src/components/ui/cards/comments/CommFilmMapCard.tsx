import { IComment } from '@/components/types/type'
import { Flex} from '@chakra-ui/react'
import React from 'react'
import CommFilmCard from './comment/CommFilmCard';
import DayCommCard from './comment/DayCommCard';
import checkData from '@/components/helpers/functions/create/time/checkData';

interface props {
    data:IComment[]
};

function CommFilmMapCard({data}:props):JSX.Element {
  return (
     <Flex w='100%' h='100%'
      flexDirection='column'>
       {data.map((i:IComment,idx:number):JSX.Element=>{
        const isNewDay:boolean = checkData(data,idx);
        return (
           <>
           {isNewDay && (
            <DayCommCard time={i.time} />
           )}
            <CommFilmCard
             key={i._id}
             text={i.text}
             time={i.time}
             name={i.username}
             />
          </>
         )})}
     </Flex>
  );
};

export default CommFilmMapCard