---
tags:
  - firestore
  - ui
  - subconsultas
  - compose
aliases:
  - liked y followed
  - Estado de Like en UI
  - Banderas booleanas en DTOs
clase: Verificación del Estado de Like del Usuario y Renderizado en UI (liked)
timestamp: ~28:00 - 35:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Subconsultas de Comprobación de Estado: `liked` y `followed` en UI

## Definición

Es la técnica de lectura que verifica si el usuario autenticado tiene un documento activo dentro de una subcolección (`likes` o `followers`), inyectando banderas booleanas (`liked: Boolean`, `followed: Boolean`) en los DTOs/modelos de UI para alternar componentes e iconos visuales en Jetpack Compose.

## Lógica de Verificación en Data Source

```kotlin
// Verificación para un Tweet (liked)
if (!currentUserId.isNullOrEmpty()) {
    val likeSnapshot = tweetRef.collection("likes").document(currentUserId).get().await()
    if (likeSnapshot.exists()) {
        tweet.liked = true // Inyecta el estado para la UI
    }
}

```

---

## Mapeo Visual en Jetpack Compose (`TweetDetailScreen.kt`)

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                    Evaluación del Estado                    │
 ├──────────────────────────────┬──────────────────────────────┤
 │      state.tweet.liked       │     state.user.followed      │
 ├──────────────────────────────┼──────────────────────────────┤
 │ true  ──► Icons.Filled.      │ true  ──► Botón "Siguiendo"  │
 │           Favorite (Azul)    │           (Opcion de unfollow)│
 │                              │                              │
 │ false ──► Icons.Outlined.    │ false ──► Botón "Seguir"     │
 │           FavoriteBorder     │                              │
 └──────────────────────────────┴──────────────────────────────┘

```

---

## Errores Comunes

* ⚠️ **Asumir estado local sin consultar Firestore:** Modificar únicamente el valor en memoria del cliente sin validar con una subconsulta previa puede mostrar corazones o botones de seguimiento incorrectos tras reiniciar la app.

## Buenas Prácticas

* Realizar subconsultas livianas dirigidas directamente al ID del documento (`collection.document(currentUserId).get()`) en lugar de listar la subcolección entera.

## Relación con otros conceptos

* Renderiza el resultado de las transacciones descritas en: [02 - Transacciones Atomicas en Firestore runTransaction e Incrementos](<02%20-%20Transacciones%20Atomicas%20en%20Firestore%20runTransaction%20e%20Incrementos.md>)
* Se integra con la subcolección espejo detallada en: [04 - Subcolecciones Espejo followers y following para Sistema de Seguimiento](<04%20-%20Subcolecciones%20Espejo%20followers%20y%20following%20para%20Sistema%20de%20Seguimiento.md>)

## Preguntas de repaso

1. **Comprensión:** Explica cómo influye la propiedad `liked` en la elección del icono a renderizar dentro de una pantalla construida con Jetpack Compose.
2. **Aplicación:** Escribe el bloque de código en Kotlin que valide si el usuario actual sigue a un perfil consultando la ruta `users/{targetUserId}/followers/{currentUserId}`.

## Fuente

* **Clase:** Verificación del Estado de Like del Usuario y Renderizado en UI (liked)
* **Timestamp:** ~28:00 - 35:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
