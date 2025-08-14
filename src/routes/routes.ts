import { Router } from "express";
import { GraphQLClient } from 'graphql-request';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();
const client = new GraphQLClient('http://localhost:4000/graphql');

// Caminhos corrigidos para os arquivos .gql
//const LISTAR_USUARIOS = readFileSync(join(__dirname, '../../dataconnect/connector/queries.gql'), 'utf8');
//const CRIAR_USUARIO = readFileSync(join(__dirname, '../../dataconnect/connector/mutations.gql'), 'utf8');


// ...existing code...
export default router;