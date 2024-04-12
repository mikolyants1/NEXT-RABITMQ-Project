import { IStore, Null } from "@/components/libs/types/type";
import setMessToAdmin from "../../../api/mutation/mess/setMessToAdmin";
import { schema } from "@/components/libs/types/zod";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  store:IStore,
  onClose:()=>void,
  setError:Dispatch<SetStateAction<string[]>>
}

export async function setMessAtion(args:IProps,form:FormData):Promise<void> {
    const {onClose,setError,store}:IProps = args;
    const {token,id:_id,role,name:user}:IStore = store;
    const text:Null<FormDataEntryValue> = form.get("text");
    const description:Null<FormDataEntryValue> = form.get("description");
    if (!text) setError((prv:string[])=>([...prv,"text"]));
    if (!description) setError((prv:string[])=>([...prv,"description"]));
    if (text && description){
      const fields = schema.safeParse({text,description});  
      if (fields.success){
        await setMessToAdmin({
          description:`${description}`,
          text:`${text}`,
          token,_id,
          role,
          user
        });
        onClose();
      } else {
        const errors = fields.error.flatten().fieldErrors.text;
        if (errors) setError(errors);
      }
    }
}