import { z } from "zod";

export const productDetailsSchema = z.object({
  id: z.string(),
  store: z.string(),
  name: z.string(),
  description: z.string(),
  imageSrc: z.array(z.string()),
  price: z.number(),
});

export type IProductDetailsResponseData = z.infer<typeof productDetailsSchema>;
