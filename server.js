require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Rota para testar API
app.get("/", (req, res) => {
  res.json({ message: "API funcionando! 🚀" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const produtosRoutes = require("./routes/produtos");
app.use("/produtos", produtosRoutes);

const clientesRoutes = require("./routes/clientes");
app.use("/clientes", clientesRoutes);

const vendasRoutes = require("./routes/vendas");
app.use("/vendas", vendasRoutes);

