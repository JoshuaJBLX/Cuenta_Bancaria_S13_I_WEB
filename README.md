# 🏦 Sistema de Gestión de Cuenta Bancaria Simplificada

Proyecto académico para la asignatura **Ingeniería Web**. API REST con Node.js, Express y MongoDB, y frontend en React 18 + Vite + Tailwind CSS con estética **BRUTALISTA TERMINAL**.

## 📋 Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Node.js | ≥18 |
| Backend | Express | ^4.18.2 |
| Backend | Mongoose | ^8.0.0 |
| Frontend | React | ^18.2.0 |
| Frontend | Vite | ^5.0.0 |
| Frontend | Tailwind CSS | ^3.4.0 |
| Base de datos | MongoDB | Local |

## 🛠️ Requisitos previos

- Node.js ≥ 18 instalado
- MongoDB local corriendo en `mongodb://127.0.0.1:27017`

## 🚀 Instalación

Abrir **dos terminales separadas** (una para backend, otra para frontend).

### Terminal 1 — Backend

```bash
cd d:\Semana13\proyecto-cuenta-bancaria\server
npm install
cp .env.example .env
npm run seed      # Pobla la base de datos con cuentas de prueba
npm run dev       # Inicia el servidor en el puerto 3000
```

### Terminal 2 — Frontend

```bash
cd d:\Semana13\proyecto-cuenta-bancaria\client
npm install
cp .env.example .env
npm run dev       # Inicia Vite en http://localhost:5173
```

## ⚙️ Variables de entorno

| Variable | Valor por defecto | Descripción |
|----------|------------------|-------------|
| `PORT` | `3000` | Puerto del servidor backend |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/cuenta_bancaria` | URI de conexión a MongoDB |
| `VITE_API_URL` | `http://localhost:3000/api` | URL base de la API para el frontend |

## 🌱 Seed (poblado inicial)

Comando: `npm run seed` (desde `/server`)

El seed:
- Limpia las colecciones `cuentas` y `transacciones`
- Crea 3 cuentas de prueba:
  - **CTA-001** — Bruce Wayne — saldo $100.000 USD
  - **CTA-002** — Elliot Alderson — saldo $50.000 USD
  - **CTA-003** — Ada Lovelace — saldo $25.000 USD
- Genera 2 depósitos, 1 retiro y 1 transferencia de ejemplo
- Muestra logs en color verde ANSI

Los IDs de las cuentas se imprimen en consola al ejecutar el seed.

## 📡 Endpoints

Base: `http://localhost:3000/api/cuenta`

### 1. Listar cuentas
```bash
GET /api/cuenta
```
Respuesta:
```json
{ "success": true, "data": [ { "_id": "...", "numeroCuenta": "CTA-001", "titular": "Bruce Wayne", "saldo": 100000, "moneda": "USD" } ], "message": "Cuentas obtenidas correctamente" }
```

### 2. Obtener cuenta por ID
```bash
GET /api/cuenta/:id
```
Éxito (200):
```json
{ "success": true, "data": { "_id": "...", "numeroCuenta": "CTA-001", "titular": "Bruce Wayne", "saldo": 100000 }, "message": "Cuenta obtenida correctamente" }
```
Error (404): `{ "success": false, "error": "Cuenta no encontrada" }`

### 3. Depósito
```bash
POST /api/cuenta/deposito
Content-Type: application/json

{ "cuentaId": "...", "monto": 5000 }
```
Éxito (200): `{ "success": true, "data": { ...saldo actualizado... }, "message": "Depósito realizado correctamente" }`
Error (400): `{ "success": false, "error": "Monto inválido: debe ser un número mayor que 0" }`

### 4. Retiro
```bash
POST /api/cuenta/retiro
Content-Type: application/json

{ "cuentaId": "...", "monto": 2000 }
```
Éxito (200): `{ "success": true, "data": { ...saldo actualizado... }, "message": "Retiro realizado correctamente" }`
Error (400): `{ "success": false, "error": "Saldo insuficiente" }`

### 5. Transferencia
```bash
POST /api/cuenta/transferencia
Content-Type: application/json

{ "cuentaOrigenId": "...", "cuentaDestinoId": "...", "monto": 1000 }
```
Éxito (200): `{ "success": true, "data": { "cuentaOrigen": { ... }, "cuentaDestino": { ... } }, "message": "Transferencia realizada correctamente" }`
Error (400): `{ "success": false, "error": "Saldo insuficiente en la cuenta origen" }`

### 6. Historial de transacciones
```bash
GET /api/cuenta/:id/historial
```
Éxito (200): `{ "success": true, "data": [ { "tipo": "deposito", "monto": 5000, ... } ], "message": "Historial obtenido correctamente" }`

## 💰 Reglas de negocio

- **Nunca se permite saldo negativo.** Un retiro o transferencia que deje saldo < 0 devuelve 400.
- **Monto válido:** debe ser numérico, finito y > 0. Se rechazan NaN, strings, negativos y cero.
- **Transferencia atómica:** usa sesión de Mongoose (`startSession` / `startTransaction` / `commitTransaction` / `abortTransaction`). Ambas cuentas deben existir y ser distintas.
- **ObjectId validado** con `mongoose.Types.ObjectId.isValid()`.

## 🎨 Diseño Brutalista Terminal

- Fondo: negro profundo `#000000`
- Texto principal: verde fluorescente `#00FF00`
- Títulos: blanco `#FFFFFF`
- Tipografía: `Courier New` monospace
- Bordes toscos, sin `rounded`, sin gradientes, sin sombras suaves, sin transiciones
- Overlay CRT opcional con patrón verde sutil
- Colores de acento: gris cemento `#222222`, bordes gris `#333333`

## 👨‍💻 Autor y materia

- **Autor:** Estudiante Ingeniería Web
- **Materia:** Ingeniería Web
- **Proyecto:** Sistema de Gestión de Cuenta Bancaria Simplificada
- **Repositorio:** https://github.com/JoshuaJBLX/Cuenta_Bancaria_S13_I_WEB.git