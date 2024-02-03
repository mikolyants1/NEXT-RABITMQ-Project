import { useStore } from '@/components/store/store'
import { ILinks } from '@/components/types/type'
import { Drawer, DrawerBody,DrawerCloseButton,DrawerContent,
 DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import NavLinkCard from '../../cards/nav/NavLinkCard'

interface props {
  isOpen:boolean,
  onClose:()=>void
}
function NavMenu({isOpen,onClose}:props):JSX.Element {
  const {id} = useStore();
  const links:ILinks[] = [
    {path:`/home/profile/${id}`,name:"Profile"},
    {path:'/home/users',name:"Users"},
    {path:"/home/search",name:"Search"},
    {path:"/",name:"exit"}
  ]
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
            <NavLinkCard
             key={i.path}
             path={i.path}
             name={i.name}
             />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default NavMenu