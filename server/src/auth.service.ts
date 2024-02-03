import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersDto } from "./dto/users.dto";


@Injectable()
export class AuthService {
    constructor(private readonly service:JwtService){};

    async create({_id,name}:UsersDto):Promise<string>{
      return await this.service.sign({_id,name});
    };

    async compare(token:string,{name,_id}:UsersDto):Promise<boolean>{
      const decoded = await this.service.verify(token);
      return decoded._id == _id && decoded.name == name;
    };

    async getToken({headers}:Request):Promise<string>{
      const auth:string = headers.authorization;
      return auth.split(' ')[1];
    }
}