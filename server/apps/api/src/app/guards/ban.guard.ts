import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BanDto } from "@server1/apidocs";
import { BanModel } from "@server1/models";
import { Request } from "express";
import { Model } from "mongoose";

@Injectable()
export class BanGuard implements CanActivate {
    constructor(
      @InjectModel(BanModel.name)
      private readonly base:Model<BanModel>
    ){}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
      const req:Request = ctx.switchToHttp().getRequest();
      const banUsers:BanDto[] = await this.base.find();
      const id = req.query.userId as string || "";
      return banUsers.every((i:BanDto)=>i.userId !== id);
    }
}