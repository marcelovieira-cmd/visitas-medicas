const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function updateToken() {
  try {
    const token = execSync('gcloud auth print-access-token').toString().trim();
    const envPath = path.join(__dirname, '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(/DATACONNECT_TOKEN=.*/g, `DATACONNECT_TOKEN=${token}`);
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log(`[TOKEN] Atualizado em ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error('Erro ao atualizar token:', err);
  }
}

// Atualiza a cada 45 minutos
updateToken();
setInterval(updateToken, 45 * 60 * 1000);