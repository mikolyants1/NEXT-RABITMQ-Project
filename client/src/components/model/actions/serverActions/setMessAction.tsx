import {type IStore,type Null } from "@/components/libs/types/type";
import setMessToAdmin from "../../../api/mutation/mess/setMessToAdmin";
import { schema } from "@/components/libs/types/zod";
import {type Dispatch,type SetStateAction } from "react";

interface IProps {
  store:IStore,
  onClose:()=>void,
  setError:Dispatch<SetStateAction<string[]>>
}

export async function setMessAtion(args:IProps,form:FormData):Promise<void> {
  const {onClose,setError,store}:IProps = args;
  const text = form.get("text") as string;
  const description = form.get("description") as string;
  if (!text) return setError((prv:string[])=>([...prv,"text"]));
  if (!description)return  setError((prv:string[])=>([...prv,"description"]));
  if (text && description){
    const fields = schema.safeParse({text,description});  
    if (fields.success){
      await setMessToAdmin({
        description:`${description}`,
        text:`${text}`,
        token:store.token,
        _id:store.id,
        role:store.role,
        user:store.name
      });
      return onClose();
    } 
    const errors = fields.error.flatten().fieldErrors.text;
    if (errors) return setError(errors);
  }
}