import { z } from "zod";

export const usuarioSchema = z.object({
  usuario: z.string().min(3, "Usuário deve ter pelo menos 3 caracteres"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type UsuarioInput = z.infer<typeof usuarioSchema>;

export const trocarSenhaSchema = z.object({
  senhaAtual: z.string().min(1, "Informe a senha atual"),
  novaSenha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres"),
});

export type TrocarSenhaInput = z.infer<typeof trocarSenhaSchema>;
