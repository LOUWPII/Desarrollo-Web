---
tags:
  - firestore
  - consultas
  - document-id
  - filtros
aliases:
  - Mapeo Manual del Document ID
  - Consultas con Filtros
  - whereEqualTo
clase: Mapeo Manual del Document ID y Consultas con Filtros (getTweets, getReplies, getUserTweets)
timestamp: ~65:00 - 74:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Mapeo Manual del Document ID y Consultas con Filtros

## Definición

Es la técnica para recuperar e inyectar manualmente la clave primaria de la raíz del documento de Firestore (`doc.id`) dentro de la propiedad `id` de la clase DTO deserializada, combinada con el uso de consultas filtradas mediante `whereEqualTo`.

## El Problema del Document ID Nulo

Al ejecutar `snapshot.toObject(TweetDto::class.java)`, la propiedad `id` de la `data class` resulta nula o vacía porque la clave primaria en Firestore es la **etiqueta raíz del documento**, no un campo interno del JSON.

```text
Documento ID: "7kX9aP2mL"  ──► { "content": "Hola", "userId": "123" }
                                         │
                                         ▼ snapshot.toObject()
                            TweetDto(id = null, content = "Hola", ...) ❌

```

---

## Solución Técnica con Mapeo Manual (`.copy(id = doc.id)`)

```kotlin
// TweetFirestoreDataSourceImplementation.kt
override suspend fun getAllTweets(): List<TweetDto> {
    val snapshot = database.collection("tweets").get().await()
    
    // Mapea la lista de documentos inyectando el ID de la raíz
    return snapshot.documents.mapNotNull { doc ->
        val tweet = doc.toObject(TweetDto::class.java)
        tweet?.copy(id = doc.id) // Sobrescribe el ID nulo con la clave del documento
    }
}

```

---

## Consultas Filtradas con `whereEqualTo`

Para consultar subconjuntos de datos (como las respuestas asociadas a un tweet padre o los tweets creados por un usuario específico), se utiliza el método `whereEqualTo`:

```kotlin
// Obtener respuestas de un tweet padre
override suspend fun getReplies(parentId: String): List<TweetDto> {
    val snapshot = database.collection("tweets")
        .whereEqualTo("parentTweetId", parentId) // Equivalente a WHERE parentTweetId = parentId
        .get()
        .await()
        
    return snapshot.documents.mapNotNull { doc ->
        doc.toObject(TweetDto::class.java)?.copy(id = doc.id)
    }
}

```

---

## Errores Comunes

- ⚠️ **Inconsistencia de tipos en campos de documentos antiguos:** Si existen documentos previos guardados manualmente en la consola con un `userId` como entero (`123`), Firestore colapsará al intentar deserializarlos en un DTO con `userId: String`. Es obligatorio purgar la colección de datos inconsistentes.

## Buenas Prácticas

- Usar `mapNotNull` para descartar silenciosamente documentos defectuosos que no puedan ser deserializados.

## Relación con otros conceptos

- Inyecta el identificador migrado en: [01 - Reorganizacion de UI y Migracion de Identificadores a String](<../RETROFIT/01%20-%20Reorganizacion%20de%20UI%20y%20Migracion%20de%20Identificadores%20a%20String.md>)
- Se utiliza para la eliminación jerárquica en: [08 - Borrado Recursivo en Cascada y Recarga Reactiva con LaunchedEffect](<08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué la propiedad `id` de un DTO permanece nula tras ejecutar `doc.toObject()` en Firestore?
2. **Aplicación:** Escribe el bloque de código con `mapNotNull` y `.copy()` para extraer una lista de documentos inyectando su ID.

## Fuente

- **Clase:** Mapeo Manual del Document ID y Consultas con Filtros (getTweets, getReplies, getUserTweets)
- **Timestamp:** ~65:00 - 74:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
