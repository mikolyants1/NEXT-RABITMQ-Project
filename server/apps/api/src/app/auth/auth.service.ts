  import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthUser, UsersDto } from "@server1/apidocs";
import { Request } from "express";

@Injectable()
export class AuthService {
  constructor(private readonly service:JwtService){}

  create({_id,name}:UsersDto):string{
    return this.service.sign({_id,name});
  }

  compare(token:string,{name,_id}:UsersDto):boolean{
    const decoded:AuthUser = this.service.verify(token);
    return decoded._id == _id && decoded.name == name;
  }

  getToken({headers}:Request):string{
    const auth = headers.Authorization as string;
    const valid = auth.includes("Bearer");
    return valid ? auth.split(' ')[1] : "";
  }
}