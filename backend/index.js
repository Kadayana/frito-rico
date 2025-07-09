import express from 'express';
import { db } from './config/db.js';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT NOW() AS now');
  res.send(`La hora actual en MySQL es: ${rows[0].now}`);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
