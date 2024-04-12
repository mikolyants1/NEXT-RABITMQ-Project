"use client"

import { favorAction } from '@/components/api/mutation/favor/favorAction'
import { useStore } from '@/components/model/store/store'
import { IFavorData,IFilms, IStore } from '@/components/libs/types/type'
import { Box, Text } from '@chakra-ui/react'
import React, { memo, useState } from 'react'
import { checkFavor } from '@/components/libs/compare/checkFavor'
import { EFavoriteType } from '@/components/libs/enum/enum'

interface IProps {
  favorFilms:IFavorData[],
  film:IFilms
}

function SetFavorButton({favorFilms,film}:IProps):JSX.Element {
  const store:IStore = useStore();
  const [favor,setFavor] = useState<boolean>(()=>(
    checkFavor(favorFilms,film.imdbID,store.id)
  ));
  
  const updateFavor = async ():Promise<void> => {
    await favorAction({
      store,
      type:favor ? EFavoriteType.DELETE : EFavoriteType.ADD,
      film:{
        filmId:film.imdbID,
        Poster:film.Poster,
        Released:film.Released,
        Title:film.Title
      }
    });
    setFavor((prv:boolean)=>!prv);
  }

  return (
    <Box w="95%"
     textAlign="end"
     position="absolute"
     zIndex={101}>
      <Text as="span" fontSize={34}
       color={favor ? "gold" : "grey"}
       onClick={updateFavor}>
        &#9733;
      </Text>
    </Box>
  )
}

export default memo(SetFavorButton);