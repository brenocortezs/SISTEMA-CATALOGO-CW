import { z } from "zod";

export const depoimentoSchema = z.object({
  imagem: z.string().url("Envie o print do depoimento"),
});

export type DepoimentoInput = z.infer<typeof depoimentoSchema>;
