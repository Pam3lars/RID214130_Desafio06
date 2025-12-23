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

// POST - registrar venda
router.post("/", async (req, res) => {
  const { id_cliente, produtos } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Cria a venda
    const vendaResult = await client.query(
      "INSERT INTO vendas (id_cliente, data_venda) VALUES ($1, NOW()) RETURNING id_venda",
      [id_cliente]
    );

    const id_venda = vendaResult.rows[0].id_venda;

    // 2️⃣ Percorre os produtos da venda
    for (const item of produtos) {
      const { id_produto, quantidade } = item;

      // Busca preço e estoque do produto
      const produtoResult = await client.query(
        "SELECT preco, estoque FROM produtos WHERE id_produto = $1",
        [id_produto]
      );

      // Produto não encontrado
      if (produtoResult.rows.length === 0) {
        throw new Error(`Produto ${id_produto} não encontrado`);
      }

      const { preco, estoque } = produtoResult.rows[0];

      // Estoque insuficiente
      if (estoque < quantidade) {
        throw new Error("Estoque insuficiente");
      }

      // Calcula subtotal
      const subtotal = preco * quantidade;

      // Registra item da venda (com subtotal)
      await client.query(
        `INSERT INTO itens_venda 
         (id_venda, id_produto, quantidade, subtotal)
         VALUES ($1, $2, $3, $4)`,
        [id_venda, id_produto, quantidade, subtotal]
      );

      // Baixa estoque
      await client.query(
        "UPDATE produtos SET estoque = estoque - $1 WHERE id_produto = $2",
        [quantidade, id_produto]
      );
    }

    // 3️⃣ Finaliza transação
    await client.query("COMMIT");

    res.status(201).json({
      message: "Venda registrada com sucesso!",
      id_venda,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao registrar venda:", error.message);
    res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;
