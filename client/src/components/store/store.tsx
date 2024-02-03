import {create} from 'zustand'
import {persist,devtools} from 'zustand/middleware';
import { IStore } from '../types/type';


export const useStore = create<IStore>()(
persist(devtools((set)=>({
  name:"",
  id:"",
  token:"",
  setId:(id:string):void=>{
    set({id})
  },
  setName:(name:string):void=>{
    set({name});
  },
  setToken:(token:string)=>{
    set({token});
  }
})),{version:1,name:'films'}))