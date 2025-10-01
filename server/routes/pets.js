const express = require('express');
const db = require('../db/mysql');

module.exports = (app) => {
  const router = express.Router();

  // GET /pets
  router.get('/pets', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM pets');
      res.json(rows);
    } catch (err) {
      console.error('Erro ao buscar pets:', err);
      res.status(500).json({ error: 'Erro ao buscar pets' });
    }
  });

  app.use('/api', router);
};
