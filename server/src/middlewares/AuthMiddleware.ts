import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { Users } from "src/database/user.mongo";
import { UsersDto } from "src/dto/users.dto";

export class AuthMiddleware implements NestMiddleware {
    constructor(
      @InjectModel(Users.name) private readonly Base:Model<Users>,
      private readonly auth:AuthService
    ){};

    async use(req:Request, res:Response, next:NextFunction) {
      const id:string = `${req.query.userId}`;
      const user:UsersDto|undefined = await this.Base.findById(id);
      if (!user) throw new UnauthorizedException();
      const token:string = this.auth.getToken(req);
      const isAuth:boolean = this.auth.compare(token,user);
      if (!isAuth) throw new UnauthorizedException();
      next();
    };
}