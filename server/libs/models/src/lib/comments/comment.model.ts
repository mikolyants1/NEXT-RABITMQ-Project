import { Prop, Schema } from "@nestjs/mongoose";
import { IComment } from "@server1/interfaces";
import { Document } from "mongoose";

@Schema()
export class Comment extends Document implements IComment {
    @Prop({
      type:String,
      required:true
    })
    text:string;

    @Prop({
      type:String,
      required:true
    })
    userId:string;
    
    @Prop({
      type:Number,
      required:true
    })
    time:number;

    @Prop({
      type:String,
      required:true,
    })
    username:string;
};
