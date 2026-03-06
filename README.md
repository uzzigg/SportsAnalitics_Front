# Sports Analytics - Frontend ⚽📊

Esta es la aplicación Frontend de **Sports Analytics**, diseñada para ofrecer una experiencia premium y moderna similar a interfaces analíticas de alto nivel. Está desarrollada bajo la poderosa pila de **Next.js 14 (App Router)**, React 18, TypeScript y **Tailwind CSS**.

## ✨ Características y Diseño

- **Arquitectura App Router**: Rutas dinámicas e interactivas pre-compiladas.
- **Visuales Premium**: Tema oscuro (Dark Mode), paleta de colores curada, efectos *Glassmorphism* (cristal esmerilado) en tarjetas e interfaces, y animaciones sutiles interactivas.
- **Búsqueda Global**: Barra de Navbar que redirige al directorio pasando parámetros de consulta para realizar peticiones directamente al Backend.
- **Totalmente Reactivo**: UI adaptativa perfecta para exploradores móviles, tablets, o escritorios.

## 📁 Estructura del Código

```
frontend/
├── app/
│   ├── detalle/[id]/   # Vista de perfil detallado de cada jugador
│   ├── jugadores/      # Directorio general, lista paginada y buscador
│   ├── globals.css     # Hoja de estilos principal (Tailwind directives)
│   ├── layout.tsx      # Layout "Root" global (aplicado a todas las vistas)
│   └── page.tsx        # Dashboard / Landing Page principal
├── components/
│   ├── base/           # Componentes puramente visuales y re-utilizables (Spinners, Cards)
│   ├── layouts/        # Contenedores de vistas completas
│   └── specific/       # Navbar, Footer y secciones lógicas del proyecto
├── hooks/              # Custom Hooks (useFetch, useFilters) para lógica de estado
├── types/              # Definiciones e interfaces TypeScript (Models)
├── lib/                # Utilidades abstractas como instanciadores de Axios (api-client)
├── Dockerfile          # Imagen de Docker optimizada con Alpine
├── postcss.config.mjs  # Configuración CSS
└── tailwind.config.ts  # Diseño del sistema y colores base
```

## ⚙️ Cómo ejecutar el proyecto (Local)

1. **Ajustar el entorno**:
   Si tu Backend no corre en `http://localhost:5000`, debes crear un archivo `.env.local` en este directorio con la variable `NEXT_PUBLIC_API_URL`.

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Modo Desarrollo**:
   ```bash
   npm run dev
   ```
   *Accede desde tu navegador a `http://localhost:3000`.*

4. **Modo Producción (Build)**:
   ```bash
   npm run build
   npm start
   ```
   *`next build` generará los estáticos en la carpeta `.next/`.*

## 🐳 Despliegue con Docker

Este frontend cuenta con un `Dockerfile` en versión Multi-stage build, minimizando el peso al desplegar.

1. **Construir la imagen**:
   ```bash
   docker build -t sports-analytics-frontend .
   ```
2. **Levantar el contenedor**:
   ```bash
   docker run -d -p 3000:3000 --name sa-frontend sports-analytics-frontend
   ```
