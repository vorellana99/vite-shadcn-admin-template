import { z } from "zod"

export const formSchema = z.object({})

export const formDefaults: z.infer<typeof formSchema> = {}
