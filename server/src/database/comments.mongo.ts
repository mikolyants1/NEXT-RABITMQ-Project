import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Comment } from "./comment.mongo";

@Schema()
export class Comments extends Document {
   @Prop({
    type:String,
    required:true
   })
   name:string;

   @Prop({
    type:String,
    required:true
   })
   filmID:string;

   @Prop({
     type:[Comment],
     required:true,
   })
   comm:[Comment]
};

export const CommentsSchema = SchemaFactory.createForClass(Comments);