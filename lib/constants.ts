export const WHATSAPP_NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "5584994113818";
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/";
export const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@conceptwatch";
export const GRUPO_VIP_URL =
  process.env.NEXT_PUBLIC_GRUPO_VIP_URL || "https://chat.whatsapp.com/EAgngEFqMorFDfSqzRXrak";

export const MENSAGEM_PADRAO_BIO = "Olá! Vim através do site da Concept Watch.";
export const MENSAGEM_NAO_ENCONTROU =
  "Olá! Estou procurando um relógio específico que não vi disponível no catálogo.";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const TEXTO_PARCELAMENTO = "Aceitamos parcelamento em até 12x com juros";

export const CONDICAO_LABEL: Record<string, string> = {
  NOVO: "Novo",
  SEMINOVO: "Seminovo",
};

export const TIPO_ACESSORIO_LABEL: Record<string, string> = {
  PORTA_RELOGIO: "Porta-relógio",
  PULSEIRA: "Pulseira",
  MALETA: "Maleta",
};

export const STATUS_RELOGIO_LABEL: Record<string, string> = {
  DISPONIVEL: "Disponível",
  RESERVADO: "Reservado",
  VENDIDO: "Vendido",
};

export const STATUS_ACESSORIO_LABEL: Record<string, string> = {
  DISPONIVEL: "Disponível",
  VENDIDO: "Vendido",
};
