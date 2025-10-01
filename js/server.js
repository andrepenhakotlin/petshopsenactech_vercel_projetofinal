const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configuração do middleware
app.use(express.json()); // Para analisar corpos JSON

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost", // Endereço do servidor MySQL
  user: "root", // Usuário do banco de dados
  password: "root", // Senha do banco de dados
  database: "tutores", // Nome do banco de dados
});

// Conexão ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL: " + err.stack);
    return;
  }
  console.log("Conectado ao banco de dados MySQL.");
});

//function preenchimentoCampos(idRegistro, idNome, idTipo, idIdade) {

// Rota para cadastrar um pet
app.post("/api/pets", (req, res) => {
  const { registro, nome, tipo, idade } = req.body;

  if ([registro, nome, tipo, idade].some(field => field === undefined || field === null || field === "")) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const query = "INSERT INTO pets (registro, nome, tipo, idade) VALUES (?, ?, ?, ?)";
  db.query(query, [registro, nome, tipo, idade], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao cadastrar pet." });
    }
    res.status(200).json({ message: "Pet cadastrado com sucesso!" });
  });
});

// Rota para excluir um pet
app.delete("/api/pets/:registro", (req, res) => {
  const { registro } = req.params;

  const query = "DELETE FROM pets WHERE registro = ?";
  db.query(query, [registro], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao excluir pet." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }
    res.status(200).json({ message: "Pet excluído com sucesso!" });
  });
});

// Rota para listar todos os pets
app.get("/api/pets", (req, res) => {
  const query = "SELECT * FROM pets";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar pets." });
    }
    res.status(200).json(results);
  });
});


//function preenchimentoCampos(idRegistro, idNome, idTipo, idIdade) {

// Rota para cadastrar um tutor
app.post("/api/tutores", (req, res) => {
  const { registro, nome, tipo, idade } = req.body;

  if ([registro, nome, tipo, idade].some(field => field === undefined || field === null || field === "")) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const query = "INSERT INTO pets (registro, nome, tipo, idade) VALUES (?, ?, ?, ?)";
  db.query(query, [registro, nome, tipo, idade], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao cadastrar pet." });
    }
    res.status(200).json({ message: "Pet cadastrado com sucesso!" });
  });
});

// Rota para excluir um pet
app.delete("/api/pets/:registro", (req, res) => {
  const { registro } = req.params;

  const query = "DELETE FROM pets WHERE registro = ?";
  db.query(query, [registro], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao excluir pet." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }
    res.status(200).json({ message: "Pet excluído com sucesso!" });
  });
});

// Rota para listar todos os pets
app.get("/api/pets", (req, res) => {
  const query = "SELECT * FROM pets";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar pets." });
    }
    res.status(200).json(results);
  });
})
// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

