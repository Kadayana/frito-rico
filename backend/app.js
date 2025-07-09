// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { supabase } from './supabase.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba para conexión con Supabase
app.get('/api/ping', async (req, res) => {
  const { data, error } = await supabase.from('usuarios').select('*').limit(1);
  if (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
  res.status(200).json({ status: 'ok', data });
});

app.listen(3001, () => {
  console.log('✅ Servidor backend corriendo en http://localhost:3001');
});
