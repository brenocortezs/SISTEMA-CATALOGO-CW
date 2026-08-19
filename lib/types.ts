import type { Database } from "@/lib/database.types";

export type Relogio = Database["public"]["Tables"]["Relogio"]["Row"];
export type FotoRelogio = Database["public"]["Tables"]["FotoRelogio"]["Row"];
export type Acessorio = Database["public"]["Tables"]["Acessorio"]["Row"];
export type FotoAcessorio = Database["public"]["Tables"]["FotoAcessorio"]["Row"];
export type Depoimento = Database["public"]["Tables"]["Depoimento"]["Row"];

export type Condicao = Database["public"]["Enums"]["Condicao"];
export type StatusRelogio = Database["public"]["Enums"]["StatusRelogio"];
export type StatusAcessorio = Database["public"]["Enums"]["StatusAcessorio"];
export type TipoAcessorio = Database["public"]["Enums"]["TipoAcessorio"];

export type RelogioComFotos = Relogio & { fotos: FotoRelogio[] };
export type AcessorioComFotos = Acessorio & { fotos: FotoAcessorio[] };
