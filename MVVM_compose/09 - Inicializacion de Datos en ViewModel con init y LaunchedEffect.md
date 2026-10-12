---
tags:
  - mvvm
  - viewmodel
  - launchedeffect
  - init
aliases:
  - init en ViewModel
  - LaunchedEffect
  - Inicialización de Datos
clase: ViewModel en HomeScreen e Inicialización con el Método init / Carga de Datos Parametrizada en UI con LaunchedEffect
timestamp: ~01:00:00 - 01:16:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Inicialización de Datos en ViewModel con `init` y `LaunchedEffect`

## Definición

Son las dos estrategias utilizadas para desencadenar la carga inicial de datos desde fuentes remotas o locales hacia el `ViewModel`: el bloque **`init`** para cargas síncronas/autónomas al instanciar el ViewModel, y **`LaunchedEffect`** para cargas que requieren parámetros dinámicos provenientes de la ruta de navegación.

## Comparativa de Inicialización

| Criterio | Bloque `init` en ViewModel | `LaunchedEffect` en la UI |
| --- | --- | --- |
| **Punto de Ejecución** | Inmediatamente tras la construcción de la clase Kotlin. | Cuando el Composable entra en la composición activa. |
| **Parámetros Dinámicos** | **No soporta parámetros de ruta** (salvo uso de `SavedStateHandle` o Factories). | **Ideal para recibir argumentos de ruta** (ej. `tweetId`). |
| **Caso de Uso Principal** | Cargas de datos estáticas o globales (ej. lista inicial del Feed). | Cargas parametrizadas de pantallas de detalle. |

---

## Carga Síncrona / Autónoma con `init` (`HomeViewModel.kt`)

```kotlin
class HomeViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(HomeState())
    val uiState: StateFlow<HomeState> = _uiState.asStateFlow()

    // El bloque init se ejecuta automáticamente al instanciar la clase
    init {
        loadInitialTweets()
    }

    private fun loadInitialTweets() {
        val tweets = LocalTweetProvider.getTweets()
        _uiState.update { it.copy(tweets = tweets) }
    }
}

```

---

## Carga Parametrizada desde la UI con `LaunchedEffect` (`TweetDetailScreen.kt`)

Para pantallas de detalle que dependen de un argumento enviado en la ruta (`tweetId`):

```kotlin
@Composable
fun TweetDetailScreen(
    tweetId: Int,
    detailViewModel: DetailViewModel = viewModel()
) {
    val state by detailViewModel.uiState.collectAsState()

    // Se ejecuta al entrar la vista en composición
    LaunchedEffect(tweetId) {
        detailViewModel.getTweetById(tweetId)
        detailViewModel.getReplies(tweetId)
    }

    // Manejo defensivo de estados nulables
    if (state.tweet == null) {
        Text("Cargando o Tweet no encontrado...")
    } else {
        TweetDetailContent(tweet = state.tweet!!)
    }
}

```

---

## Errores Comunes

* ⚠️ **Cargar datos sin clave en `LaunchedEffect`:** No pasar el argumento (`tweetId`) como clave de `LaunchedEffect` impedirá que la consulta se vuelva a ejecutar si el usuario cambia de elemento sin destruir la pantalla.

## Buenas Prácticas

* Declarar las entidades cargadas asíncronamente como nulables (`val tweet: TweetInfo? = null`) en el `UIState` para representar visualmente el estado de carga inicial.

## Relación con otros conceptos

* Puebla los datos almacenados en las clases definidas en: [06 - Patron UI State Agrupacion en Data Class e Inmutabilidad con copy](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)
* Complementa la carga reactiva analizada en: [08 - Borrado Recursivo en Cascada y Recarga Reactiva con LaunchedEffect](<../FIRESTORE/08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>) (Nota de Firestore)

## Preguntas de repaso

1. **Comprensión:** Explica por qué se prefiere utilizar `LaunchedEffect` sobre el bloque `init` del ViewModel para cargar la información de una pantalla de detalle parametrizada.
2. **Aplicación:** Escribe la llamada con `LaunchedEffect` que ejecute la función `fetchUserProfile(userId)` cuando el valor de `userId` cambie.

## Fuente

* **Clase:** ViewModel en HomeScreen e Inicialización con el Método init / Carga de Datos Parametrizada en UI con LaunchedEffect
* **Timestamp:** ~01:00:00 - 01:16:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
