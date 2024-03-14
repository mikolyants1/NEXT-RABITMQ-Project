import { IBanUsers } from '@/components/types/type';

function getBan(users:IBanUsers[],id:string):boolean {
  return users.some((i:IBanUsers)=>i.userId == id);
}

export default getBan