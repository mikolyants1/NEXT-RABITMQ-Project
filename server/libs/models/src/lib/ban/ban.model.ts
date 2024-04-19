import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IBan } from "@server1/interfaces";
import { Document } from "mongoose";

@Schema()
export class BanModel extends Document implements IBan {
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