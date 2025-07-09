export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form className="flex flex-col gap-2 w-80">
        <input type="email" placeholder="Correo" className="p-2 border rounded" />
        <input type="password" placeholder="Contraseña" className="p-2 border rounded" />
        <button className="bg-yellow-500 p-2 rounded hover:bg-yellow-600 text-white">Entrar</button>
      </form>
    </div>
  )
}
