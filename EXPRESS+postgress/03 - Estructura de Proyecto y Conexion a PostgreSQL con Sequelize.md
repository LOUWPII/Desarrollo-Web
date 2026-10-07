---
tags:
  - express
  - postgresql
  - sequelize
aliases:
  - Sequelize
  - Conexión a PostgreSQL
clase: Arquitectura del Proyecto y Configuración de PostgreSQL con Sequelize
timestamp: ~15:00 - 25:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Estructura de Proyecto y Conexión a PostgreSQL con Sequelize

## Definición

**Sequelize** es un ORM (*Object-Relational Mapper*) para Node.js que abstrae la escritura de SQL nativo mapeando tablas de PostgreSQL a clases y objetos en JavaScript. Requiere drivers nativos como `pg` y `pg-hstore` para gestionar las conexiones por red.

## Estructura en Capas Recomendada

```text
src/
├── controllers/    # Procesan req/res y aplican la lógica de respuesta.
├── database/       # Configuración y conexión de Sequelize a PostgreSQL.
├── models/         # Definición de esquemas de tablas con DataTypes.
├── routes/         # Endpoints y asignación de métodos HTTP a controladores.
├── app.js          # Middlewares y registro de rutas de Express.
└── index.js        # Arranque del servidor y autenticación de la BD.
```

---

## Conexión a la Base de Datos (`src/database/database.js`)

```javascript
import Sequelize from 'Sequelize';

// Instancia de conexión a PostgreSQL
export const sequelize = new Sequelize('false_twitter', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433 // Ajustar puerto según la instancia (por defecto 5432)
});
```

---

## Verificación Asíncrona de Conexión (`src/index.js`)

```javascript
import app from './app.js';
import { sequelize } from './database/database.js';

async function init() {
  try {
    // Prueba la conexión con el motor relacional
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente');

    app.listen(3000, () => {
      console.log('Servidor corriendo en puerto 3000');
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

init();
```

---

## Errores Comunes

- **No envolver `sequelize.authenticate()` en un bloque `try...catch`:** Si PostgreSQL no está corriendo o las credenciales fallan, la aplicación colapsará sin un mensaje claro.
- **Confusión de puerto:** Intentar conectar al puerto predeterminado `5432` cuando PostgreSQL está configurado en un puerto distinto (ej. `5433`).

## Buenas Prácticas

- Probar la conexión a la base de datos antes de levantar el servidor web de Express (`app.listen()`).

## Relación con otros conceptos

- Inicializado desde: [02 - Entorno de Desarrollo Backend con Node Express y Nodemon](<02%20-%20Entorno%20de%20Desarrollo%20Backend%20con%20Node%20Express%20y%20Nodemon.md>)
- Sustenta los esquemas de: [04 - Modelos Atributos y Sincronizacion en Sequelize](<04%20-%20Modelos%20Atributos%20y%20Sincronizacion%20en%20Sequelize.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Qué ventaja ofrece utilizar un ORM como Sequelize frente a escribir consultas SQL puras con cadenas de texto?
2. **Diagnóstico:** Si DBeaver no muestra la base de datos recién creada, ¿qué casilla de configuración en DBeaver debes activar para visualizarla?

## Fuente

- **Clase:** Arquitectura del Proyecto y Configuración de PostgreSQL con Sequelize
- **Timestamp:** ~15:00 - 25:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
