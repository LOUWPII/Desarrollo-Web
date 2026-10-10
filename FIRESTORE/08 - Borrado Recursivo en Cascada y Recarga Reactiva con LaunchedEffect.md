---
tags:
  - firestore
  - borrado-recursivo
  - compose
  - launchedeffect
aliases:
  - Borrado Recursivo
  - Carga Reactiva
  - LaunchedEffect
clase: Actualización (update), Borrado Recursivo en Cascada (delete) y Carga Reactiva con LaunchedEffect
timestamp: ~74:00 - 80:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Borrado Recursivo en Cascada y Recarga Reactiva con LaunchedEffect

## Definición

Es la implementación de algoritmos de **Eliminación Recursiva** en código Kotlin para borrar documentos padres y todas sus dependencias hijas (respuestas), combinada con el uso del disparador **`LaunchedEffect`** en Jetpack Compose para refrescar las listas cuando el usuario regresa en la pila de navegación.

## Algoritmo de Borrado Recursivo en Cascada

Dado que NoSQL no posee la regla relacional `ON DELETE CASCADE`:

```kotlin
override suspend fun deleteTweet(id: String) {
    // 1. Eliminar el documento objetivo principal
    database.collection("tweets").document(id).delete().await()

    // 2. Buscar las respuestas hijas asociadas al documento eliminado
    val repliesSnapshot = database.collection("tweets")
        .whereEqualTo("parentTweetId", id)
        .get()
        .await()

    // 3. Llamada recursiva para eliminar cada hijo y sus descendientes
    for (doc in repliesSnapshot.documents) {
        deleteTweet(doc.id) // Recursión
    }
}

```

---

## Recarga de Pantallas al Volver en la Pila (`popBackStack`)

### El Problema del Bloque `init` en el ViewModel:

Si la consulta de datos se ubica únicamente dentro del bloque `init { getTweets() }` del ViewModel, al eliminar un elemento en una pantalla secundaria y volver a la pantalla principal mediante el botón "Atrás", la vista **no se actualiza** porque el ViewModel no vuelve a instanciarse.

### La Solución con `LaunchedEffect(Unit)`:

Colocar la petición dentro de `LaunchedEffect(Unit)` en la función Composable garantiza que la consulta se ejecute cada vez que la pantalla entra en composición:

```kotlin
// HomeScreen.kt
@Composable
fun HomeScreen(viewModel: HomeViewModel = hiltViewModel()) {
    val state by viewModel.uiState.collectAsState()

    // Se re-ejecuta cada vez que la pantalla vuelve a la composición activa
    LaunchedEffect(Unit) {
        viewModel.getTweets()
    }

    HomeScreenContent(state = state)
}

```

---

## Errores Comunes

- ⚠️ **Dejar documentos huérfanos:** Eliminar únicamente el tweet padre sin implementar el algoritmo de borrado recursivo dejará las respuestas registradas en la base de datos sin referencia válida.

## Buenas Prácticas

- Usar `LaunchedEffect(Unit)` para consultar datos frescos del servidor cuando la vista reaparece en la jerarquía de Compose.

## Relación con otros conceptos

- Emplea las consultas con filtros de: [07 - Mapeo Manual del Document ID y Consultas con Filtros](<07%20-%20Mapeo%20Manual%20del%20Document%20ID%20y%20Consultas%20con%20Filtros.md>)
- Sincroniza la capa visual descrita en: [07 - Estados de UI Manejo de Carga y Efectos de Navegacion en Compose](<../RETROFIT/07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>) (Nota de API REST)

## Preguntas de repaso

1. **Comprensión:** Explica por qué se requiere un algoritmo recursivo para eliminar un tweet y sus respuestas en Firestore.
2. **Comparación:** ¿Qué diferencia existe entre cargar datos en el bloque `init` del ViewModel versus usar `LaunchedEffect(Unit)` en la pantalla Composable?

## Fuente

- **Clase:** Actualización (update), Borrado Recursivo en Cascada (delete) y Carga Reactiva con LaunchedEffect
- **Timestamp:** ~74:00 - 80:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
