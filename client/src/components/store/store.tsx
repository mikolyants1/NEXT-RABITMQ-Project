import {create} from 'zustand'
import {persist,devtools} from 'zustand/middleware';
import { IStore } from '../types/type';


export const useStore = create<IStore>()(
persist(devtools((set)=>({
  name:"",
  id:"",
  setId:(id:string):void=>{
    set({id})
  },
  setName:(name:string):void=>{
    set({name});
  }
})),{version:1,name:'films'}))