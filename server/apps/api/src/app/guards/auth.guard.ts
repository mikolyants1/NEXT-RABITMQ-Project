import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "express";
import { Model } from "mongoose";
import {Users} from '@server1/models';
import { UsersDto } from "@server1/apidocs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(Users.name)
    private readonly Base:Model<Users>,
    private readonly authService:AuthService
  ){}
    
   async canActivate(ctx: ExecutionContext):Promise<boolean> {
     try {
       const req:Request = ctx.switchToHttp().getRequest();
       const token:string = this.authService.getToken(req);
       const userId = req.headers["x-user"] as string;
       const user:UsersDto = await this.Base.findById(userId);
       if (!token) throw new UnauthorizedException('Bearer not found');
       return this.authService.compare(token,user);
     } catch (e) {
       if (e instanceof Error){
         throw new UnauthorizedException(e.message);
       }
     }
   }
}