import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface BuscarUsuarioPorIdData {
  usuario?: {
    usuarioId?: UUIDString | null;
    nome?: string | null;
  };
}

export interface BuscarUsuarioPorIdVariables {
  id: UUIDString;
}

export interface Funcao_Key {
  id: UUIDString;
  __typename?: 'Funcao_Key';
}

export interface FuncoesUsuario_Key {
  id: UUIDString;
  __typename?: 'FuncoesUsuario_Key';
}

export interface ListarUsuariosData {
  usuarios: ({
    usuarioId?: UUIDString | null;
    nome?: string | null;
  })[];
}

export interface UsuarioDeleteData {
  usuario_delete?: Usuario_Key | null;
}

export interface UsuarioDeleteVariables {
  usuarioId: UUIDString;
}

export interface UsuarioInsertData {
  usuario_insert: Usuario_Key;
}

export interface UsuarioInsertVariables {
  nome: string;
}

export interface UsuarioUpsertData {
  usuario_upsert: Usuario_Key;
}

export interface UsuarioUpsertVariables {
  usuarioId: UUIDString;
  nome: string;
}

export interface Usuario_Key {
  id: UUIDString;
  __typename?: 'Usuario_Key';
}

interface UsuarioInsertRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UsuarioInsertVariables): MutationRef<UsuarioInsertData, UsuarioInsertVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UsuarioInsertVariables): MutationRef<UsuarioInsertData, UsuarioInsertVariables>;
  operationName: string;
}
export const usuarioInsertRef: UsuarioInsertRef;

export function usuarioInsert(vars: UsuarioInsertVariables): MutationPromise<UsuarioInsertData, UsuarioInsertVariables>;
export function usuarioInsert(dc: DataConnect, vars: UsuarioInsertVariables): MutationPromise<UsuarioInsertData, UsuarioInsertVariables>;

interface UsuarioUpsertRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UsuarioUpsertVariables): MutationRef<UsuarioUpsertData, UsuarioUpsertVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UsuarioUpsertVariables): MutationRef<UsuarioUpsertData, UsuarioUpsertVariables>;
  operationName: string;
}
export const usuarioUpsertRef: UsuarioUpsertRef;

export function usuarioUpsert(vars: UsuarioUpsertVariables): MutationPromise<UsuarioUpsertData, UsuarioUpsertVariables>;
export function usuarioUpsert(dc: DataConnect, vars: UsuarioUpsertVariables): MutationPromise<UsuarioUpsertData, UsuarioUpsertVariables>;

interface UsuarioDeleteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UsuarioDeleteVariables): MutationRef<UsuarioDeleteData, UsuarioDeleteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UsuarioDeleteVariables): MutationRef<UsuarioDeleteData, UsuarioDeleteVariables>;
  operationName: string;
}
export const usuarioDeleteRef: UsuarioDeleteRef;

export function usuarioDelete(vars: UsuarioDeleteVariables): MutationPromise<UsuarioDeleteData, UsuarioDeleteVariables>;
export function usuarioDelete(dc: DataConnect, vars: UsuarioDeleteVariables): MutationPromise<UsuarioDeleteData, UsuarioDeleteVariables>;

interface ListarUsuariosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarUsuariosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarUsuariosData, undefined>;
  operationName: string;
}
export const listarUsuariosRef: ListarUsuariosRef;

export function listarUsuarios(): QueryPromise<ListarUsuariosData, undefined>;
export function listarUsuarios(dc: DataConnect): QueryPromise<ListarUsuariosData, undefined>;

interface BuscarUsuarioPorIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuscarUsuarioPorIdVariables): QueryRef<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BuscarUsuarioPorIdVariables): QueryRef<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;
  operationName: string;
}
export const buscarUsuarioPorIdRef: BuscarUsuarioPorIdRef;

export function buscarUsuarioPorId(vars: BuscarUsuarioPorIdVariables): QueryPromise<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;
export function buscarUsuarioPorId(dc: DataConnect, vars: BuscarUsuarioPorIdVariables): QueryPromise<BuscarUsuarioPorIdData, BuscarUsuarioPorIdVariables>;

