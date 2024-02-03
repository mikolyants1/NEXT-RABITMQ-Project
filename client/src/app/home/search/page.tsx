'use client'

import getFilmByTitle from '@/components/helpers/query/film/getFilmByTitle';
import { IFilms } from '@/components/types/type'
import FilmCard from '@/components/ui/cards/films/film/FilmCard';
import Error from '@/components/ui/load/Error';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { ChangeEvent, KeyboardEvent, useMemo, useState } from 'react'

function page():JSX.Element {
  const [data,setData] = useState<IFilms>({} as IFilms);
  const [error,setError] = useState<boolean>(false);
  const [show,setShow] = useState<boolean>(false);
  const [title,setTitle] = useState<string>("");
  const memoData:IFilms = useMemo(()=>data,[data]);

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setTitle(e.target.value);
  };
  const enterHandler = (e:KeyboardEvent<HTMLInputElement>):void => {
     if (e.key === "Enter") search();
  };

  const search = async ():Promise<void> => {
    try {
      const film:IFilms = await getFilmByTitle(title);
      setData(film);
      setShow(true);
    } catch (e) {
        console.log(e)
       setError(true);
    };
  };

 if (error) return <Error />;

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
        {show&&<FilmCard data={memoData} />}
       </>
    </Box>
  )
}

export default page