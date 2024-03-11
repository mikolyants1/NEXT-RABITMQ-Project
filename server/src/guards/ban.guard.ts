import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { BanService } from "src/ban/ban.service";

@Injectable()
export class BanGuard implements CanActivate {
    constructor(private readonly service:BanService){};

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
      const req:Request = ctx.switchToHttp().getRequest();
      const id:string = `${req.query.userId}`;
      return this.service.checkUser(id);
    };
}