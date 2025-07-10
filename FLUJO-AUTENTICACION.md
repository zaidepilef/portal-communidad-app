# 🔐 Flujo Completo de Autenticación - Habitech

## 📋 Endpoints Implementados

### 1. **Registro de Usuario**
```
POST /api/register
```
**Payload:**
```json
{
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "confirmpassword": "contraseña123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente. Revise su email para activar la cuenta."
}
```

### 2. **Envío de Email de Activación**
```
POST /api/email/send
```
**Payload:**
```json
{
  "email": "usuario@ejemplo.com",
  "token": "token_activacion_123",
  "tipo": "activacion"
}
```

### 3. **Validación de Token de Activación**
```
GET /api/activation/validate?token=token_activacion_123
```

**Respuesta:**
```json
{
  "valid": true,
  "message": "Token válido"
}
```

### 4. **Activación de Cuenta**
```
GET /api/activation/activate?token=token_activacion_123
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Cuenta activada exitosamente"
}
```

### 5. **Login de Usuario**
```
POST /api/login
```
**Payload:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "token": "jwt_token_123",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com"
  }
}
```

## 🔄 Flujo de Usuario

### **Paso 1: Registro**
1. Usuario llena formulario de registro
2. Frontend valida datos
3. Se envía `POST /api/register`
4. Backend crea usuario inactivo
5. Backend genera token de activación
6. Backend envía email con enlace de activación

### **Paso 2: Activación por Email**
1. Usuario recibe email con enlace
2. Usuario hace clic en enlace: `/auth/activacion?token=xxx`
3. Frontend valida token: `GET /api/activation/validate`
4. Frontend activa cuenta: `GET /api/activation/activate`
5. Usuario es redirigido al login

### **Paso 3: Login**
1. Usuario ingresa credenciales
2. Frontend envía `POST /api/login`
3. Backend valida credenciales
4. Backend retorna JWT token
5. Frontend guarda token y redirige al dashboard

## 🛠️ Componentes Implementados

### **Servicios:**
- ✅ `AuthService` - Manejo de autenticación
- ✅ `EmailService` - Envío de emails
- ✅ `AutorizacionService` - Autorización por token

### **Componentes:**
- ✅ `RegisterComponent` - Formulario de registro
- ✅ `LoginComponent` - Formulario de login
- ✅ `ActivacionComponent` - Activación de cuenta
- ✅ `AutorizarComponent` - Autorización por URL

### **Guards:**
- ✅ `AuthGuard` - Protección de rutas autenticadas
- ✅ `AutorizacionGuard` - Protección por token

## 🔗 URLs de Acceso

### **Registro:**
```
https://tu-dominio.com/auth/register
```

### **Login:**
```
https://tu-dominio.com/auth/login
```

### **Activación:**
```
https://tu-dominio.com/auth/activacion?token=token_activacion_123
```

### **Autorización Directa:**
```
https://tu-dominio.com/auth/autorizar/rtwert4353wrtw34wefras34
```

## 📧 Configuración de Email

### **Servidor SMTP:**
- **Servidor**: `mail.ougt.cl`
- **Puerto**: `465` (SSL/TLS)
- **Usuario**: `auth@ougt.cl`
- **Autenticación**: Requerida

### **Templates de Email:**

#### **Activación:**
```
Asunto: Activa tu cuenta - Habitech
Contenido: Haga clic en el siguiente enlace para activar su cuenta: [ENLACE]
```

#### **Recuperación:**
```
Asunto: Recuperar contraseña - Habitech
Contenido: Haga clic en el siguiente enlace para restablecer su contraseña: [ENLACE]
```

## 🔒 Seguridad

### **Tokens:**
- **Activación**: 24 horas de validez
- **Recuperación**: 1 hora de validez
- **JWT**: Configurable (por defecto 24 horas)

### **Validaciones:**
- ✅ Contraseñas coinciden
- ✅ Email válido
- ✅ Username único
- ✅ Token no expirado

### **Headers de Seguridad:**
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block

## 🚀 Despliegue

### **Build para Producción:**
```bash
ng build --configuration production
```

### **Archivos a Subir:**
```
dist/
├── index.html
├── .htaccess
├── favicon.ico
├── assets/
└── [archivos JS/CSS]
```

### **Configuración Apache:**
- ✅ mod_rewrite habilitado
- ✅ Compresión GZIP
- ✅ Headers de seguridad
- ✅ Caché optimizado

---

**Estado**: ✅ Implementado y listo para producción  
**Versión**: 5.0.0  
**Fecha**: 2025-07-09 
