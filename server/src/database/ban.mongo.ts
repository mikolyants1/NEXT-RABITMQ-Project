import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class BanModel extends Document {
    @Prop({
      type:String
    })
    userId:string;

    @Prop({
      type:String
    })
    banTime:string;
}

export const BanSchema = SchemaFactory.createForClass(BanModel);