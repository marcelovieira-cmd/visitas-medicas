import fetch from 'node-fetch'; // Corrected import statement
import { Router } from 'express';

const router = Router();

// Exemplo de rota para inserir usuário via Data Connect
router.post('/inserir', async (req, res) => {
  const { nome } = req.body;
  const query = `mutation usuarioInsert($nome: String!) { usuario_insert(data: { nome: $nome }) }`;
  const variables = { nome };

  try {
  const response = await fetch('http://127.0.0.1:9399/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir usuário', details: error });
  }
});

// Listar todos os usuários
router.get('/listar', async (req, res) => {
  const query = `query { Usuario { usuarioId nome } }`;
  try {
  const response = await fetch('http://127.0.0.1:9399/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários', details: error });
  }
});

// Buscar usuário por ID
router.get('/buscar/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const query = `query ($usuarioId: UUID!) { Usuario_by_pk(usuarioId: $usuarioId) { usuarioId nome } }`;
  const variables = { usuarioId };
  try {
  const response = await fetch('http://127.0.0.1:9399/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error });
  }
});

// Atualizar usuário
router.put('/atualizar/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const { nome } = req.body;
  const query = `mutation usuarioUpsert($usuarioId: UUID!, $nome: String!) { usuario_upsert(data: { id: $usuarioId, nome: $nome }) }`;
  const variables = { usuarioId, nome };
  try {
  const response = await fetch('http://127.0.0.1:9399/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error });
  }
});

// Deletar usuário
router.delete('/deletar/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const query = `mutation usuarioDelete($usuarioId: UUID!) { usuario_delete(key: { id: $usuarioId }) }`;
  const variables = { usuarioId };
  try {
  const response = await fetch('http://127.0.0.1:9399/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: error });
  }
});

export default router;