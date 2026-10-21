---
tags:
  - firestore
  - flujos
  - corrutinas
  - tiempo-real
aliases:
  - callbackFlow
  - addSnapshotListener
  - Escucha en vivo con Flow
clase: Escucha de Datos en Vivo en Firestore con Kotlin Flow (callbackFlow)
timestamp: ~50:00 - 67:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Flujos Reactivos en Tiempo Real con `callbackFlow` y `addSnapshotListener`

## Definición

**`callbackFlow`** es un constructor de corrutinas de Kotlin que transforma *listeners* asíncronos basados en callbacks (como `addSnapshotListener` de Firestore) en flujos reactivos de tipo **`Flow`**. Permite emitir actualizaciones continuas en tiempo real desde la base de datos hacia los ViewModels de Android.

## Anatomía de un `callbackFlow` en Firestore

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                     callbackFlow { ... }                    │
 ├─────────────────────────────────────────────────────────────┤
 │ 1. Suscribir listener: addSnapshotListener { snapshot, e -> │
 │ 2. Validar errores: close(error)                            │
 │ 3. Emitir datos: trySend(tweets)                            │
 │ 4. Limpieza obligatoria: awaitClose { listener.remove() }   │
 └─────────────────────────────────────────────────────────────┘

```

---

## Implementación Técnica (`TweetFirestoreDataSourceImplementation.kt`)

```kotlin
fun listenAllTweets(): Flow<List<TweetDto>> = callbackFlow {
    // 1. Establecer el canal en tiempo real
    val listener = database.collection("tweets")
        .addSnapshotListener { snapshot, error ->
            if (error != null) {
                close(error) // Cierra el flujo si hay un error
                return@addSnapshotListener
            }
            if (snapshot != null) {
                val tweets = snapshot.documents.mapNotNull { doc ->
                    doc.toObject(TweetDto::class.java)?.copy(id = doc.id)
                }
                trySend(tweets) // Emite los nuevos datos al Flow
            }
        }

    // 2. Limpieza al destruir la pantalla o cancelar la corrutina
    awaitClose { listener.remove() }
}

```

---

## Consumo en ViewModel (`HomeViewModel.kt`)

```kotlin
fun getTweetsLive() {
    viewModelScope.launch {
        _uiState.update { it.copy(isLoading = true) }
        tweetRepository.getTweetsLive()
            .catch { error ->
                _uiState.update { it.copy(isLoading = false, errorMessage = error.message) }
            }
            .collect { tweetsList ->
                _uiState.update { it.copy(isLoading = false, tweets = tweetsList) }
            }
    }
}

```

---

## Errores Comunes

* ⚠️ **Omitir `awaitClose { listener.remove() }`:** El *listener* de Firestore permanecerá activo en segundo plano tras destruir la vista, causando fuga de memoria (*memory leak*) y consumo excesivo de lecturas facturables.

## Buenas Prácticas

* Manejar los errores del flujo usando el operador `.catch { ... }` en lugar de bloques `try/catch` tradicionales alrededor de `.collect`.

## Relación con otros conceptos

* Se evalúa frente al impacto financiero analizado en: [06 - Analisis de Costos Degradacion de Feed y Teoria Live Location](<06%20-%20Analisis%20de%20Costos%20Degradacion%20de%20Feed%20y%20Teoria%20Live%20Location.md>)

## Preguntas de repaso

1. **Comprensión:** Explica el rol que cumple la función `awaitClose` dentro de la estructura de un `callbackFlow`.
2. **Aplicación:** Escribe el bloque en Kotlin para capturar los errores de un `Flow` y recolectar sus datos dentro de un ViewModel.

## Fuente

* **Clase:** Escucha de Datos en Vivo en Firestore con Kotlin Flow (callbackFlow)
* **Timestamp:** ~50:00 - 67:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
