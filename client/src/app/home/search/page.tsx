'use client'

import getFilmByTitle from '@/components/helpers/query/film/getFilmByTitle';
import { initial, reducer } from '@/components/helpers/reducer';
import { IFilms } from '@/components/types/type'
import FilmCard from '@/components/ui/cards/films/film/FilmCard';
import Error from '@/components/ui/load/Error';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { ChangeEvent, KeyboardEvent,
useMemo, useReducer, useState } from 'react'

function page():JSX.Element {
  const [data,setData] = useState<IFilms>({} as IFilms);
  const [state,dispatch] = useReducer(reducer,initial);
  const memoData:IFilms = useMemo(()=>data,[data]);

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    dispatch({title:e.target.value});
  };

  const enterHandler = (e:KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === "Enter") search();
  };

  const search = async ():Promise<void> => {
    try {
      const film:IFilms = await getFilmByTitle(state.title);
      setData(film);
      dispatch({show:true});
    } catch (e) {
      console.log(e)
      dispatch({error:true});
    };
  };

 if (state.error) return <Error />;

  return (
    <Box w='100%'
     color='white'>
       <Box mt={10}
        w='100%'
        textAlign='center'
        fontSize={34}>
           Search for films
       </Box>
       <Flex w={300} m='30px auto'>
         <Input color='black'
          borderRightRadius='none'
          bg='rgb(240,240,240)'
          onChange={change}
          onKeyUp={enterHandler}
         />
         <Button onClick={search}
          borderLeftRadius='none'
          colorScheme='blue'>
            search
         </Button>
       </Flex>
       <>
        {state.show&&(
          <FilmCard
           data={memoData}
           />
        )}
       </>
    </Box>
  )
}

export default page