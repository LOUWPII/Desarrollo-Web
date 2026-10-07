---
tags:
  - retrofit
  - crud
  - compose
  - optimizacion
aliases:
  - Operaciones CRUD
  - Eliminación Optimizada
  - Filtrado Local
clase: Implementación del CRUD Completo, Perfil de Usuario y Eliminación Optimizada
timestamp: ~01:15:00 - 01:30:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Operaciones CRUD, Perfil de Usuario y Eliminación Optimizada

## Definición

Es la integración completa de las operaciones de **Consulta**, **Creación**, **Edición** y **Eliminación** a través de la API REST, aplicando técnicas de **Filtrado Local en Memoria** para optimizar la respuesta visual de la UI tras eliminar registros en la base de datos.

## Estrategia de Eliminación Optimizada (Filtrado Local)

Cuando un usuario elimina un elemento (ej. un tweet):

- **Enfoque Ineficiente:** Invocar `deleteTweet(id)`, esperar confirmación y volver a realizar una petición HTTP completa `getTweets()` a la red para refrescar toda la pantalla.
- **Enfoque Optimizado (Filtrado Local):** Invocar `deleteTweet(id)`. Al recibir `Result.success`, el ViewModel remueve inmediatamente el elemento de su lista local en memoria mediante `.filter { it.id != id }`. La lista de Compose se re-renderiza al instante sin consumo de ancho de banda adicional.

---

## Implementación Técnica (`UserProfileViewModel.kt`)

```kotlin
fun deleteTweet(tweetId: String) {
    viewModelScope.launch {
        val result = tweetRepository.deleteTweet(tweetId)
        if (result.isSuccess) {
            // Actualización optimizada en memoria
            _uiState.update { currentState ->
                currentState.copy(
                    tweets = currentState.tweets.filter { it.id != tweetId }
                )
            }
        } else {
            _uiState.update { it.copy(errorMessage = "Error al eliminar el tweet") }
        }
    }
}

```

---

## Ajuste de Serialización HTTP 204 (*No Content*)

Al eliminar un recurso, un servidor backend construido en Express suele responder con un código **HTTP 204 No Content** (sin cuerpo JSON).

⚠️ **Advertencia de Deserialización:**
Si el método del servicio de Retrofit declara que devuelve una entidad (ej. `suspend fun deleteTweet(...): TweetDto`), Retrofit lanzará una excepción al intentar deserializar un cuerpo vacío. Por ello, los métodos de eliminación que devuelven HTTP 204 deben declararse con tipo de retorno `Unit` o ser procesados adecuadamente.

```kotlin
// Declaración correcta para endpoints que responden HTTP 204
@DELETE("tweets/{id}")
suspend fun deleteTweet(@Path("id") id: String) // Retorna Unit de forma implícita

```

---

## Errores Comunes

- ⚠️ **Parpadeo por recarga completa:** Recargar toda la lista desde la red tras una eliminación en lugar de aplicar el filtrado local sobre el `UI State`.

## Buenas Prácticas

- Usar `LaunchedEffect(Unit)` en las pantallas Compose para activar la carga inicial de datos cuando el componente entra por primera vez en la composición.

## Relación con otros conceptos

- Cierra el flujo de arquitectura iniciado en: [01 - Reorganizacion de UI y Migracion de Identificadores a String](<01%20-%20Reorganizacion%20de%20UI%20y%20Migracion%20de%20Identificadores%20a%20String.md>)
- Aplica el filtrado sobre los estados de: [07 - Estados de UI Manejo de Carga y Efectos de Navegacion en Compose](<07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>)

## Preguntas de repaso

1. **Comprensión:** ¿En qué consiste la técnica de filtrado local en memoria al eliminar un registro y qué ventajas ofrece respecto a realizar una nueva consulta HTTP?
2. **Diagnóstico:** Si la API REST responde con un código HTTP 204 tras eliminar un recurso pero Android lanza una excepción de deserialización, ¿cómo debes corregir la firma del método en el servicio de Retrofit?

## Fuente

- **Clase:** Implementación del CRUD Completo, Perfil de Usuario y Eliminación Optimizada
- **Timestamp:** ~01:15:00 - 01:30:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
