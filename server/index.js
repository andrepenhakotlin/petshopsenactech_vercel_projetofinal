const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Body parser
app.use(express.json());

// 🟢 Rotas da API
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

// 🟢 Servir arquivos estáticos do Vite (build de produção)
const clientPath = path.resolve(__dirname, '../dist'); // ou onde seu Vite build estiver
app.use(express.static(clientPath));

// 🟢 Rota fallback (SPA: qualquer rota que não seja /api/* vai para index.html)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(clientPath, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
