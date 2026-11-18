import type { Usuario } from '../types/usuario'
import { PREFIXO_API, requisicao } from './api'

// Escrita real #1: cadastro mínimo. Contrato: POST /api/usuarios { nome, email? } -> { id, nome }
export function cadastrarUsuario(dados: { nome: string; email?: string }) {
  const corpo = dados.email ? dados : { nome: dados.nome }
  return requisicao<Usuario>(`${PREFIXO_API}/usuarios`, { metodo: 'POST', corpo })
}
