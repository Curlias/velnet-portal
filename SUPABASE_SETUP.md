# Configuración de Supabase para VELNET Portal

## Base de datos configurada

### Tabla: users
- id (uuid, primary key)
- username (text, unique)
- password (text, hashed)
- email (text)
- active (boolean)
- created_at (timestamp)
- expires_at (timestamp, nullable)

## Variables de entorno necesarias en Vercel

- `SUPABASE_URL`: Tu URL de Supabase
- `SUPABASE_ANON_KEY`: Tu clave pública
- `SUPABASE_SERVICE_KEY`: Tu clave de servicio (para servidor)
