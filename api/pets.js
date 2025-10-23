import pool from './db.js';

let pets = [
  { registro: '1', nome: 'Bob', tipo: 'Cachorro', idade: 4 },
  { registro: '2', nome: 'Miau', tipo: 'Gato', idade: 2 },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(pets);
  } else if (req.method === 'POST') {
    const { registro, nome, tipo, idade } = req.body;
    if (!registro || !nome || !tipo || !idade) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    pets.push({ registro, nome, tipo, idade });
    res.status(201).json({ success: true });
  } else if (req.method === 'DELETE') {
    const { registro } = req.query;
    if (!registro) {
      return res.status(400).json({ error: 'Parâmetro registro obrigatório' });
    }
    const lengthBefore = pets.length;
    pets = pets.filter(pet => pet.registro !== registro);
    if (pets.length === lengthBefore) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    res.json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}