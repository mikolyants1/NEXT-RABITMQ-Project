import setBanOrUnBanUser from '@/components/api/mutation/ban/setBanOrUnBanUser'
import { useStore } from '@/components/model/store/store'
import { BanType } from '@/components/libs/enum/enum'
import { IBanBody, IBanUsers, IStore, } from '@/components/libs/types/type'
import { Button } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { BanContext } from '@/components/model/context/BanContext'
import getBan from '@/components/libs/compare/getBan'

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
      type:ban ? BanType.UNBAN : BanType.BAN,
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