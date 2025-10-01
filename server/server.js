const pool = require('../server/db/mysql'); // Supondo que exportou o pool em db.js
const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001; // API na 3001; Vite na 3000

const cors = require('cors');
app.use(cors());

// Body parser
app.use(express.json());

// Auto-carregamento de rotas da pasta server/routes
const routesDir = path.resolve(__dirname, 'routes');
if (fs.existsSync(routesDir)) {
  fs.readdirSync(routesDir)
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
      const registerRoutes = require(path.join(routesDir, file));
      if (typeof registerRoutes === 'function') {
        registerRoutes(app);
      }
    });
}

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
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





