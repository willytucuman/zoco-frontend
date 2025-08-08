📄 README – Frontend (React)
WILLIAMS NEME SCHEIJ, TOMAS.
Zoco Users Frontend – Prueba Técnica Full Stack
Frontend desarrollado en React + Vite con TailwindCSS, React Router DOM, Context API y Axios para consumir la API y gestionar la sesión.

🚀 Tecnologías
React 18 + Vite

React Router DOM

Context API

Axios

Tailwind CSS

sessionStorage

📂 Estructura del proyecto
frontend/
 ├── src/
 │   ├── api/
 │   ├── components/
 │   ├── context/
 │   ├── pages/
 │   ├── App.jsx
 │   └── index.css
 ├── package.json
 └── vite.config.js
⚙️ Variables de entorno requeridas
En un archivo .env en la raíz:

VITE_API_URL=https://localhost:7235/api

Cambia la URL al backend en producción.

📦 Instalación y ejecución local
1. Clonar el repositorio
git clone https://github.com/usuario/frontend-zoco.git
cd frontend-zoco
2. Instalar dependencias
npm install
3. Ejecutar en desarrollor
npm run dev

La app estará disponible en:
http://localhost:5173

🔐 Funcionalidades
Login con AuthContext y JWT

Dashboard:

Admin: ver/gestionar usuarios, estudios y direcciones

User: ver/editar solo sus datos

CRUD de estudios y direcciones con validación por rol

Logout global

Diseño responsivo

