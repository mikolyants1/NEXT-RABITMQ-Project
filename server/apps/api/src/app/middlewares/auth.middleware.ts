import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "@server1/models";
import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { AuthService } from "../auth/auth.service";
import { UsersDto } from "@server1/apidocs";

export class AuthMiddleware implements NestMiddleware {
    constructor(
      @InjectModel(Users.name)
      private readonly Base:Model<Users>,
      private readonly auth:AuthService
    ){}

    async use(req:Request, res:Response, next:NextFunction) {
      const id = req.query.userId as string || "";
      const user:UsersDto = await this.Base.findById(id);
      if (!user) throw new UnauthorizedException();
      const token:string = this.auth.getToken(req);
      const isAuth:boolean = this.auth.compare(token,user);
      if (!isAuth) throw new UnauthorizedException();
      next();
    }
}