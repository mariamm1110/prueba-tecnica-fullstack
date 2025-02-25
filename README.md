## Instalación y Configuración Local

### Requisitos Previos
- **Node.js** v18.18.0 o superior
- **bun**

### Pasos de Instalación

1. **Clonar el repositorio:**
  ```
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
  ```
  
2. **Instalar dependencias:**
  ```
   bun install
  ```

2. **Configurar variables de entorno**
  ```
   DATABASE_URL
   DIRECT_URL=
  AUTH0_CLIENT_ID
  AUTH0_CLIENT_SECRET
  AUTH0_ISSUER
  NEXTAUTH_URL
  NEXTAUTH_SECRET
  NEXT_PUBLIC_API_URL
  ```
3. Crear o actualizar base de datos
  ```
  bun x prisma migrate dev
  ```
3. Inicializar en modo desarrollo/produccion
  ```
  bun run dev
  bun run build
  ```

  ## Despliegue en Vercel
  Crear un nuevo proyecto en Vercel.
  Conecta el repositorio de GitHub.
  Configura las variables de entorno en el panel de Vercel.
  bun run build.
  Output Directory: .next (el estándar de Next.js).
  Vercel detectará el proyecto Next.js y desplegará automáticamente.
  Una vez desplegado, se obtiene una URL para compartir y validar el funcionamiento de la app.

  ## Aclaracion
  Por inconvenientes en el despegue, las pruebas unitarias se encuentran en la rama `test`
