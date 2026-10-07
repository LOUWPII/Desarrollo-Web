---
tags:
  - express
  - postgresql
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Express y PostgreSQL
  - Índice Backend
---

# Índice y Mapa de Conocimiento — Backend con Express, PostgreSQL y Sequelize

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Arquitectura Cliente-Servidor y API REST](<01%20-%20Arquitectura%20Cliente%20Servidor%20y%20API%20REST.md>) | Peticiones HTTP, métodos CRUD y herramientas |
| 02 | [Entorno de Desarrollo Backend con Node Express y Nodemon](<02%20-%20Entorno%20de%20Desarrollo%20Backend%20con%20Node%20Express%20y%20Nodemon.md>) | `npm init`, ES Modules, Nodemon y `express.json()` |
| 03 | [Estructura de Proyecto y Conexión a PostgreSQL con Sequelize](<03%20-%20Estructura%20de%20Proyecto%20y%20Conexion%20a%20PostgreSQL%20con%20Sequelize.md>) | ORM, capas y `sequelize.authenticate()` |
| 04 | [Modelos, Atributos y Sincronización en Sequelize](<04%20-%20Modelos%20Atributos%20y%20Sincronizacion%20en%20Sequelize.md>) | `DataTypes`, validaciones, `sync()` y `bulkCreate()` |
| 05 | [Relaciones Relacionales 1:N, N:M y Autorreferenciales](<05%20-%20Relaciones%20Relacionales%201N%20NM%20y%20Autorreferenciales.md>) | `hasMany`, `belongsToMany` y `onDelete: CASCADE` |
| 06 | [Rutas, Controladores y Operaciones CRUD en Express](<06%20-%20Rutas%20Controladores%20y%20Operaciones%20CRUD%20en%20Express.md>) | `express.Router()`, `req/res` y códigos de estado |
| 07 | [Consultas Avanzadas, Eager Loading e Include](<07%20-%20Consultas%20Avanzadas%20Eager%20Loading%20e%20Include.md>) | `include`, problema N+1, `attributes` y seguridad |

---

## 2. Mapa de Conocimiento

```text
Backend Express & PostgreSQL Ecosystem
├── Fundamentos de Red y Arquitectura
│   ├── Arquitectura Cliente-Servidor y REST (01)
│   └── Entorno Node, Express y Nodemon (02)
│
├── Capa de Persistencia y Base de Datos (Sequelize ORM)
│   ├── Estructura y Conexión a PostgreSQL (03)
│   ├── Definición de Modelos y Atributos (04)
│   └── Relaciones 1:N, N:M y Autorreferenciales (05)
│
└── Capa de Aplicación y Exposición de Servicios
    ├── Rutas y Controladores CRUD (06)
    └── Carga Anticipada (Eager Loading / Include) (07)
```

### Explicación de la Relación entre los Conceptos

La arquitectura backend se inicia comprendiendo la **Arquitectura Cliente-Servidor** ([01](<01%20-%20Arquitectura%20Cliente%20Servidor%20y%20API%20REST.md>)), la cual se implementa sobre un **Entorno Node.js y Express** ([02](<02%20-%20Entorno%20de%20Desarrollo%20Backend%20con%20Node%20Express%20y%20Nodemon.md>)).

Para gestionar los datos persistentes de forma segura, el servidor se conecta a **PostgreSQL con Sequelize** ([03](<03%20-%20Estructura%20de%20Proyecto%20y%20Conexion%20a%20PostgreSQL%20con%20Sequelize.md>)). Sobre esta base se construyen los **Modelos y Atributos** ([04](<04%20-%20Modelos%20Atributos%20y%20Sincronizacion%20en%20Sequelize.md>)), los cuales se interconectan mediante **Relaciones Relacionales** ([05](<05%20-%20Relaciones%20Relacionales%201N%20NM%20y%20Autorreferenciales.md>)).

Finalmente, la capa de aplicación expone esta información mediante **Controladores y Rutas CRUD** ([06](<06%20-%20Rutas%20Controladores%20y%20Operaciones%20CRUD%20en%20Express.md>)), optimizando el envío de entidades relacionales hacia el cliente mediante la **Carga Anticipada (`include`)** ([07](<07%20-%20Consultas%20Avanzadas%20Eager%20Loading%20e%20Include.md>)).

---

## 3. Lo Esencial

