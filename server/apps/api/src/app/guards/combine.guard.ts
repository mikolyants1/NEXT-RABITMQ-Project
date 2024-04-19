import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AdminGuard } from "./admin.guard";
import { AuthGuard } from "./auth.guard";

export const Auth = (arg:string[]) => applyDecorators(
    SetMetadata("roles",arg),
    UseGuards(AuthGuard),
    UseGuards(AdminGuard)
);
