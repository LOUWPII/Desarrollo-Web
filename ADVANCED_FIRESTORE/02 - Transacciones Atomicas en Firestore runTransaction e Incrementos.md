---
tags:
  - firestore
  - transacciones
  - atomicidad
  - likes
aliases:
  - runTransaction
  - FieldValue.increment
  - Transacción de Like
clase: Implementación de Likes mediante Transacciones y Operaciones Atómicas
timestamp: ~15:00 - 28:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Transacciones Atómicas en Firestore: `runTransaction` e Incrementos

## Definición

Las **Transacciones Atómicas** (`db.runTransaction`) garantizan la integridad de los datos ejecutando múltiples lecturas y escrituras como una única unidad lógica. Si ocurre un fallo o pérdida de conexión, se realiza un *rollback* completo. Se combinan con funciones del servidor como `FieldValue.increment()` y `FieldValue.serverTimestamp()`.

## Flujo de Trabajo de una Transacción de Like

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                  db.runTransaction { ... }                  │
 ├─────────────────────────────────────────────────────────────┤
 │ 1. Leer existencia: transaction.get(likeRef)                │
 ├──────────────────────────────┬──────────────────────────────┤
 │   SI EXISTE (Quitar Like)    │  NO EXISTE (Agregar Like)    │
 ├──────────────────────────────┼──────────────────────────────┤
 │ - transaction.delete(likeRef)│ - transaction.set(likeRef,   │
 │ - transaction.update(tweet,  │   mapOf("timestamp" to       │
 │   "likesCount",              │   FieldValue.serverTimestamp())│
 │   FieldValue.increment(-1))  │ - transaction.update(tweet,  │
 │                              │   "likesCount",              │
 │                              │   FieldValue.increment(1))   │
 └──────────────────────────────┴──────────────────────────────┘

```

---

## Implementación Técnica (`TweetFirestoreDataSourceImplementation.kt`)

```kotlin
override suspend fun sendTweetLike(tweetId: String, userId: String) {
    val tweetRef = database.collection("tweets").document(tweetId)
    val likeRef = tweetRef.collection("likes").document(userId)

    database.runTransaction { transaction ->
        val likeDoc = transaction.get(likeRef)

        if (likeDoc.exists()) {
            // Usuario ya dio me gusta -> Eliminar me gusta y decrementar contador
            transaction.delete(likeRef)
            transaction.update(tweetRef, "likesCount", FieldValue.increment(-1))
        } else {
            // Usuario no ha dado me gusta -> Crear documento con fecha de servidor e incrementar
            val data = mapOf("timestamp" to FieldValue.serverTimestamp())
            transaction.set(likeRef, data)
            transaction.update(tweetRef, "likesCount", FieldValue.increment(1))
        }
    }.await() // Suspende hasta que la transacción se confirme en el servidor
}

```

---

## Errores Comunes

* ⚠️ **Inconsistencia de nombres entre DTOs y Firestore:** Escribir `"likes"` en lugar de `"likesCount"` dentro de `transaction.update()` actualizará o creará un campo incorrecto, causando fallos de deserialización en la app.

## Buenas Prácticas

* Usar siempre `FieldValue.increment()` para modificar contadores de forma atómica en lugar de leer el valor actual, sumarle 1 en el cliente y sobreescribirlo, evitando condiciones de carrera.

## Relación con otros conceptos

* Aplica los fundamentos de subcolecciones establecidos en: [01 - Relaciones Muchos a Muchos en NoSQL Subcolecciones y Limite de 1 MB](<01%20-%20Relaciones%20Muchos%20a%20Muchos%20en%20NoSQL%20Subcolecciones%20y%20Limite%20de%201%20MB.md>)
* Suministra la lógica para actualizar el estado visual analizado en: [03 - Subconsultas de Comprobacion de Estado liked y followed en UI](<03%20-%20Subconsultas%20de%20Comprobacion%20de%20Estado%20liked%20y%20followed%20en%20UI.md>)

## Preguntas de repaso

1. **Comprensión:** Explica qué sucede en la base de datos si la conexión de red se interrumpe exactamente después de ejecutar `transaction.delete(likeRef)` pero antes de actualizar el contador `likesCount`.
2. **Aplicación:** Escribe la instrucción de Firestore para decrementar en 1 el contador de un documento usando la operación atómica adecuada.

## Fuente

* **Clase:** Implementación de Likes mediante Transacciones y Operaciones Atómicas
* **Timestamp:** ~15:00 - 28:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
