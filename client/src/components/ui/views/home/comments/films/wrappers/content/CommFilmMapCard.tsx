import {type IComment } from '@/components/libs/types/type'
import { Flex} from '@chakra-ui/react'
import CommFilmCard from './cards/CommFilmCard';
import DayCommCard from './cards/DayCommCard';
import checkData from '@/components/libs/create/time/checkData';

interface IProps {
  data:IComment[]
};

function CommFilmMapCard({data}:IProps):JSX.Element {
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
            <CommFilmCard key={i._id} {...i} />
          </>
         )})}
     </Flex>
  );
};

export default CommFilmMapCard