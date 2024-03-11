import {create} from 'zustand'
import {persist,devtools} from 'zustand/middleware';
import { IStore } from '../types/type';
import {immer} from 'zustand/middleware/immer'

export const useStore = create<IStore>()(
persist(devtools(immer((set)=>({
  name:"",
  id:"",
  token:"",
  role:"",
  setId:(id:string)=>set((state:IStore):void=>{
     state.id = id;
  }),
  setName:(name:string):void=>{
    set({name});
  },
  setToken:(token:string):void=>{
    set({token});
  },
  setRole:(role:string):void=>{
    set({role})
  }
}))),{version:1,name:'films'}))