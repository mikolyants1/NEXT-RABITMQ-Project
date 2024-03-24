import { z } from 'zod';

export const schema = z.object({
   text:z.string({
      invalid_type_error:"invalid title"
   }),
   description:z.string({
      invalid_type_error:"invalid desc"
   })
})