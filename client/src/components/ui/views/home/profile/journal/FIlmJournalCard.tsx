import { Box } from '@chakra-ui/react';
import { memo } from 'react';

interface props {
  isMaped:boolean
}
function FilmJournalCard({isMaped}:props):JSX.Element {
  return (
    <Box w='100%'
     color='white'
     fontSize={23}
     textAlign='center'
     mt={10} mb={5}>
     Your's film journal {!isMaped&&'is empty'}
    </Box>
  )
}

export default memo(FilmJournalCard)