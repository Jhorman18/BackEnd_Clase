const express = require('express');
const app = express();
const prisma = require('./prisma/client');
const usuarioRoutes = require('./routes/usuarioRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.use('/usuarios', usuarioRoutes);
app.use('/auth', authRoutes)

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});