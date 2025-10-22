const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');

app.use(cors());
app.use(express.json());

// Configuração do pool MySQL (exemplo)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco'
});

// Adicione essa rota no seu servidor
app.get('/api/pets', (req, res) => {
  // Consulta ao banco de dados MySQL para buscar os pets
  pool.query('SELECT * FROM pet_register', (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      return res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
    // Enviar os dados como resposta JSON
    res.json(results);
  });
});

app.post('/api/pets', async (req, res) => {
  const { registro, nome, tipo, idade } = req.body;

  if (!registro || !nome || !tipo || !idade) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios faltando' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO pets (registro, nome, tipo, idade) VALUES (?, ?, ?, ?)',
      [registro, nome, tipo, idade]
    );
    res.status(201).json({ success: true, insertId: result.insertId });
  } catch (err) {
    console.error('Erro ao inserir pet:', err);
    res.status(500).json({ success: false, error: 'Erro ao inserir no banco de dados' });
  }
});

// DELETE - excluir um pet pelo registro
app.delete('/api/pets/:registro', async (req, res) => {
  const { registro } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM pets WHERE registro = ?', [registro]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Pet não encontrado' });
    }

    res.json({ success: true, message: 'Pet excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir pet:', err);
    res.status(500).json({ success: false, error: 'Erro ao excluir do banco de dados' });
  }
});





