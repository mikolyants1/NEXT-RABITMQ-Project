import { ILogo } from "@/components/types/type";

export function createLogo():ILogo {
  const first:string[] = ['gold','green','orange'];
  const second:string[] = ['red','blue','blueviolet'];
  const random:number = Math.floor(Math.random() * 3);
  return {
    one:first[random],
    two:second[random]
  }
}