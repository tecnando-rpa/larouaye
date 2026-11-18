// Contrato com a API Java (ver CONTRATO-API.md).
export interface BaseLegal {
  norma: string
  referencia?: string
  url?: string
}

// Orientação jurídica aprovada, vinda do catálogo no Oracle (o React nunca escreve esse texto).
export interface Orientacao {
  id: number
  titulo: string
  categoria?: string
  perguntaRelacionada?: string
  conteudo: string
  cuidados?: string[]
  baseLegal?: BaseLegal[]
  dataRevisao?: string
}

export interface Categoria {
  id: number
  nome: string
}
