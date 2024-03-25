import { IStore, Null } from "@/components/types/type";
import { schema } from "../compare/zodValid";
import setMessToAdmin from "../../api/mutation/mess/setMessToAdmin";

interface IProps {
    store:IStore,
    onClose:()=>void
}

export async function setMessAtion({store,onClose}:IProps,formData:FormData) {
    const {token,id:_id,role,name:user}:IStore = store;
    const text:Null<FormDataEntryValue> = formData.get("text");
    const description:Null<FormDataEntryValue> = formData.get("description");
    const fields = schema.safeParse({text,description});
  
    if (!fields.success){
     console.log(fields.error.flatten().fieldErrors);
     return;
    };

    await setMessToAdmin({
      description:`${description}`,
      text:`${text}`,
      token,_id,
      role,
      user
    });
    onClose();
}