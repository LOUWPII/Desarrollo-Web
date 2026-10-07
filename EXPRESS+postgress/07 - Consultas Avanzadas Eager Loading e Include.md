---
tags:
  - express
  - sequelize
  - consultas
  - eager-loading
aliases:
  - Eager Loading
  - Include
  - Problema N+1
clase: Consultas Avanzadas, Filtrado y Carga Relacionada (Eager Loading / Include)
timestamp: ~01:20:00 - 01:30:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Consultas Avanzadas, Carga Anticipada (Eager Loading) e Include

## Definición

La **Carga Anticipada** (*Eager Loading*) es una técnica de consulta relacional que permite adjuntar datos asociados de otras tablas mediante cláusulas `JOIN` de SQL dentro de una única petición HTTP, utilizando la opción `include` de Sequelize.

## Prevención del Problema de Consultas N+1

Sin Eager Loading, para mostrar 10 tweets con los datos de sus autores, la aplicación realizaría 1 consulta para traer los tweets y 10 consultas adicionales a la tabla `users` (11 peticiones en total). Con `include`, Sequelize realiza **una sola consulta SQL con `LEFT OUTER JOIN`**.

---

## Consultas Avanzadas (`src/controllers/tweetController.js`)

```javascript
import { Tweet } from '../models/tweet.js';
import { User } from '../models/user.js';

// 1. Eager Loading con Selección Explícita de Atributos públicos
export async function getTweets(req, res) {
  try {
    const tweets = await Tweet.findAll({
      include: [{
        model: User,
        as: 'user', // Debe coincidir con el alias definido en setupRelations()
        attributes: ['id', 'username', 'name', 'profileImage'] // Omitir passwords por seguridad
      }]
    });
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 2. Filtrado (where) y Ordenamiento (order) de Respuestas
export async function getReplies(req, res) {
  try {
    const { id } = req.params;
    const replies = await Tweet.findAll({
      where: { parentTweetId: id },
      order: [['createdAt', 'DESC']] // Orden descendente por fecha
    });
    res.json(replies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 3. Obtener Tweets de un Usuario Específico
export async function getUserTweets(req, res) {
  try {
    const { id } = req.params;
    const userTweets = await Tweet.findAll({
      where: { userId: id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'name', 'profileImage']
      }]
    });
    res.json(userTweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## Advertencias de Seguridad

⚠️ **Exposición Inadvertida de Datos Sensibles:**
Si no se utiliza la propiedad `attributes: ['id', 'username', ...]` dentro de la cláusula `include`, Sequelize incluirá todos los campos del modelo relacionado, exponiendo hashes de contraseñas (`password`) en las respuestas JSON públicas de la API.

---

## Errores Comunes

- **Incoherencia en el alias (`as`):** Si en `setupRelations` definiste `User.hasMany(Tweet, { as: 'tweets' })` pero en la consulta escribes `include: [{ model: User, as: 'usuario' }]`, Sequelize lanzará un error de asociación no encontrada.

## Buenas Prácticas

- Filtrar siempre las columnas sensibles de usuarios utilizando la opción `attributes` dentro de los `include`.

## Relación con otros conceptos

- Requiere las asociaciones definidas en: [05 - Relaciones Relacionales 1N NM y Autorreferenciales](<05%20-%20Relaciones%20Relacionales%201N%20NM%20y%20Autorreferenciales.md>)
- Retorna las respuestas procesadas en: [06 - Rutas Controladores y Operaciones CRUD en Express](<06%20-%20Rutas%20Controladores%20y%20Operaciones%20CRUD%20en%20Express.md>)

## Preguntas de repaso

1. **Comprensión:** ¿En qué consiste el problema de rendimiento N+1 en bases de datos relacionales y cómo lo resuelve la cláusula `include`?
2. **Aplicación:** Escribe una consulta `Tweet.findAll()` que devuelva únicamente las respuestas a un tweet ordenadas de la más reciente a la más antigua.

## Fuente

- **Clase:** Consultas Avanzadas, Filtrado y Carga Relacionada (Eager Loading / Include)
- **Timestamp:** ~01:20:00 - 01:30:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
