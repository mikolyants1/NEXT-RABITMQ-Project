import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Films } from "./films.model";
import { Roles } from "@server1/enums";
import { IUsers } from "@server1/interfaces";

@Schema()
export class Users extends Document implements IUsers {
    @Prop({
     type:String,
     required:true
    })
    name:string;
    
    @Prop({
     type:String,
     required:true
    })
    pass:string;

    @Prop({
      type:String,
      required:true
    })
    role:Roles;
    
    @Prop({
     type:[Films],
     required:true
    })
    films:[Films]
}

export const UserSchema = SchemaFactory.createForClass(Users);