import { Injectable } from '@nestjs/common';
import {BanUser,GetBanUsers} from '@server1/contracts';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class BanService {
  private readonly KEY = "ban_users";

  constructor(
    @InjectRedis()
    private readonly redis:Redis
  ){}

  async banUser(userId:string):Promise<BanUser.Response>{
    await this.redis.lpush(this.KEY,userId);
    const users = await this.redis.lrange(this.KEY,0,-1);
    return {users};
  }

  async unBabUser(userId:string):Promise<BanUser.Response>{
    await this.redis.lrem(this.KEY,1,userId);
    const users = await this.redis.lrange(this.KEY,0,-1);
    return {users};
  }

  async getAllUsers():Promise<GetBanUsers.Response>{
    const users:string[] = await this.redis.lrange(this.KEY,0,-1);
    return {users};
  }
}
