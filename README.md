📄 README – Frontend Zoco
Autor: Williams Neme Scheij, Tomas

Zoco Frontend – React + Vite + Tailwind
Cliente web para la API de Zoco.
Manejo de sesión con Context API, llamadas con Axios, y rutas protegidas con React Router.

Tecnologías
React 18 + Vite

React Router DOM, Context API

Axios

Tailwind CSS

sessionStorage

Variables de entorno
Crear un archivo .env en la raíz del proyecto:


VITE_API_URL=http://localhost:5260/api
Ajusta el puerto al que muestre el backend al iniciar (dotnet run).

Instalación y ejecución

npm install
npm run dev
Frontend disponible en: http://localhost:5173

Rutas y Roles
Admin: /users, /studies, /addresses, /session-logs

User: /profile, /studies, /addresses

ProtectedRoute valida token y roles.

SessionLogs (solo Admin)
Vista /session-logs → lista sesiones activas y finalizadas.

Consume GET /api/session-logs del backend.

Login / Logout
Login: contra /auth/login, guarda token y usuario en contexto y sessionStorage.

Logout: llama a /auth/logout, limpia contexto y redirige a /login.

Build / Deploy

npm run build
Salida en dist/.

En Vercel:

Framework: Vite

Build Command: npm run build

Output Directory: dist

Variables de entorno:

VITE_API_URL=https://TU_DOMINIO_BACKEND/api
En el backend, habilitar dominio del front en CORS.

Credenciales de prueba
Admin: admin@zoco.com / Admin123!

User: user@zoco.com / User123!


