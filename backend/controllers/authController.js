import { supabase } from '../supabase.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    console.log("📩 Datos recibidos:", { nombre, correo, contrasena });

    // Verificar si el correo ya existe
    const { data: existingUser, error: userCheckError } = await supabase
      .from('usuarios')
      .select('id')
      .eq('correo', correo)
      .single();

    if (userCheckError && userCheckError.code !== 'PGRST116') {
      console.error("⚠️ Error buscando usuario:", userCheckError.message);
      return res.status(500).json({ error: 'Error validando el usuario' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Ese correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(contrasena, 10);

    // Insertar usuario
    const { error } = await supabase.from('usuarios').insert({
      nombre,
      correo,
      contrasena: hashed,
    });

    if (error) {
      console.error("❌ Error insertando usuario:", error.message);
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }

    console.log("✅ Usuario registrado correctamente");
    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error("🔥 Error inesperado:", err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
