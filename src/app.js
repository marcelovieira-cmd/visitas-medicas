require("dotenv").config(); // carrega as variáveis do .env

const express = require("express");
const cors = require("cors");
const usuariosRoutes = require("./routes/usuarios.routes.js");

const app = express();
app.use(cors());
app.use(express.json()); // precisa disso pra ler JSON do body

console.log("[BOOT] montando /usuarios…");
app.use("/usuarios", usuariosRoutes);

app.post("/health", (_req, res) => res.json({ ok: true })); // teste de vida

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/health", (_req, res) => res.json({ ok: true }));
console.log("[BOOT] /health registrado");