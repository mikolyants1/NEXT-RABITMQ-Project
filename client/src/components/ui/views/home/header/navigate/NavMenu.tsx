import { useStore } from '@/components/model/store/store'
import {type ILinks,type IStore } from '@/components/libs/types/type'
import { Drawer, DrawerBody,DrawerCloseButton,DrawerContent,
 DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import { createLinks } from '@/components/libs/create/maps/links'
import NavLinkCard from './links/NavLinkCard'

interface IProps {
  isOpen:boolean,
  onClose:()=>void
}
function NavMenu({isOpen,onClose}:IProps):JSX.Element {
  const {id}:IStore = useStore();
  const links:ILinks[] = createLinks(id);

  return (
    <Drawer
     isOpen={isOpen}
     placement='left'
     onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
         color='white'
         border='none'
         />
        <DrawerHeader
         color='white'
         bg='rgb(50,50,50)'
         borderBottom='1px solid white'>
           Navigation
        </DrawerHeader>
        <DrawerBody color='white'
         bg='rgb(50,50,50)'>
          {links.map((i:ILinks):JSX.Element=>(
           <NavLinkCard key={i.path} {...i} />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default NavMenu