1. **Separación de Responsabilidades:** El cliente solicita datos mediante peticiones HTTP estandarizadas en JSON y el servidor procesa y retorna los recursos sin permitir acceso directo a la BD.
2. **Arquitectura Modular en Capas:** El proyecto Express debe organizarse dividiendo responsabilidades en carpetas dedicadas: `controllers/`, `database/`, `models/` y `routes/`.
3. **ORM Sequelize:** Abstrae las consultas SQL en métodos JavaScript (`findAll`, `create`, `update`, `destroy`), asegurando la integridad de datos mediante validaciones.
4. **Relaciones Declarativas:** Las relaciones relacionales (1:N, N:M y autorreferenciales) deben configurarse en memoria **antes** de invocar la sincronización (`sequelize.sync()`).
5. **Carga Anticipada (Eager Loading):** La opción `include` resuelve el problema de rendimiento N+1 al realizar un `JOIN` único en SQL, exigiendo el filtrado explícito de `attributes` para no exponer contraseñas.

---

## 4. Debo Saber Hacer

- [ ] Configurar un proyecto Node.js con módulos ES (`"type": "module"`) y un script de desarrollo con Nodemon. → [02](<02%20-%20Entorno%20de%20Desarrollo%20Backend%20con%20Node%20Express%20y%20Nodemon.md>)
- [ ] Instanciar la conexión de Sequelize a PostgreSQL capturando fallos de red con `try...catch` en `sequelize.authenticate()`. → [03](<03%20-%20Estructura%20de%20Proyecto%20y%20Conexion%20a%20PostgreSQL%20con%20Sequelize.md>)
- [ ] Definir modelos de datos con `DataTypes` incluyendo restricciones (`allowNull`, `unique`) e invariantes (`validate`). → [04](<04%20-%20Modelos%20Atributos%20y%20Sincronizacion%20en%20Sequelize.md>)
- [ ] Declarar asociaciones relacionales 1:N y N:M autorreferenciales configurando eliminación en cascada (`onDelete: 'CASCADE'`). → [05](<05%20-%20Relaciones%20Relacionales%201N%20NM%20y%20Autorreferenciales.md>)
- [ ] Implementar un controlador asíncrono para operaciones CRUD retornando códigos HTTP estandarizados (`200`, `204`, `404`, `500`). → [06](<06%20-%20Rutas%20Controladores%20y%20Operaciones%20CRUD%20en%20Express.md>)
- [ ] Configurar enrutadores modulares con `express.Router()` y registrarlos en la instancia principal con `app.use()`. → [06](<06%20-%20Rutas%20Controladores%20y%20Operaciones%20CRUD%20en%20Express.md>)
- [ ] Realizar consultas relacionales optimizadas con `include`, restringiendo las columnas públicas expuestas mediante `attributes`. → [07](<07%20-%20Consultas%20Avanzadas%20Eager%20Loading%20e%20Include.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Usar `sequelize.sync({ force: true })` en producción** | Recrear las tablas borra los datos de forma irrecuperable | [04](<04%20-%20Modelos%20Atributos%20y%20Sincronizacion%20en%20Sequelize.md>) |
| **Omitir `express.json()`** | `req.body` llega como `undefined` en `POST`/`PUT` | [02](<02%20-%20Entorno%20de%20Desarrollo%20Backend%20con%20Node%20Express%20y%20Nodemon.md>) |
| **Omitir la extensión `.js` en Módulos ES** | Rompe la resolución de rutas en Node.js (`ERR_MODULE_NOT_FOUND`) | [02](<02%20-%20Entorno%20de%20Desarrollo%20Backend%20con%20Node%20Express%20y%20Nodemon.md>) |
| **Exponer hashes de contraseñas** | El `include` sin `attributes` filtra el campo `password` al cliente | [07](<07%20-%20Consultas%20Avanzadas%20Eager%20Loading%20e%20Include.md>) |
| **Invertir la secuencia de arranque** | `sync()` antes de `setupRelations()` crea tablas sin claves foráneas | [05](<05%20-%20Relaciones%20Relacionales%201N%20NM%20y%20Autorreferenciales.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Arquitectura)** ¿Por qué es obligatorio configurar el middleware `express.json()` antes de registrar las rutas en una aplicación de Express?
2. **(Diagnóstico / Sequelize)** Al reiniciar tu servidor de desarrollo, notas que todos los registros insertados previamente en PostgreSQL han desaparecido. ¿Qué opción en el código de arranque está causando este comportamiento?
3. **(Diseño / BD)** ¿Cómo estructuras las relaciones en Sequelize para representar un sistema de seguidores/seguidos entre usuarios de la misma tabla?
4. **(Aplicación / Express)** Escribe el código de un controlador Express para actualizar un recurso que retorne un código de estado `404 Not Found` si el ID proporcionado no existe en la BD.
5. **(Seguridad / Consultas)** En una consulta `Tweet.findAll()` que incluye los datos del usuario creador, ¿qué propiedad debes agregar a la instrucción `include` para garantizar que la contraseña del usuario no se envíe al cliente?
