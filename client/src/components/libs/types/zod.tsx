import { z,ZodString,ZodObject } from 'zod';

type Schema = ZodObject<{
   text:ZodString,
   description:ZodString
}>

export const schema:Schema = z.object({
   text:z.string({
     invalid_type_error:"invalid title"
   }),
   description:z.string({
     invalid_type_error:"invalid desc"
   })
})