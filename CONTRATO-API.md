
# Contrato Front ↔ API Java (em uso na integração com a API publicada)

Os documentos do Plano Mestre e do roteiro divergem em alguns pontos. O front isola tudo em `src/services/` e `src/types/`;
quando o Java for fechado, só esses arquivos mudam. Prefixo configurável em `VITE_API_PREFIX` (padrão `/api`).

| # | Endpoint usado pelo front | Uso | Status |
|---|---------------------------|-----|--------|
| 1 | `POST /api/usuarios` `{nome, email?}` → `{id, nome}` | Cadastro mínimo (ESCRITA real) | confirmar |
| 2 | `POST /api/usuarios/{id}/consultas` `{pergunta, uf, etapa}` | Enviar dúvida (ESCRITA real) | confirmar formato da resposta |
| 3 | `GET /api/usuarios/{id}/consultas` | Histórico | confirmar |
| 4 | `GET /api/orientacoes` | FAQ (conteúdo jurídico vem do Oracle) | confirmar campos |
| 5 | `GET /api/etapas` | Jornada | confirmar `codigo` das etapas |
| 6 | `GET/POST /api/usuarios/{id}/etapas` `{etapaId, status}` | Progresso persistido | confirmar |
| 7 | `GET /api/saude` | Aviso de servidor fora do ar (aceita 404 como "vivo", 5xx como "fora") | confirmar (ex.: Spring Actuator) |

## Decisões que precisam do Jonatan

1. **Prefixo**: `/api` (Plano Mestre) ou sem prefixo (roteiro)?
2. **Resposta da consulta**: o front espera `{consultaId, status, categoria, resposta{titulo, conteudo, cuidados[], baseLegal[], dataRevisao}, proximaEtapa, opcoes[]}`.
   Se o Java devolver só `orientacaoId`, o front precisará de `GET /orientacoes/{id}` (ajuste em `consultaService.ts`).
3. **Códigos de etapa** enviados em `etapa`: `PESQUISA_IMOVEL, ANALISE_DOCUMENTAL, NEGOCIACAO_CONTRATO, ESCRITURA, ITBI_TRIBUTOS, REGISTRO_IMOVEL` (ver `src/data/opcoes.ts`).
4. **Erros de validação**: o front aceita `{mensagem}`, `{message}` ou mapa `campo → mensagem`.
5. **CORS**: liberar a origem da Vercel e `localhost:5173`; métodos GET/POST/PUT/DELETE e cabeçalho `Content-Type`.
6. **Regra**: a decisão de mostrar resposta/esclarecimento/encaminhamento é do Java. O front só reage à presença de `resposta` ou `opcoes`.

## Acréscimos por causa do Telegram (o front web não muda)

- `tb_usuario`: colunas `ds_canal` (WEB/TELEGRAM) e `cd_id_externo` (chat_id), UNIQUE (canal, id externo). **Responsável: Vinícius (Oracle) e Jonatan (Java).**
- `POST /api/telegram/webhook`: recebe a mensagem do bot (cabeçalho `X-Telegram-Bot-Api-Secret-Token` obrigatório) e reaproveita o fluxo de `POST /api/usuarios/{id}/consultas`.

Para testar sem o Java: `node mock/mock-api.mjs` (conteúdo de EXEMPLO, não jurídico).
