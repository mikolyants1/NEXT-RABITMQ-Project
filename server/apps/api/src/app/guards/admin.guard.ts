import { CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly reflector:Reflector){}
    
    canActivate(ctx: ExecutionContext): boolean {
      const {headers}:Request = ctx.getArgByIndex(0);
      const roles:string[] = this.reflector
      .getAllAndOverride<string[]>("roles",[
        ctx.getHandler(),
        ctx.getClass()
      ]);
      if (!roles) return true;
      return roles.some((i:string)=>i == headers.role);
    }
}
