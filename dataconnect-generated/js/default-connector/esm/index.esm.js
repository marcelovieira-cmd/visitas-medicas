import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'visitas-medicas',
  location: 'southamerica-east1'
};

export const usuarioInsertRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'usuarioInsert', inputVars);
}
usuarioInsertRef.operationName = 'usuarioInsert';

export function usuarioInsert(dcOrVars, vars) {
  return executeMutation(usuarioInsertRef(dcOrVars, vars));
}

export const usuarioUpsertRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'usuarioUpsert', inputVars);
}
usuarioUpsertRef.operationName = 'usuarioUpsert';

export function usuarioUpsert(dcOrVars, vars) {
  return executeMutation(usuarioUpsertRef(dcOrVars, vars));
}

export const usuarioDeleteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'usuarioDelete', inputVars);
}
usuarioDeleteRef.operationName = 'usuarioDelete';

export function usuarioDelete(dcOrVars, vars) {
  return executeMutation(usuarioDeleteRef(dcOrVars, vars));
}

export const listarUsuariosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'listarUsuarios');
}
listarUsuariosRef.operationName = 'listarUsuarios';

export function listarUsuarios(dc) {
  return executeQuery(listarUsuariosRef(dc));
}

export const buscarUsuarioPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'buscarUsuarioPorId', inputVars);
}
buscarUsuarioPorIdRef.operationName = 'buscarUsuarioPorId';

export function buscarUsuarioPorId(dcOrVars, vars) {
  return executeQuery(buscarUsuarioPorIdRef(dcOrVars, vars));
}

