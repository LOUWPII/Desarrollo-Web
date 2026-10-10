---
tags:
  - firestore
  - nosql
  - android
  - base-de-datos
aliases:
  - NoSQL Firestore
  - Firestore vs SQL
  - Colecciones y Documentos
clase: Contexto de la Clase, Reorganización de Arquitectura, NoSQL vs SQL y Configuración de Firestore
timestamp: ~00:00 - 18:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Paradigma NoSQL Firestore vs SQL Relacional

## Definición

**Google Cloud Firestore** es una base de datos orientada a documentos en la nube (Backend-as-a-Service / BaaS) que organiza la información en **Colecciones** y **Documentos**. A diferencia de los motores relacionales SQL (como PostgreSQL), no utiliza tablas rígidas, filas, columnas, reglas de normalización estrictas ni claves foráneas (*foreign keys*).

## Comparativa de Arquitectura

| Concepto SQL (PostgreSQL) | Concepto NoSQL (Firestore) | Descripción |
| --- | --- | --- |
| **Tabla** | **Colección** | Contenedor de registros. En NoSQL es un contenedor flexible de documentos. |
| **Fila / Registro** | **Documento** | Registro individual compuesto por pares clave-valor (campos). Se identifica por un ID (`String`). |
| **Columna / Atributo** | **Campo** | Atributo dentro del documento. Soporta tipos: `String`, `Number`, `Boolean`, `Map`, `Array`, `Timestamp`, etc. |
| **JOIN (Combinación)** | **Desnormalización / Incrustación** | No existen JOINs nativos. Se duplica la información para resolver lecturas en una sola consulta. |
| **Esquema Rígido** | **Libertad de Esquema** | Un documento en una colección puede tener campos totalmente distintos a otro documento de la misma colección. |

---

## Modos de Reglas de Seguridad en Firebase Console

Durante la fase de desarrollo e integración inicial, la base de datos se configura en **Modo de Prueba** (*Test Mode*):

```javascript
// Reglas temporales de Firebase Console para desarrollo
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}

```

---

## Errores Comunes

- ⚠️ **Guardar tipos de datos inconsistentes:** Asignar un entero `123` a un campo en un documento y guardar la cadena `"123"` para el mismo campo en otro documento de la misma colección provocará excepciones de deserialización por reflexión en la aplicación móvil.
- **Intentar hacer JOINs relacionales:** Buscar hacer consultas complejas combinando colecciones causará cuellos de botella y exceso de llamadas de red.

## Buenas Prácticas

- Diseñar la estructura de colecciones pensando en la forma en que las pantallas de la UI leen la información (*Read-Driven Modeling*), no en la eliminación de redundancias.

## Relación con otros conceptos

- Sustituye la infraestructura relacional expuesta en: [03 - Estructura de Proyecto y Conexion a PostgreSQL con Sequelize](<../EXPRESS+postgress/03%20-%20Estructura%20de%20Proyecto%20y%20Conexion%20a%20PostgreSQL%20con%20Sequelize.md>) (Nota de Backend)
- Se inyecta en el cliente mediante: [02 - Integracion e Inyeccion de Firestore con Dagger Hilt](<02%20-%20Integracion%20e%20Inyeccion%20de%20Firestore%20con%20Dagger%20Hilt.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Cuál es la diferencia de concepto entre una tabla en SQL y una colección en Firestore?
2. **Comparación:** ¿Qué ventajas y desventajas tiene la libertad de esquema de las bases de datos orientadas a documentos?

## Fuente

- **Clase:** Contexto de la Clase, Reorganización de Arquitectura, NoSQL vs SQL y Configuración de Firestore
- **Timestamp:** ~00:00 - 18:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
