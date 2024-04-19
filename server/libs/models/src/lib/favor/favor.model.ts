import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { FavorFilm } from "./favorFilm.model";
import { IFavor } from "@server1/interfaces";

@Schema()
export class FavorModel extends Document implements IFavor {
    @Prop({
      type:String,
      required:true
    })
    userId:string;

    @Prop({
      type:[FavorFilm],
      required:true
    })
    films:[FavorFilm];
}

export const FavorShema = SchemaFactory.createForClass(FavorModel);