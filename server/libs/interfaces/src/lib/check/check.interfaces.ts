
import {Roles} from '@server1/enums';

export interface ICheck {
  _id?:string,
  token:string,
  role:Roles | string,
}