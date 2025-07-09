import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const nombre = e.target[0].value;
    const correo = e.target[1].value;
    const contrasena = e.target[2].value;
    const confirmar = e.target[3].value;

    if (contrasena !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contrasena }),
    });

    const data = await res.json();
    if (data.error) setError(data.error);
    else alert("¡Registro exitoso!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-2 w-80">
        <input type="text" placeholder="Nombre" className="p-2 border rounded" />
        <input type="email" placeholder="Correo" className="p-2 border rounded" />
        <input type="password" placeholder="Contraseña" className="p-2 border rounded" />
        <input type="password" placeholder="Confirmar Contraseña" className="p-2 border rounded" />
        <button className="bg-yellow-500 p-2 rounded hover:bg-yellow-600 text-white">Registrarse</button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
