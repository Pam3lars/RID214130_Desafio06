🛒 DNCommerce – API de Gerenciamento de Produtos e Vendas

📌 Descrição do Projeto

Este projeto consiste no desenvolvimento de uma API REST para a empresa fictícia DNCommerce, uma loja online de produtos de beleza. O objetivo é fornecer um sistema simples e eficiente para gerenciamento de produtos, clientes, vendas e controle de estoque, atendendo aos critérios propostos no desafio técnico.

O sistema foi desenvolvido utilizando Node.js, Express e PostgreSQL, com foco em boas práticas de modelagem de dados, integração entre banco e API e regras de negócio reais, como baixa automática de estoque.


---

🧱 Modelagem do Banco de Dados

O banco de dados é relacional e composto pelas seguintes entidades:

📦 Produtos

id_produto (PK)

nome

descricao

preco

estoque


👤 Clientes

id_cliente (PK)

nome

email


🧾 Vendas

id_venda (PK)

id_cliente (FK)

data_venda


📄 Itens de Venda

id_item (PK)

id_venda (FK)

id_produto (FK)

quantidade

subtotal


🔗 Relacionamentos:

Um cliente pode ter várias vendas

Uma venda pode conter vários produtos

O estoque do produto é atualizado automaticamente após uma venda



---

🔌 Endpoints da API

📦 Produtos

POST /produtos → Cadastrar produto

GET /produtos → Listar produtos


👤 Clientes

POST /clientes → Cadastrar cliente

GET /clientes → Listar clientes


💰 Vendas

POST /vendas → Registrar venda com baixa automática de estoque


📌 A rota de vendas utiliza transações no banco (BEGIN, COMMIT, ROLLBACK) para garantir a integridade dos dados.


---

⚙️ Tecnologias Utilizadas

Node.js

Express

PostgreSQL

pg (node-postgres)

Insomnia (testes de API)



---

▶️ Como Executar o Projeto

1. Clone o repositório


2. Instale as dependências:



npm install

3. Configure o arquivo .env com as credenciais do banco


4. Inicie o servidor:



node server.js

5. Utilize o Insomnia para testar os endpoints




---

🧪 Testes

As requisições foram testadas utilizando o Insomnia, validando:

Cadastro e listagem de produtos

Cadastro e listagem de clientes

Registro de vendas

Validação de estoque

Atualização automática do estoque



---

🏁 Conclusão

Este projeto demonstra a aplicação prática de conceitos essenciais de back-end, como:

Modelagem de dados relacional

Desenvolvimento de API REST

Integração banco + API

Regras de negócio

Tratamento de erros

Uso de transações para garantir consistência


O sistema atende integralmente aos critérios de avaliação propostos no desafio.
