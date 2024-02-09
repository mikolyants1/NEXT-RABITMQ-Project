import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Films extends Document {
   @Prop({
    type:String,
    required:true,
   })
   Title:string;

   @Prop({
    type:String,
    required:true
   })
   
   @Prop({
    type:String,
    required:true
   })
   Actors:string;

   @Prop({
    type:String,
    required:true
   })
   imdbID:string;

   @Prop({
    type:String,
    required:true
   })
   Director:string;

   @Prop({
    type:String,
    required:true
   })
   Poster:string;

   @Prop({
    type:String,
    required:true
   })
   Plot:string;
}

@Schema()
export class Users extends Document {
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
     type:[Films],
     required:true
    })
    films:[Films]
}

export const UserSchema = SchemaFactory.createForClass(Users);