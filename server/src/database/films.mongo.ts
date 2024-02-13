import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
