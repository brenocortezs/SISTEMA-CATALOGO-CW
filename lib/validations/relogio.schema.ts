import { z } from "zod";

export const fotoSchema = z.object({
  url: z.string().url(),
  ordem: z.number().int().min(0),
});

export const relogioSchema = z.object({
  slug: z.string().min(1).optional(),
  marca: z.string().min(1, "Marca é obrigatória"),
  modelo: z.string().min(1, "Modelo é obrigatório"),
  referencia: z.string().min(1, "Referência é obrigatória"),
  preco: z.number().positive("Preço deve ser maior que zero"),
  condicao: z.enum(["NOVO", "SEMINOVO"]),
  diametroCaixa: z.string().optional().nullable(),
  movimento: z.string().optional().nullable(),
  pulseira: z.string().optional().nullable(),
  vidro: z.string().optional().nullable(),
  materialCaixa: z.string().optional().nullable(),
  anoEstado: z.string().optional().nullable(),
  feminino: z.boolean().default(false),
  destaque: z.boolean().default(false),
  status: z.enum(["DISPONIVEL", "RESERVADO", "VENDIDO"]).default("DISPONIVEL"),
  fotos: z.array(fotoSchema).default([]),
});

export type RelogioInput = z.infer<typeof relogioSchema>;
