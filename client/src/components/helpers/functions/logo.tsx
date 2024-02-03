import { ILogo } from "@/components/types/type";

export function createLogo():ILogo{
  const first:string[] = ['gold','green','orange'];
  const second:string[] = ['red','blue','blueviolet'];
  return {
    one:first[Math.floor(Math.random()*3)],
    two:second[Math.floor(Math.random()*3)]
  }
}