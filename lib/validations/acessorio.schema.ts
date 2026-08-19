import { z } from "zod";
import { fotoSchema } from "./relogio.schema";

export const acessorioSchema = z.object({
  slug: z.string().min(1).optional(),
  tipo: z.enum(["PORTA_RELOGIO", "PULSEIRA", "MALETA"]),
  nome: z.string().min(1, "Nome é obrigatório"),
  preco: z.number().positive("Preço deve ser maior que zero"),
  status: z.enum(["DISPONIVEL", "VENDIDO"]).default("DISPONIVEL"),
  fotos: z.array(fotoSchema).default([]),
});

export type AcessorioInput = z.infer<typeof acessorioSchema>;
