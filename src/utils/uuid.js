// src/utils/uuid.js
function normalizeUuid(uuid) {
  if (!uuid || typeof uuid !== 'string') return null;
  // Se já está no formato canônico, retorna direto
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)) {
    return uuid;
  }
  // Se está no formato 32-hex, converte para canônico
  if (/^[0-9a-f]{32}$/i.test(uuid)) {
    return uuid.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      '$1-$2-$3-$4-$5'
    );
  }
  return null;
}

module.exports = { normalizeUuid };