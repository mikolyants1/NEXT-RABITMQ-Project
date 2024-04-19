import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpError {
  private readonly error:string;
  constructor(error:string){
   this.error = error;
  }
  throwError(){
    if (this.error.includes("not found")){
      throw new HttpException("not found",HttpStatus.NOT_FOUND);
    }
    if (this.error.includes("bad request")){
      throw new HttpException("bad request",HttpStatus.BAD_REQUEST);
    }
    if (this.error.includes("Unauthorized")){
      throw new HttpException("Unauthorized",HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException("server error",HttpStatus.INTERNAL_SERVER_ERROR);
  }
}