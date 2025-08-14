// src/routes/usuarios.routes.js
const express = require("express");
const router = express.Router();
//const { v4: uuidv4 } = require('uuid');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const GRAPHQL_URL = process.env.DATACONNECT_URL;
const AUTH_TOKEN  = process.env.DATACONNECT_TOKEN;
//const GRAPHQL_URL = process.env.DATACONNECT_URL

// ---- helper: chamada GraphQL (com logs bons) ----
async function callGraphQL(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AUTH_TOKEN}`,
      "x-goog-user-project": "visitas-medicas-sql",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text(); // <- AQUI está dentro da função async
    console.error("GraphQL HTTP error:", response.status, text);
    throw new Error(`GraphQL HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
    throw new Error(data.errors[0]?.message || "Erro na API GraphQL");
  }
  return data.data;
}

// ---- DEBUG ----
router.get("/_debug-env", (req, res) => {
  res.json({
    GRAPHQL_URL,
    AUTH_TOKEN_len: AUTH_TOKEN ? AUTH_TOKEN.length : 0,
  });
});

router.post("/ping", (req, res) => {
  res.json({ ok: true, msg: "usuarios router montado" });
});

// ---- POST /usuarios/upsert : upsert ----
router.post("/upsert", async (req, res) => {
  const { usuarioId, nome } = req.body || {};
  try {
    // Upsert mutation: retorna apenas o UUID escalar
    const mutation = `mutation usuarioUpsert($usuarioId: UUID, $nome: String) {
      usuario_upsert(data: { usuarioId: $usuarioId, nome: $nome })
    }`;
    const upsertResult = await callGraphQL(mutation, { usuarioId, nome });
    const key = upsertResult?.usuario_upsert;
    // Pode vir string OU objeto; cubra os dois cenários:
    let rawId = null;
    if (typeof key === "string") {
      rawId = key;
    } else if (key && typeof key === "object") {
      rawId = key.usuarioId ?? key.id ?? key?.key?.usuarioId ?? key?.key?.id ?? null;
    }
    // Normaliza para UUID canônico
    let usuarioIdFinal = rawId;
    try {
      const { normalizeUuid } = require("../utils/uuid");
      usuarioIdFinal = normalizeUuid(rawId);
    } catch {}
    if (!usuarioIdFinal) {
      console.error("DEBUG usuario_upsert retorno:", JSON.stringify(upsertResult, null, 2));
      throw new Error("UUID não retornado ou formato desconhecido pelo upsert");
    }
    // Buscar dados completos do usuário
    const query = `query buscarUsuarioPorId($usuarioId: UUID!) {
      usuario(key: { usuarioId: $usuarioId }) {
        usuarioId
        nome
      }
    }`;
    const queryResult = await callGraphQL(query, { usuarioId: usuarioIdFinal });
    res.status(200).json(queryResult.usuario);
  } catch (err) {
    console.error("Falha no usuario_upsert:", err);
    res.status(500).json({ error: "Erro ao upsert usuário", detail: String(err) });
  }
});

// ---- POST /usuarios : insert ----
router.post("/", async (req, res) => {
  const { nome } = req.body || {};
  try {
    // 1. Insert mutation: retorna apenas o UUID escalar
    const mutation = `mutation usuarioInsert($nome: String!) {
      usuario_insert(data: { nome: $nome })
    }`;
    const insertResult = await callGraphQL(mutation, { nome });
   // if (!usuarioId) throw new Error("UUID não retornado pelo insert");
    const key = insertResult?.usuario_insert;
   // Pode vir string OU objeto; cubra os dois cenários:
   let rawId = null;
   if (typeof key === "string") {
     rawId = key; // pode ser canônico ou 32-hex
   } else if (key && typeof key === "object") {
     rawId = key.usuarioId ?? key.id ?? key?.key?.usuarioId ?? key?.key?.id ?? null;
   }
   // Normaliza para UUID canônico 8-4-4-4-12 (adiciona hífens se vier 32-hex)
   const { normalizeUuid } = require("../utils/uuid");
   const usuarioId = normalizeUuid(rawId);
   if (!usuarioId) {
     console.error("DEBUG usuario_insert retorno:", JSON.stringify(insertResult, null, 2));
     throw new Error("UUID não retornado ou formato desconhecido pelo insert");
   };
    // 2. Buscar dados completos do usuário
    const query = `query buscarUsuarioPorId($usuarioId: UUID!) {
      usuario(key: { usuarioId: $usuarioId }) {
        usuarioId
        nome
      }
    }`;
  const queryResult = await callGraphQL(query, { usuarioId: usuarioId });
    res.status(201).json(queryResult.usuario);
  } catch (err) {
    console.error("Falha no usuario_insert:", err);
    res.status(500).json({ error: "Erro ao inserir usuário", detail: String(err) });
  }
});

