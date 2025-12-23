const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// POST - cadastrar cliente
router.post("/", async (req, res) => {
  const { nome, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *",
      [nome, email]
    );

    res.status(201).json({
      message: "Cliente cadastrado com sucesso!",
      cliente: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar cliente" });
  }
});

// GET - listar clientes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clientes" });
  }
});

module.exports = router;
