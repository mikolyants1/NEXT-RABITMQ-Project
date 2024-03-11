import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersDto } from "../dto/users.dto";


@Injectable()
export class AuthService {
    constructor(private readonly service:JwtService){};

    create({_id,name}:UsersDto):string{
      return this.service.sign({_id,name});
    };

    compare(token:string,{name,_id}:UsersDto):boolean{
      const decoded:Omit<UsersDto,
      "films" | "pass"> = this.service.verify(token);
      return decoded._id == _id && decoded.name == name;
    };

     getToken({headers}:Request):string{
      const auth:string = headers.authorization;
      return auth.includes('Bearer') ? auth.split(' ')[1] : "";
    }
}