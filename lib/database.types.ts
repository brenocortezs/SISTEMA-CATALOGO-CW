export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      Acessorio: {
        Row: {
          atualizadoEm: string
          criadoEm: string
          descricao: string | null
          id: string
          nome: string
          preco: number
          slug: string
          status: Database["public"]["Enums"]["StatusAcessorio"]
          tipo: Database["public"]["Enums"]["TipoAcessorio"]
        }
        Insert: {
          atualizadoEm: string
          criadoEm?: string
          descricao?: string | null
          id: string
          nome: string
          preco: number
          slug: string
          status?: Database["public"]["Enums"]["StatusAcessorio"]
          tipo: Database["public"]["Enums"]["TipoAcessorio"]
        }
        Update: {
          atualizadoEm?: string
          criadoEm?: string
          descricao?: string | null
          id?: string
          nome?: string
          preco?: number
          slug?: string
          status?: Database["public"]["Enums"]["StatusAcessorio"]
          tipo?: Database["public"]["Enums"]["TipoAcessorio"]
        }
        Relationships: []
      }
      Depoimento: {
        Row: {
          criadoEm: string
          id: string
          imagem: string | null
          nomeCliente: string | null
          texto: string | null
        }
        Insert: {
          criadoEm?: string
          id: string
          imagem?: string | null
          nomeCliente?: string | null
          texto?: string | null
        }
        Update: {
          criadoEm?: string
          id?: string
          imagem?: string | null
          nomeCliente?: string | null
          texto?: string | null
        }
        Relationships: []
      }
      FotoAcessorio: {
        Row: {
          acessorioId: string
          id: string
          ordem: number
          url: string
        }
        Insert: {
          acessorioId: string
          id: string
          ordem?: number
          url: string
        }
        Update: {
          acessorioId?: string
          id?: string
          ordem?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "FotoAcessorio_acessorioId_fkey"
            columns: ["acessorioId"]
            isOneToOne: false
            referencedRelation: "Acessorio"
            referencedColumns: ["id"]
          },
        ]
      }
      FotoRelogio: {
        Row: {
          id: string
          ordem: number
          relogioId: string
          url: string
        }
        Insert: {
          id: string
          ordem?: number
          relogioId: string
          url: string
        }
        Update: {
          id?: string
          ordem?: number
          relogioId?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "FotoRelogio_relogioId_fkey"
            columns: ["relogioId"]
            isOneToOne: false
            referencedRelation: "Relogio"
            referencedColumns: ["id"]
          },
        ]
      }
      Usuario: {
        Row: {
          atualizadoEm: string
          criadoEm: string
          id: string
          papel: Database["public"]["Enums"]["PapelUsuario"]
          senhaHash: string
          usuario: string
        }
        Insert: {
          atualizadoEm?: string
          criadoEm?: string
          id: string
          papel?: Database["public"]["Enums"]["PapelUsuario"]
          senhaHash: string
          usuario: string
        }
        Update: {
          atualizadoEm?: string
          criadoEm?: string
          id?: string
          papel?: Database["public"]["Enums"]["PapelUsuario"]
          senhaHash?: string
          usuario?: string
        }
        Relationships: []
      }
      Relogio: {
        Row: {
          anoEstado: string | null
          atualizadoEm: string
          condicao: Database["public"]["Enums"]["Condicao"]
          criadoEm: string
          destaque: boolean
          diametroCaixa: string | null
          feminino: boolean
          id: string
          marca: string
          materialCaixa: string | null
          modelo: string
          movimento: string | null
          preco: number
          pulseira: string | null
          referencia: string
          slug: string
          status: Database["public"]["Enums"]["StatusRelogio"]
          vidro: string | null
        }
        Insert: {
          anoEstado?: string | null
          atualizadoEm: string
          condicao: Database["public"]["Enums"]["Condicao"]
          criadoEm?: string
          destaque?: boolean
          diametroCaixa?: string | null
          feminino?: boolean
          id: string
          marca: string
          materialCaixa?: string | null
          modelo: string
          movimento?: string | null
          preco: number
          pulseira?: string | null
          referencia: string
          slug: string
          status?: Database["public"]["Enums"]["StatusRelogio"]
          vidro?: string | null
        }
        Update: {
          anoEstado?: string | null
          atualizadoEm?: string
          condicao?: Database["public"]["Enums"]["Condicao"]
          criadoEm?: string
          destaque?: boolean
          diametroCaixa?: string | null
          feminino?: boolean
          id?: string
          marca?: string
          materialCaixa?: string | null
          modelo?: string
          movimento?: string | null
          preco?: number
          pulseira?: string | null
          referencia?: string
          slug?: string
          status?: Database["public"]["Enums"]["StatusRelogio"]
          vidro?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Condicao: "NOVO" | "SEMINOVO"
      PapelUsuario: "SUPER_ADMIN" | "ADMIN"
      StatusAcessorio: "DISPONIVEL" | "VENDIDO"
      StatusRelogio: "DISPONIVEL" | "RESERVADO" | "VENDIDO"
      TipoAcessorio: "PORTA_RELOGIO" | "PULSEIRA" | "MALETA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database["public"]

export type Tables<
  TableName extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][TableName]["Row"]

export type TablesInsert<
  TableName extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][TableName]["Insert"]

export type TablesUpdate<
  TableName extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][TableName]["Update"]

export type Enums<EnumName extends keyof DefaultSchema["Enums"]> =
  DefaultSchema["Enums"][EnumName]
