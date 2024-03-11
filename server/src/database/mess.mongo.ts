import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Mess extends Document {
    @Prop({
      type:String,
      required:true
    })
    text:string;

    @Prop({
     type:String,
     required:true
    })
    description:string;

    @Prop({
      type:String,
      required:true
    })
    user:string;
    
    @Prop({
      type:Number,
      required:true
    })
    time:number;
}

export const MessSchema = SchemaFactory.createForClass(Mess);