// GET - Lista usuários (com paginação mínima exigida)
//com variaveis
router.get("/", async (req, res) => {
  try {
    const first = Number(req.query.limit || 50); // default 50
    const query = `
      query listarUsuarios {
        usuarios {
          usuarioId
          nome
        }
      }
    `;
    const result = await callGraphQL(query);
    res.json({ total: result.usuarios?.length || 0, data: result.usuarios || [] });
  } catch (err) {
    console.error("GET /usuarios falhou:", err);
    res.status(500).json({ error: "Erro ao buscar usuários", detail: String(err) });
  }
});

// DEBUG: introspecionar o campo 'usuario' (descobrir args/tipos)
router.get("/_introspect-usuario", async (req, res) => {
  try {
    const query = `
      query {
        __type(name: "Query") {
          fields {
            name
            args {
              name
              type {
                kind
                name
                ofType { kind name ofType { kind name } }
              }
            }
          }
        }
      }
    `;
    const data = await callGraphQL(query);
    // filtra só o campo 'usuario'
    const usuarioField = (data.__type.fields || []).find(f => f.name === "usuario");
    res.json(usuarioField || { erro: "Campo 'usuario' não encontrado" });
  } catch (e) {
    res.status(500).json({ erro: String(e) });
  }
});

/*
// DELETE /usuarios/limpar-nulos
router.delete("/limpar-nulos", async (req, res) => {
  try {
    const query = `
      query listarUsuarios {
        usuarios {
          usuarioId
          nome
        }
      }
    `;
    
    const result = await callGraphQL(query);
    const nulos = (result.usuarios || []).filter(u => !u.usuarioId);

    // Se não houver nulos, retorna ok
    if (nulos.length === 0) return res.json({ ok: true, removidos: 0 });

    // Tenta excluir cada usuário nulo (se Data Connect permitir exclusão sem chave)
    let removidos = 0;
    for (const usuario of nulos) {
      // Se houver algum campo identificador além do usuarioId, use aqui
      // Caso contrário, não será possível excluir via mutation
      // Exemplo: se o nome for único, pode tentar excluir por nome
      // Aqui apenas conta os nulos
      removidos++;
    }

    res.json({ ok: true, removidos, observacao: "Usuários com usuarioId=null não podem ser excluídos via mutation padrão." });
  } catch (err) {
    console.error("Falha ao limpar usuários nulos:", err);
    res.status(500).json({ error: "Erro ao limpar usuários nulos", detail: String(err) });
  }
});
*/
//Excluir usuario por usuarioId
router.delete("/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const mutation = `
   mutation usuarioDelete($usuarioId: UUID!) {
     usuario_delete(key: { usuarioId: $usuarioId })
   }
 `;
    const result = await callGraphQL(mutation, { usuarioId });
    res.json({ ok: true, msg: "Usuário excluído com sucesso", data: result });
  } catch (err) {
    console.error("Falha ao excluir usuário:", err);
    res.status(500).json({ error: "Erro ao excluir usuário", detail: String(err) });
  }
});
//module.exports = router;

function normalizeUuid(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (uuidValidate(s)) return s;
  const hex = s.replace(/-/g, '').toLowerCase();
  if (hex.length === 32) {
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }
  return null;
}

//module.exports = { uuidv4, uuidValidate, normalizeUuid };
module.exports = router;
