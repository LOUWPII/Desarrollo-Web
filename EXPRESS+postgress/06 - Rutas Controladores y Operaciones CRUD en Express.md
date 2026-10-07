---
tags:
  - express
  - controladores
  - crud
  - rutas
aliases:
  - Rutas y Controladores
  - CRUD en Express
clase: Implementación de Rutas, Controladores y Operaciones CRUD en Express
timestamp: ~01:05:00 - 01:20:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Rutas, Controladores y Operaciones CRUD en Express

## Definición

Los **Controladores** son funciones asíncronas encargadas de procesar las peticiones HTTP (`req`, `res`), interactuar con los modelos de Sequelize y retornar una respuesta con un código de estado adecuado. El **Enrutador** (`express.Router`) empaqueta y asocia los endpoints con sus controladores.

## Implementación del Controlador (`src/controllers/userController.js`)

```javascript
import { User } from '../models/user.js';

// READ - Obtener todos los usuarios (200 OK)
export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// CREATE - Insertar nuevo usuario (200 OK / 201 Created)
export async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UPDATE - Modificar usuario por ID (200 OK / 404 Not Found)
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE - Eliminar usuario por ID (204 No Content)
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.sendStatus(204); // Se envía 204 sin cuerpo
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## Definición de Rutas (`src/routes/userRoutes.js`)

```javascript
import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
```

---

## Registro en la Aplicación Express (`src/app.js`)

```javascript
import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

// Registra los grupos de enrutadores
app.use(userRoutes);

export default app;
```

---

## Errores Comunes

- **Omitir `await` en métodos de Sequelize:** Invocaciones como `User.findByPk(id)` o `user.update()` deben llevar `await`; de lo contrario se responderá al cliente antes de que la operación en la BD se complete.
- **Mezclar `res.sendStatus()` con contenido JSON:** `res.sendStatus(204)` finaliza la respuesta sin cuerpo. Intentar enviar un objeto JSON dentro de un `sendStatus` provocará una excepción de servidor.

## Buenas Prácticas

- Retornar inmediatamente (`return res.status(404)...`) tras detectar que un recurso no existe para detener la ejecución del controlador.

## Relación con otros conceptos

- Atiende peticiones de: [01 - Arquitectura Cliente Servidor y API REST](<01%20-%20Arquitectura%20Cliente%20Servidor%20y%20API%20REST.md>)
- Opera sobre los modelos de: [04 - Modelos Atributos y Sincronizacion en Sequelize](<04%20-%20Modelos%20Atributos%20y%20Sincronizacion%20en%20Sequelize.md>)
- Se extiende en: [07 - Consultas Avanzadas Eager Loading e Include](<07%20-%20Consultas%20Avanzadas%20Eager%20Loading%20e%20Include.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Cuál es la diferencia técnica de respuesta entre `res.status(200).json(...)` y `res.sendStatus(204)`?
2. **Aplicación:** Escribe un controlador Express que busque un registro por clave primaria utilizando `findByPk` y retorne un código 404 en caso de no encontrarlo.

## Fuente

- **Clase:** Implementación de Rutas, Controladores y Operaciones CRUD en Express
- **Timestamp:** ~01:05:00 - 01:20:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
