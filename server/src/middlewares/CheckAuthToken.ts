import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { Users } from "src/database/user.mongo";
import { UsersDto } from "src/dto/users.dto";

export class CheckAuthToken implements NestMiddleware {
    constructor(private readonly auth:AuthService,
    @InjectModel(Users.name) private readonly Base:Model<Users>){};

    async use(req:Request, res:Response, next:NextFunction) {
      const id:string = req.params.id;
      const user:UsersDto|undefined = await this.Base.findById(id);
      if (!user) throw new UnauthorizedException();
      const token:string = await this.auth.getToken(req);
      const isAuth:boolean = await this.auth.compare(token,user);
      if (!isAuth) throw new UnauthorizedException();
      next();
    };
}