import { Prop, Schema } from "@nestjs/mongoose";
import {IFilms} from '@server1/interfaces';
import { Document } from "mongoose";

@Schema()
export class Films extends Document implements IFilms {
   @Prop({
    type:String,
    required:true,
   })
   Title:string;

   @Prop({
    type:String,
    required:true
   })
   Released:string;

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
