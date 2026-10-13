---
tags:
  - rest
  - json
  - uris
  - stateless
aliases:
  - API REST
  - Stateless
  - URIs
clase: Fundamentos y Arquitectura de las APIs REST
timestamp: ~03:00 - 07:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Fundamentos de Arquitectura API REST: JSON, URIs y Statelessness

## Definición

Una **API (Application Programming Interface)** es una capa de abstracción que define las reglas de comunicación entre sistemas. **REST (Representational State Transfer)** es un estilo de arquitectura de software para construir servicios web ligeros, escalables y desacoplados sobre el protocolo HTTP, utilizando identificadores únicos (**URIs**) y el formato **JSON** para el intercambio de información.

## Principios Fundamentales de REST

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                   Arquitectura REST                         │
 ├─────────────────────────────────────────────────────────────┤
 │ 1. Basado en Recursos: Mapea entidades de negocio a URIs    │
 │    semánticas (ej. /student, /student/1).                   │
 ├─────────────────────────────────────────────────────────────┤
 │ 2. Formato Liviano: Uso estándar de JSON para serialización.│
 ├─────────────────────────────────────────────────────────────┤
 │ 3. Autenticación Desacoplada: Uso de tokens (JWT) en Headers│
 ├─────────────────────────────────────────────────────────────┤
 │ 4. Servidor Sin Estado (Stateless): El backend no guarda    │
 │    memoria de peticiones pasadas del cliente.               │
 └─────────────────────────────────────────────────────────────┘

```

---

## La Propiedad *Stateless* (Sin Estado)

En REST, cada petición enviada por el cliente debe contener toda la información necesaria para que el servidor la entienda y procese (incluyendo credenciales/tokens de autenticación). El backend no mantiene sesiones activas en memoria ni recuerda interacciones previas.

```text
 Cliente (Angular)                        Servidor (Spring Boot)
┌──────────────────┐                     ┌──────────────────────┐
│ Request 1 + JWT  ├────────────────────►│ Procesa e identifica │
└──────────────────┘                     └──────────────────────┘
┌──────────────────┐                     ┌──────────────────────┐
│ Request 2 + JWT  ├────────────────────►│ Procesa sin recordar │
└──────────────────┘                     │ la Request 1         │
                                         └──────────────────────┘

```

---

## Identificación de Recursos mediante URIs

Las URIs (*Uniform Resource Identifiers*) representan nombres o colecciones de recursos, nunca acciones o verbos:

* `/student`: Colección completa de estudiantes.
* `/student/1`: Recurso específico del estudiante con ID 1.
* `/homework/student/1`: Tareas asignadas al estudiante con ID 1.

---

## Errores Comunes

* ⚠️ **Incluir verbos o acciones en las URIs:** Diseñar rutas como `/getStudent` o `/deleteStudent/1` violando la convención REST de utilizar sustantivos y mapear las acciones mediante verbos HTTP.

## Buenas Prácticas

* Usar sustantivos en plural o singular para definir las URIs y dejar que los verbos HTTP (GET, POST, PUT, DELETE) indiquen la operación a realizar.

## Relación con otros conceptos

* Define los verbos que operan sobre estas URIs en: [03 - Verbos HTTP Operaciones CRUD Parametros y Codigos de Respuesta](<03%20-%20Verbos%20HTTP%20Operaciones%20CRUD%20Parametros%20y%20Codigos%20de%20Respuesta.md>)
* Se contrapone al enfoque basado en operaciones de: [04 - Comparativa de Arquitecturas Web REST vs SOAP](<04%20-%20Comparativa%20de%20Arquitecturas%20Web%20REST%20vs%20SOAP.md>)
* Es implementado en Spring Boot en: [05 - Configuracion de Controladores REST y CORS con RestController y CrossOrigin](<05%20-%20Configuracion%20de%20Controladores%20REST%20y%20CORS%20con%20RestController%20y%20CrossOrigin.md>)

## Preguntas de repaso

1. **Comprensión:** Explica qué significa que una API REST sea *Stateless* y cuál es su impacto en la escalabilidad del backend.
2. **Aplicación:** Transforma la siguiente URL incorrecta `/obtenerListaDeEstudiantes` a una ruta semántica bajo el estándar REST.

## Fuente

* **Clase:** Fundamentos y Arquitectura de las APIs REST
* **Timestamp:** ~03:00 - 07:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
