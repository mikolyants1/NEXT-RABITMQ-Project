import { IComment } from "./comment.interfaces";

export interface IComments {
  _id?:string,
  name:string,
  filmID:string,
  comm:IComment[]
}