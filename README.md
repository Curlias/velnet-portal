# VELNET Portal Cautivo

Portal cautivo moderno y minimalista para la red Wi-Fi VELNET con autenticación real mediante Supabase.

## 🚀 Características

- Diseño responsive y moderno
- Fondo con degradado tecnológico (azul oscuro a cian)
- Autenticación real con base de datos Supabase
- Passwords hasheados con bcrypt
- Control de expiración de cuentas
- Registro de sesiones
- Listo para desplegar en Vercel

## 📋 Configuración de Supabase

### 1. Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Click en "New Project"
4. Nombre: `velnet-portal`
5. Selecciona región más cercana
6. Click "Create new project"

### 2. Ejecutar el schema SQL
1. En Supabase, ve a **SQL Editor**
2. Click en "New Query"
3. Copia y pega el contenido de `supabase_schema.sql`
4. Click en "Run"

### 3. Obtener las credenciales
1. Ve a **Settings** → **API**
2. Copia:
   - `Project URL` (SUPABASE_URL)
   - `anon public` key (SUPABASE_ANON_KEY)
   - `service_role` key (SUPABASE_SERVICE_KEY) ⚠️ Secreto

### 4. Configurar variables de entorno en Vercel
1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Ve a **Settings** → **Environment Variables**
3. Agrega:
   ```
   SUPABASE_URL = tu_project_url
   SUPABASE_ANON_KEY = tu_anon_key
   SUPABASE_SERVICE_KEY = tu_service_role_key
   ```
4. Click "Save"
5. Redeploy el proyecto

### 5. Crear primer usuario

Usa curl o Postman:

```bash
curl -X POST https://qro-1a.velnet.veldrion.com/api/create-user \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@velnet.com"
  }'
```

## 🔧 Configuración de Aruba

**En Security Level (VELNET_GUEST):**
- Splash page type: `External`
- Captive portal profile: `VELNET PORTAL`

**En VELNET PORTAL:**
- Type: `Authentication Text`
- IP or hostname: `qro-1a.velnet.veldrion.com`
- URL: `/`
- Port: `443`
- Use HTTPS: ✓ Activado

## 👥 Gestionar Usuarios

### Crear usuario:
```bash
POST /api/create-user
{
  "username": "usuario1",
  "password": "password123",
  "email": "usuario1@ejemplo.com"
}
```

### Ver usuarios en Supabase:
1. Ve a **Table Editor**
2. Selecciona tabla `users`
3. Ver, editar, activar/desactivar usuarios

### Desactivar usuario:
```sql
UPDATE users SET active = false WHERE username = 'usuario1';
```

### Ver sesiones activas:
```sql
SELECT * FROM sessions WHERE disconnected_at IS NULL ORDER BY connected_at DESC;
```

## 📊 Tecnologías

- HTML5 + CSS3
- Google Fonts (Inter)
- Vercel Serverless Functions
- Supabase (PostgreSQL)
- bcryptjs para hashing de passwords

---

© 2025 VELNET | Acceso Seguro
