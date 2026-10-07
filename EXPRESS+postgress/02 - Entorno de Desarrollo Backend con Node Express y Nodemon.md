---
tags:
  - express
  - node
  - entorno
aliases:
  - Entorno de Desarrollo Backend
  - Express y Nodemon
  - ES Modules
clase: Configuración e Inicialización del Proyecto Node.js / Express
timestamp: ~05:00 - 15:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Entorno de Desarrollo Backend con Node Express y Nodemon

## Definición

Es el conjunto de librerías y configuraciones iniciales sobre **Node.js** que habilitan la creación de un servidor web utilizando el framework **Express**, la sintaxis moderna de módulos de ECMAScript (**ES Modules**) y el reinicio automático en desarrollo mediante **Nodemon**.

## Configuración del Proyecto

```bash
# 1. Inicialización de package.json
npm init -y

# 2. Instalación de dependencias de producción
npm install express morgan sequelize pg pg-hstore

# 3. Instalación de dependencias de desarrollo
npm i nodemon -D
```

---

## Configuración de ES Modules (`package.json`)

Para habilitar las sentencias `import/export` nativas en Node.js, se debe añadir `"type": "module"` en el archivo `package.json`.

```json
{
  "name": "false-twitter-backend",
  "type": "module",
  "scripts": {
    "def": "nodemon src/index.js"
  }
}
```

---

## Implementación Base del Servidor

### Configuración de Express (`src/app.js`):

```javascript
import express from 'express';

const app = express();

// Middleware obligatorio para procesar JSON en el cuerpo de las peticiones
app.use(express.json());

export default app;
```

### Arranque del Servidor (`src/index.js`):

```javascript
import app from './app.js';

function init() {
  app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
}

init();
```

---

## Errores Comunes

- **Omitir la extensión `.js` en importaciones locales:** Al usar ES Modules, escribir `import app from './app'` provocará un error `ERR_MODULE_NOT_FOUND`. Se debe especificar siempre la extensión: `./app.js`.
- **Olvidar `express.json()`:** Sin este middleware, el cuerpo de las peticiones `POST` o `PUT` (`req.body`) llegará al controlador como `undefined`.

## Buenas Prácticas

- Separar la instancia de Express (`app.js`) del archivo de arranque de red (`index.js`) para facilitar futuras pruebas de integración.

## Relación con otros conceptos

- Depende de: [01 - Arquitectura Cliente Servidor y API REST](<01%20-%20Arquitectura%20Cliente%20Servidor%20y%20API%20REST.md>)
- Organiza la estructura para: [03 - Estructura de Proyecto y Conexion a PostgreSQL con Sequelize](<03%20-%20Estructura%20de%20Proyecto%20y%20Conexion%20a%20PostgreSQL%20con%20Sequelize.md>)
- Monta los endpoints de: [06 - Rutas Controladores y Operaciones CRUD en Express](<06%20-%20Rutas%20Controladores%20y%20Operaciones%20CRUD%20en%20Express.md>)

## Preguntas de repaso

1. **Aplicación:** ¿Qué comando de consola ejecuta el script de desarrollo usando Nodemon según la configuración del `package.json`?
2. **Diagnóstico:** Envías un objeto JSON vía `POST` a tu servidor Express pero `req.body` imprime `undefined`. ¿Qué middleware olvidaste configurar en `app.js`?

## Fuente

- **Clase:** Configuración e Inicialización del Proyecto Node.js / Express
- **Timestamp:** ~05:00 - 15:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
