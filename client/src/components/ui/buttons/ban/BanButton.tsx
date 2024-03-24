import setBanOrUnBanUser from '@/components/helpers/api/mutation/ban/setBanOrUnBanUser'
import { BanContext } from '@/components/helpers/functions/context'
import getBan from '@/components/helpers/functions/compare/getBan'
import { useStore } from '@/components/store/store'
import { BanType } from '@/components/types/enum'
import { IBanBody, IBanUsers, IStore, Mutate } from '@/components/types/type'
import { Button } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'

interface props {
  id:string
};

function BanButton({id}:props):JSX.Element {
  const {role,token,id:_id}:IStore = useStore();
  const banUsers = useContext<IBanUsers[]>(BanContext);
  const [ban,setBan] = useState<boolean>(getBan(banUsers,id));
  const {mutate} = useMutation<unknown,IBanUsers,IBanBody>({
    mutationFn:(body:IBanBody)=>setBanOrUnBanUser(body)
  })
  
  const banOrUnban = ():void => {
    mutate({
      type:BanType[ban ? "UNBAN" : "BAN"],
      token,
      role,
      _id,
      id
    });
    setBan((prv:boolean)=>!prv);
  };

  return (
    <Button justifySelf="end"
     colorScheme={ban ? "blue" : "red"}
     onClick={banOrUnban}>
       {ban ? "unban" : "ban"}
    </Button>
  )
}

export default BanButton