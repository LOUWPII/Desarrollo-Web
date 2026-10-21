---
tags:
  - firestore
  - follow
  - subcolecciones-espejo
  - transacciones
aliases:
  - followers y following
  - Sistema de Seguimiento
  - Espejo de Subcolecciones
clase: Sistema de Seguir y Dejar de Seguir Usuarios (Follow / Unfollow)
timestamp: ~35:00 - 50:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Subcolecciones Espejo: `followers` y `following` para Sistema de Seguimiento

## Definición

Las **Subcolecciones Espejo** son un patrón de diseño en NoSQL No-Relacional donde una acción de seguimiento (*Follow*) actualiza simultáneamente dos subcolecciones independientes (`following` en el originador y `followers` en el destinatario) y dos contadores desnormalizados (`followingCount` y `followersCount`) mediante una única transacción atómica.

## Arquitectura de 4 Operaciones Atómicas

```text
 Acción: Usuario A (123) sigue a Usuario B (987)

 ┌─────────────────────────────────────────────────────────────┐
 │                  db.runTransaction { ... }                  │
 ├─────────────────────────────────────────────────────────────┤
 │ 1. Creación: users/123/following/987                        │
 │ 2. Creación: users/987/followers/123                        │
 │ 3. Actualización: Incrementa followingCount en users/123    │
 │ 4. Actualización: Incrementa followersCount en users/987    │
 └─────────────────────────────────────────────────────────────┘

```

---

## Implementación Técnica (`UserFirestoreDataSourceImplementation.kt`)

```kotlin
override suspend fun followOrUnfollowUser(currentUserId: String, targetUserId: String) {
    val currentUserRef = database.collection("users").document(currentUserId)
    val targetUserRef = database.collection("users").document(targetUserId)

    val followingRef = currentUserRef.collection("following").document(targetUserId)
    val followersRef = targetUserRef.collection("followers").document(currentUserId)

    database.runTransaction { transaction ->
        val followingDoc = transaction.get(followingRef)

        if (followingDoc.exists()) {
            // Dejar de seguir: 4 operaciones inversas
            transaction.delete(followingRef)
            transaction.delete(followersRef)
            transaction.update(currentUserRef, "followingCount", FieldValue.increment(-1))
            transaction.update(targetUserRef, "followersCount", FieldValue.increment(-1))
        } else {
            // Seguir: 4 operaciones de adición
            val data = mapOf("timestamp" to FieldValue.serverTimestamp())
            transaction.set(followingRef, data)
            transaction.set(followersRef, data)
            transaction.update(currentUserRef, "followingCount", FieldValue.increment(1))
            transaction.update(targetUserRef, "followersCount", FieldValue.increment(1))
        }
    }.await()
}

```

---

## Errores Comunes

* ⚠️ **Errar en el nombre de las subcolecciones (ej. `follower` en singular):** Causa asimetría crítica en la base de datos, donde el usuario A figura como siguiendo a B, pero B no registra al seguidor A.

## Buenas Prácticas

* Centralizar los nombres de subcolecciones en constantes globales para evitar errores tipográficos en las cadenas de texto.

## Relación con otros conceptos

* Garantiza la consistencia atómica mediante: [02 - Transacciones Atomicas en Firestore runTransaction e Incrementos](<02%20-%20Transacciones%20Atomicas%20en%20Firestore%20runTransaction%20e%20Incrementos.md>)
* Desencadena notificaciones push personalizadas descritas en: [09 - Notificaciones Push Personalizadas Dirigidas por Eventos en FCM](<09%20-%20Notificaciones%20Push%20Personalizadas%20Dirigidas%20por%20Eventos%20en%20FCM.md>)

## Preguntas de repaso

1. **Diseño:** Menciona las 4 operaciones exactas que deben ejecutarse dentro de una transacción cuando el Usuario A sigue al Usuario B.
2. **Diagnóstico:** Si la subcolección `following` se actualiza pero el contador `followersCount` de la contraparte no cambia, ¿qué falló en el diseño de la llamada?

## Fuente

* **Clase:** Sistema de Seguir y Dejar de Seguir Usuarios (Follow / Unfollow)
* **Timestamp:** ~35:00 - 50:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
