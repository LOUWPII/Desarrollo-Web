---
tags:
  - rest
  - http
  - crud
  - verbos
aliases:
  - Verbos HTTP
  - Operaciones CRUD
  - Códigos de Respuesta
clase: Métodos y Verbos HTTP en REST
timestamp: ~07:00 - 11:30 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Verbos HTTP, Operaciones CRUD, Parámetros y Códigos de Respuesta

## Definición

Los **Verbos HTTP** en REST corresponden a los métodos estandarizados que especifican la acción a realizar sobre un recurso. Cada verbo tiene una semántica clara para operaciones **CRUD** (*Create, Read, Update, Delete*), define cómo viajan los parámetros y retorna códigos de estado HTTP estandarizados.

## Mapeo de Verbos HTTP a Operaciones CRUD

| Verbo | Operación | Ubicación de Parámetros | Código HTTP Exitoso | Caso de Uso |
| --- | --- | --- | --- | --- |
| **GET** | Read | Parámetros en URL (`/student/1`) | `200 OK` | Consultar uno o varios recursos sin alterar la BD. |
| **POST** | Create | Datos en el **Body** (JSON) | `201 Created` | Insertar un nuevo recurso en el sistema. |
| **PUT** | Update | Datos en el **Body** + ID | `200 OK` | Actualizar un recurso existente de forma completa. |
| **DELETE** | Delete | Parámetros en URL (`/student/delete/1`) | `200 OK` / `204 No Content` | Eliminar un recurso por su ID. |

---

## Diferencia Semántica entre POST y PUT

A nivel técnico, es posible usar POST para actualizar o PUT para crear. Sin embargo, respetando el estándar REST:

* **POST (`201 Created`):** Crea un recurso nuevo. El servidor suele asignar la Clave Primaria (ID autoincremental).
* **PUT (`200 OK`):** Modifica un recurso existente. Requiere conocer el identificador del recurso a actualizar.

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                Ubicación de los Datos                       │
 ├──────────────────────────────┬──────────────────────────────┤
 │          En la URL           │        En el Body            │
 ├──────────────────────────────┼──────────────────────────────┤
 │ - GET /student/5             │ - POST /student              │
 │ - DELETE /student/delete/5   │   { "nombre": "Juan", ... }  │
 │                              │ - PUT /student/update        │
 │                              │   { "id": 5, "nombre": ... } │
 └──────────────────────────────┴──────────────────────────────┘

```

---

## Errores Comunes

* ⚠️ **Enviar información sensible o pesada en solicitudes GET:** Pasar contraseñas o payloads JSON extensos como parámetros de la URL en peticiones GET en lugar de usar el cuerpo de una petición POST/PUT.

## Buenas Prácticas

* Retornar siempre el código de respuesta HTTP adecuado (`201` para creación, `200` para lectura/actualización, `404` para recurso no encontrado).

## Relación con otros conceptos

* Implementa estos métodos mediante anotaciones en: [07 - Construccion de Endpoints CRUD con RequestBody y PathVariable](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>)
* Son consumidos mediante el cliente HTTP de Angular en: [10 - Integracion de HttpClient Módulos e Interfaces TypeScript en Angular](<10%20-%20Integracion%20de%20HttpClient%20M%C3%B3dulos%20e%20Interfaces%20TypeScript%20en%20Angular.md>)

## Preguntas de repaso

1. **Comparación:** ¿Cuáles son las diferencias principales entre POST y PUT respecto a la semántica, el payload y el código de respuesta HTTP devuelto?
2. **Diagnóstico:** Si ejecutas un `POST` para crear un usuario y el servidor devuelve un código `200 OK` sin haber sido configurado explícitamente, ¿qué estándar se está incumpliendo?

## Fuente

* **Clase:** Métodos y Verbos HTTP en REST
* **Timestamp:** ~07:00 - 11:30 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
