import { Invalid } from "@/components/types/type";

export function checkInvalid(err:string[],text:string):Invalid{
  const invalid:boolean = err.some((i:string)=>i == text);
  const color:string = invalid ? "red" : "white";
  return {
     invalid,
     color
  }
}