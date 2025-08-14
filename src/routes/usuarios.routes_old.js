const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

console.log("[usuarios.routes] arquivo carregado");
router.use((req, _res, next) => {
  console.log("[usuarios.routes] recebeu:", req.method, req.originalUrl);
  next();
});


const GRAPHQL_URL = process.env.DATACONNECT_URL;
const AUTH_TOKEN = process.env.DATACONNECT_TOKEN;

router.post("/ping", (req, res) => {
  res.json({ ok: true, msg: "usuarios router montado" });
});


// Função para chamar o GraphQL
async function callGraphQL(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error("GraphQL Errors:", data.errors);
    throw new Error("Erro na API GraphQL");
  }
  return data.data;
}

/*
// GET - Lista todos os usuários
router.get("/", async (req, res) => {
  try {
    const query = `
      query {
        usuario {
          id
          nome
        }
      }
    `;
    const result = await callGraphQL(query);
    res.json(result.usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});
*/

// POST - Inserir usuário
router.post("/", async (req, res) => {
  const { nome } = req.body;
  try {
    const mutation = `
      mutation usuarioInsert($nome: String!) {
        usuario_insert(data: { nome: $nome })
      }
    `;
    const result = await callGraphQL(mutation, { nome });
    res.status(201).json(result.usuario_insert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir usuário" });
  }
});

/*
// PUT - Atualizar usuário
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const mutation = `
      mutation usuarioUpsert($usuarioId: UUID!, $nome: String!) {
        usuario_upsert(data: { id: $usuarioId, nome: $nome })
      }
    `;
    const result = await callGraphQL(mutation, { usuarioId: id, nome });
    res.json(result.usuario_upsert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// DELETE - Deletar usuário
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mutation = `
      mutation usuarioDelete($usuarioId: UUID!) {
        usuario_delete(key: { id: $usuarioId })
      }
    `;
    const result = await callGraphQL(mutation, { usuarioId: id });
    res.json(result.usuario_delete);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});
*/

module.exports = router;
