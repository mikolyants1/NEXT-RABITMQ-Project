import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IMess } from "@server1/interfaces";
import { Document } from "mongoose";

@Schema()
export class Mess extends Document implements IMess {
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