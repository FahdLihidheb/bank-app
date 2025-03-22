import { z } from "zod";

export const AccountSchema = z.object({
    id: z.string(),
    name: z.string(),
    currency: z.string(),
    balance: z.number(),
});

export type Account = z.infer<typeof AccountSchema>;