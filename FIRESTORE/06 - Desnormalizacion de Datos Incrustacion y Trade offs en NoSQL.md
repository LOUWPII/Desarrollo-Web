---
tags:
  - firestore
  - nosql
  - desnormalizacion
aliases:
  - Desnormalización de Datos
  - Incrustación en NoSQL
  - Trade-offs
clase: Creación de Tweets, Estrategia de Desnormalización y Manejo de Integridad en NoSQL
timestamp: ~43:00 - 65:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Desnormalización de Datos, Incrustación y Trade-offs en NoSQL

## Definición

La **Desnormalización** es la práctica intencional en bases de datos NoSQL de duplicar e incrustar información relevante de un documento autor (como `name`, `username`, `profileImage`) dentro de los documentos de otra colección (`tweets`), con el objetivo de permitir lecturas ultra-rápidas en una sola consulta sin recurrir a JOINs.

## Estructura Desnormalizada de un Tweet

```json
// Documento dentro de la colección "tweets"
{
  "content": "Mi comentario en la red social",
  "userId": "Bw9Xk2Lp...",
  "parentTweetId": null,
  "user": {
    "name": "Juan Pérez",
    "username": "juanperez",
    "profileImage": "https://firebasestorage.../avatar.jpg"
  }
}

```

---

## Implementación de DTOs Desnormalizados

```kotlin
// Sub-DTO anidado para incrustar datos de autor
data class CreateTweetUserDto(
    val name: String? = null,
    val username: String? = null,
    val profileImage: String? = null
)

// DTO de creación de tweet
data class CreateTweetDto(
    val content: String,
    val userId: String,
    val parentTweetId: String? = null,
    val user: CreateTweetUserDto? = null // Objeto anidado opcional
)

```

---

## Análisis de Compromisos (*Trade-offs*)

| Aspecto | Ventaja | Desventaja / Problema |
| --- | --- | --- |
| **Rendimiento de Lectura** | Maximizado. El feed carga los tweets y los datos de sus autores en **una sola consulta de red**. | Ninguna. |
| **Integridad de Datos** | N/A | Si el usuario cambia su foto de perfil en el futuro, los tweets pasados conservan la foto antigua (**Incoherencia histórica**). |

---

## Estrategias para Afrontar la Incoherencia en NoSQL

1. **Aceptar la incoherencia histórica:** Comportamiento estándar en grandes redes sociales (un tweet de 2015 conserva la foto de usuario de 2015).
2. **Actualización diferida por eventos:** Usar *Cloud Functions* en segundo plano para actualizar los documentos del usuario al cambiar su perfil.
3. **Restricción de mutabilidad:** Exigir URLs fijas para imágenes de perfil.

---

## Errores Comunes

- ⚠️ **Declarar el sub-objeto como no nulo obligatorio (`user: CreateTweetUserDto`):** Al conmutar el DataSource hacia Express/Retrofit, la API de Node.js no espera el objeto `user` en el cuerpo del `POST`, provocando errores si no es declarado opcional (`user: CreateTweetUserDto? = null`).

## Buenas Prácticas

- Orquestar múltiples DataSources en el Repositorio para recolectar metadatos del usuario antes de instanciar y guardar un DTO desnormalizado.

## Relación con otros conceptos

- Es una consecuencia del paradigma descrito en: [01 - Paradigma NoSQL Firestore vs SQL Relacional](<01%20-%20Paradigma%20NoSQL%20Firestore%20vs%20SQL%20Relacional.md>)
- Modifica los métodos de inserción de: [07 - Mapeo Manual del Document ID y Consultas con Filtros](<07%20-%20Mapeo%20Manual%20del%20Document%20ID%20y%20Consultas%20con%20Filtros.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué la falta de JOINs nativos en Firestore obliga a desnormalizar datos al guardar un registro?
2. **Diseño:** ¿Qué problema de inconsistencia de datos se genera si un usuario cambia su nombre de perfil en una base NoSQL desnormalizada?

## Fuente

- **Clase:** Creación de Tweets, Estrategia de Desnormalización y Manejo de Integridad en NoSQL
- **Timestamp:** ~43:00 - 65:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
