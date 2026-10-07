---
tags:
  - compose
  - uistate
  - navigation
  - viewmodel
aliases:
  - Estados de UI
  - LaunchedEffect
  - Navegación Reactiva
clase: Integración con ViewModels, UI States (Indicadores de Carga) y Efectos de Navegación
timestamp: ~55:00 - 01:15:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Estados de UI, Manejo de Carga y Efectos de Navegación en Compose

## Definición

Es la estructura de gestión de estados asíncronos en la UI (**UI State**) compuesta por banderas de carga (`isLoading`) y mensajes de error, vinculada con renderizado condicional en Jetpack Compose y disparadores de efectos secundarios (**`LaunchedEffect`**) para la navegación reactiva.

## Estructura de Un UI State Asíncrono

```kotlin
data class HomeState(
    val tweets: List<TweetInfo> = emptyList(),
    val isLoading: Boolean = false,
    val errorMessage: String? = null,
    val navigateBack: Boolean = false // Bandera de efecto secundario
)

```

---

## Flujo de Estados en el ViewModel (`HomeViewModel.kt`)

```kotlin
fun getTweets() {
    viewModelScope.launch {
        // 1. Inicia estado de carga
        _uiState.update { it.copy(isLoading = true, errorMessage = null) }
        
        // 2. Consulta al repositorio
        val result = tweetRepository.getTweets()
        
        // 3. Procesa resultado
        if (result.isSuccess) {
            val tweetsList = result.getOrNull() ?: emptyList()
            _uiState.update { it.copy(isLoading = false, tweets = tweetsList) }
        } else {
            val error = result.exceptionOrNull()?.message ?: "Error desconocido"
            _uiState.update { it.copy(isLoading = false, errorMessage = error) }
        }
    }
}

```

---

## Renderizado Condicional y Navegación Reactiva en Compose

### 1. Renderizado Condicional (`HomeScreen.kt`):

```kotlin
@Composable
fun HomeScreen(state: HomeState) {
    when {
        state.isLoading -> {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        }
        state.errorMessage != null -> {
            Text(text = state.errorMessage ?: "Error inesperado")
        }
        else -> {
            LazyColumn {
                items(state.tweets) { tweet -> TweetCard(tweet) }
            }
        }
    }
}

```

### 2. Navegación Asíncrona Segura con `LaunchedEffect` (`CreateTweetScreen.kt`):

Invocar `navController.popBackStack()` de forma síncrona dentro del botón de publicar provoca que la pantalla cierre **antes** de que el servidor confirme la creación. La solución consiste en observar la bandera `navigateBack`:

```kotlin
// Se ejecuta únicamente cuando la propiedad state.navigateBack cambia a true
LaunchedEffect(state.navigateBack) {
    if (state.navigateBack) {
        onBack() // Ejecuta la acción de retorno de forma segura
    }
}

```

---

## Errores Comunes

- ⚠️ **Navegación síncrona en botones de acción:** Ejecutar `onBack()` inmediatamente al hacer clic en "Guardar", sin esperar la respuesta asíncrona del repositorio, provocando inconsistencias en la base de datos.

## Buenas Prácticas

- Controlar la navegación resultante de operaciones asíncronas mediante banderas booleanas observadas por un `LaunchedEffect`.

## Relación con otros conceptos

- Consume los objetos `Result<T>` de: [06 - Arquitectura de Repositorios Result T y Debate sobre Response T](<06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>)
- Renderiza las operaciones de: [08 - Operaciones CRUD Perfil de Usuario y Eliminacion Optimizada](<08%20-%20Operaciones%20CRUD%20Perfil%20de%20Usuario%20y%20Eliminacion%20Optimizada.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué invocar `navController.popBackStack()` de forma inmediata dentro del evento `onClick` de un botón de guardado puede generar un error de sincronización?
2. **Aplicación:** Escribe el bloque de código con `when` en Compose para conmutar entre un `CircularProgressIndicator` y una `LazyColumn`.

## Fuente

- **Clase:** Integración con ViewModels, UI States (Indicadores de Carga) y Efectos de Navegación
- **Timestamp:** ~55:00 - 01:15:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
