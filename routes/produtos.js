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

// POST - cadastrar produto
router.post("/", async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO produtos (nome, descricao, preco, estoque) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, descricao, preco, estoque]
    );

    res.status(201).json({
      message: "Produto cadastrado com sucesso!",
      produto: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar produto" });
  }
});

module.exports = router;

// GET - listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});
