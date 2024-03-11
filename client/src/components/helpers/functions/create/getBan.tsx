import { IBanUsers } from '@/components/types/type';
import React from 'react'

function getBan(users:IBanUsers[],id:string):boolean {
  return users.some((i:IBanUsers)=>i.userId == id);
}

export default getBan