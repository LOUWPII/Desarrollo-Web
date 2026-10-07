---
tags:
  - express
  - sequelize
  - modelos
aliases:
  - Modelos en Sequelize
  - DataTypes
  - sync()
clase: Definición de Modelos (Tweet, User), Atributos, Sincronización y Poblamiento de Datos
timestamp: ~25:00 - 45:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Modelos, Atributos y Sincronización en Sequelize

## Definición

Un **Modelo** en Sequelize es la representación en código JavaScript de una tabla relacional en PostgreSQL. Define los campos, tipos de datos (`DataTypes`), restricciones (*constraints*) e invariantes de validación. La **Sincronización** (`sequelize.sync()`) es el proceso que crea o actualiza las tablas físicas en la base de datos a partir de las definiciones del código.

## Definición de Modelos

### Modelo User (`src/models/user.js`):

```javascript
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  profileImage: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
});
```

### Modelo Tweet (`src/models/tweet.js`):

```javascript
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Tweet = sequelize.define('tweets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  retweets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  commentsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: true // Genera automáticamente createdAt y updatedAt
});
```

---

## Poblamiento Inicial de Datos (*Bulk Create*)

```javascript
import { Tweet } from '../models/tweet.js';

export async function loadInitialTweets() {
  const count = await Tweet.count();
  if (count === 0) {
    // Inserta múltiples registros masivamente omitiendo la clave primaria 'id'
    await Tweet.bulkCreate([
      { content: 'Mi primer tweet en False Twitter', likes: 5 },
      { content: 'Aprendiendo backend con Express y Sequelize', likes: 12 }
    ]);
    console.log('Tweets iniciales cargados');
  }
}
```

---

## Sincronización y Modos de Ejecución

- `sequelize.sync()`: Crea las tablas solo si no existen previamente.
- `sequelize.sync({ force: true })`: **¡Peligro!** Elimina todas las tablas existentes (`DROP TABLE`) y las recrea desde cero. Usar únicamente durante la fase temprana de desarrollo.

---

## Errores Comunes

- ⚠️ **Usar `{ force: true }` en producción:** Destruye y borra permanentemente todos los datos de la base de datos cada vez que el servidor se reinicia.
- **Incluir la clave primaria `id` en llamadas a `bulkCreate()`:** Puede colisionar con la secuencia del auto-incrementable de PostgreSQL.

## Buenas Prácticas

- Validar siempre los datos a nivel de ORM (`isEmail`, `isUrl`, `allowNull`) antes de que la consulta llegue al motor de PostgreSQL.

## Relación con otros conceptos

- Se conecta a la base de datos creada en: [03 - Estructura de Proyecto y Conexion a PostgreSQL con Sequelize](<03%20-%20Estructura%20de%20Proyecto%20y%20Conexion%20a%20PostgreSQL%20con%20Sequelize.md>)
- Se relaciona mediante: [05 - Relaciones Relacionales 1N NM y Autorreferenciales](<05%20-%20Relaciones%20Relacionales%201N%20NM%20y%20Autorreferenciales.md>)
- Es operado por: [06 - Rutas Controladores y Operaciones CRUD en Express](<06%20-%20Rutas%20Controladores%20y%20Operaciones%20CRUD%20en%20Express.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Qué función cumplen las columnas `createdAt` y `updatedAt` creadas por Sequelize cuando la opción `timestamps` está activa?
2. **Diagnóstico:** Si ejecutas `Tweet.bulkCreate()` con un arreglo que incluye un email inválido, ¿en qué nivel se detiene la ejecución antes de insertar el registro en la BD?

## Fuente

- **Clase:** Definición de Modelos (Tweet, User), Atributos, Sincronización y Poblamiento de Datos
- **Timestamp:** ~25:00 - 45:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
