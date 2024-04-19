import { Prop, Schema } from "@nestjs/mongoose";
import { IFavorFilm } from "@server1/interfaces";
import { Document } from "mongoose";

@Schema()
export class FavorFilm extends Document implements IFavorFilm {
    @Prop({
      type:String,
      required:true,
    })
    Title:string;
    
    @Prop({
      type:String,
      required:true
    })
    filmId:string;

    @Prop({
      type:String,
      required:true
    })
    Released:string;
    
    @Prop({
     type:String,
      required:true
    })
    Poster:string;

}
    