---
tags:
  - express
  - sequelize
  - relaciones
aliases:
  - Relaciones en Sequelize
  - 1:N
  - N:M
  - Autorreferencial
clase: Relaciones entre Tablas (1 a Muchos, Muchos a Muchos y Autorreferenciales)
timestamp: ~45:00 - 01:05:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Relaciones Relacionales 1:N, N:M y Autorreferenciales

## Definición

Las **Relaciones en Sequelize** permiten asociar tablas mediante claves foráneas (*foreign keys*). Soportan relaciones **1 a Muchos (1:N)**, **Muchos a Muchos (N:M)** y **Autorreferenciales** (asociaciones entre registros de la misma tabla).

## Tipos de Relaciones Implementadas

```text
 ┌─────────────┐       1:N (hasMany / belongsTo)        ┌─────────────┐
 │    User     │ ─────────────────────────────────────► │    Tweet    │
 └──────┬──────┘                                        └──────┬──────┘
        │                                                      │
        │ N:M Autorreferencial                                 │ 1:N Autorreferencial
        ▼ (through: Follower)                                  ▼ (parentTweetId)
 ┌─────────────┐                                        ┌─────────────┐
 │  Follower   │                                        │   Replies   │
 └─────────────┘                                        └─────────────┘
```

---

## Configuración Completa (`src/database/relations.js`)

```javascript
import { User } from '../models/user.js';
import { Tweet } from '../models/tweet.js';
import { Follower } from '../models/follower.js';

export function setupRelations() {
  // 1. Relación 1:N - Un Usuario tiene muchos Tweets
  User.hasMany(Tweet, {
    foreignKey: 'userId',
    as: 'tweets',
    onDelete: 'CASCADE',
    hooks: true
  });
  Tweet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // 2. Relación N:M Autorreferencial - Seguidores y Seguidos
  User.belongsToMany(User, {
    through: Follower,
    as: 'following',
    foreignKey: 'followerId',
    otherKey: 'followingId'
  });
  User.belongsToMany(User, {
    through: Follower,
    as: 'followers',
    foreignKey: 'followingId',
    otherKey: 'followerId'
  });

  // 3. Relación 1:N Autorreferencial - Tweet Padre y Respuestas (Replies)
  Tweet.hasMany(Tweet, {
    foreignKey: 'parentTweetId',
    as: 'replies',
    onDelete: 'CASCADE',
    hooks: true
  });
  Tweet.belongsTo(Tweet, { foreignKey: 'parentTweetId', as: 'parentTweet' });
}
```

---

## Orden Estricto de Inicialización (`src/index.js`)

Para que PostgreSQL cree correctamente las restricciones de clave foránea, las relaciones deben declararse **antes** de sincronizar Sequelize.

```javascript
async function init() {
  await sequelize.authenticate();

  // 1. Configurar relaciones en memoria
  setupRelations();

  // 2. Sincronizar modelos con la BD
  await sequelize.sync({ force: true });

  // 3. Poblar datos jerárquicamente (primero Padres, luego Hijos)
  await loadInitialUsers();
  await loadInitialTweets();

  app.listen(3000);
}
```

---

## Errores Comunes

- **Colisión de alias (`as`):** Usar un alias que coincida con el nombre de una propiedad nativa del modelo provocará errores de sobrescritura.
- **Invertir el orden de arranque:** Llamar a `sequelize.sync()` antes de invocar `setupRelations()` creará las tablas sin claves foráneas.

## Buenas Prácticas

- Usar `onDelete: 'CASCADE'` con `hooks: true` para garantizar la limpieza de registros huérfanos cuando se elimina la entidad padre.

## Relación con otros conceptos

- Conecta estructuralmente los modelos de: [04 - Modelos Atributos y Sincronizacion en Sequelize](<04%20-%20Modelos%20Atributos%20y%20Sincronizacion%20en%20Sequelize.md>)
- Permite la carga cruzada en: [07 - Consultas Avanzadas Eager Loading e Include](<07%20-%20Consultas%20Avanzadas%20Eager%20Loading%20e%20Include.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Cómo identifica Sequelize si un registro en la tabla `tweets` es un tweet original o una respuesta a otro tweet según la columna `parentTweetId`?
2. **Aplicación:** Escribe la definición de una relación N:M entre dos usuarios utilizando la tabla intermedia `Follower`.

## Fuente

- **Clase:** Relaciones entre Tablas (1 a Muchos, Muchos a Muchos y Autorreferenciales)
- **Timestamp:** ~45:00 - 01:05:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
