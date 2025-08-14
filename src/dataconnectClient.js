
import { connectDataConnectEmulator } from "firebase/data-connect";

connectDataConnectEmulator(dataConnect, "localhost", 9399);

const { initializeApp } = require("firebase/app");
const { getDataConnect, connectDataConnectEmulator } = require("firebase/data-connect");

// Configurações do seu projeto Firebase (console > engrenagem > Configurações do projeto > Suas apps Web)
const firebaseConfig = {
  apiKey: "AIzaSyBhpLHA-OiRGn20N6bwmt1l7Y6bO_MZQeY",
  authDomain: "visitas-medicas-sql.firebaseapp.com",
  projectId: "visitas-medicas-sql",
  appId: "1:308251221556:web:ef5be37c060a0a4f4d3461"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Aqui é onde você referencia o conector gerado pelo `firebase init dataconnect`
const connectorConfig = require("../dataconnect/visitas-medicas.json");

const dataConnect = getDataConnect(app, connectorConfig);

// Se variável de ambiente estiver setada, conecta ao emulador
if (process.env.USE_DC_EMULATOR === "true") {
  connectDataConnectEmulator(dataConnect, "localhost", 9399);
  console.log("🔥 Conectado ao emulador do Data Connect em localhost:9399");
}

module.exports = { dataConnect };