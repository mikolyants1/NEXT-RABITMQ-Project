import { getFavorData } from '@/components/api/query/favor/getFavor';
import { createFavoriteMap } from '@/components/libs/create/maps/favoriteMap';
import {type IFavorFilmData,type IFilms } from '@/components/libs/types/type';
import { useStore } from '@/components/model/store/store';
import FilmCard from '@/components/ui/cards/films/content/FilmCard';
import Error from '@/components/ui/load/Error';
import Loading from '@/components/ui/load/Loading';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {motion} from 'framer-motion'

interface IProps {
    _id:string,
    name:string,
    films:IFilms[]
}
function UserShowMapCard({_id,name,films}:IProps):JSX.Element {
  const store = useStore();
  const {isError,isLoading,data} = useQuery<IFavorFilmData[]>({
    queryKey:["favor"],
    queryFn:()=>getFavorData({
      store,
      _id
    })
  })

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;
  console.log(data,films)
  const favorFilms:IFilms[] = createFavoriteMap({
    films,
    favorite:data
  });

  return (
    <Flex w="100%"
     flexWrap="wrap"
     justifyContent="center"
     rowGap={20}>
       {favorFilms.length ? (
        <>
         {favorFilms.map((i:IFilms,idx:number):JSX.Element=>(
          <motion.div
           style={{
             gap:20
           }}
           initial={{
              opacity:0,
              transform:'translateY(100px)'
            }}
            animate={{
              opacity:1,
              transform:'translateY(0)'
            }}
           transition={{duration:0.5,delay:idx * 0.3}}>
            <FilmCard data={i} />
          </motion.div>
         ))}
        </>
        ) : (
         <Box mt={5}
          fontSize={25}
          color="white">
           {name} has not favorite films
         </Box>
        )}
    </Flex>
  )
}

export default UserShowMapCard