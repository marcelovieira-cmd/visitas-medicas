const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'visitas-medicas',
  location: 'southamerica-east1'
};
exports.connectorConfig = connectorConfig;

const usuarioInsertRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'usuarioInsert', inputVars);
}
usuarioInsertRef.operationName = 'usuarioInsert';
exports.usuarioInsertRef = usuarioInsertRef;

exports.usuarioInsert = function usuarioInsert(dcOrVars, vars) {
  return executeMutation(usuarioInsertRef(dcOrVars, vars));
};

const usuarioUpsertRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'usuarioUpsert', inputVars);
}
usuarioUpsertRef.operationName = 'usuarioUpsert';
exports.usuarioUpsertRef = usuarioUpsertRef;

exports.usuarioUpsert = function usuarioUpsert(dcOrVars, vars) {
  return executeMutation(usuarioUpsertRef(dcOrVars, vars));
};

const usuarioDeleteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'usuarioDelete', inputVars);
}
usuarioDeleteRef.operationName = 'usuarioDelete';
exports.usuarioDeleteRef = usuarioDeleteRef;

exports.usuarioDelete = function usuarioDelete(dcOrVars, vars) {
  return executeMutation(usuarioDeleteRef(dcOrVars, vars));
};

const listarUsuariosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'listarUsuarios');
}
listarUsuariosRef.operationName = 'listarUsuarios';
exports.listarUsuariosRef = listarUsuariosRef;

exports.listarUsuarios = function listarUsuarios(dc) {
  return executeQuery(listarUsuariosRef(dc));
};

const buscarUsuarioPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'buscarUsuarioPorId', inputVars);
}
buscarUsuarioPorIdRef.operationName = 'buscarUsuarioPorId';
exports.buscarUsuarioPorIdRef = buscarUsuarioPorIdRef;

exports.buscarUsuarioPorId = function buscarUsuarioPorId(dcOrVars, vars) {
  return executeQuery(buscarUsuarioPorIdRef(dcOrVars, vars));
};
