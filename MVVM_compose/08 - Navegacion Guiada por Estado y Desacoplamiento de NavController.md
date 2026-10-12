---
tags:
  - mvvm
  - navegacion
  - desacoplamiento
  - compose
aliases:
  - Navegación Guiada por Estado
  - Desacoplamiento de NavController
  - navigateToHome
clase: Navegación Controlada por Estado en AppNavigation
timestamp: ~55:00 - 01:00:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Navegación Guiada por Estado y Desacoplamiento de NavController

## Definición

Es la técnica de arquitectura que prohíbe inyectar o pasar la instancia de `NavController` / `NavHostController` dentro del `ViewModel`, delegando la ejecución de las transiciones entre pantallas a la observación reactiva de variables de bandera (ej. `navigateToHome: Boolean`) desde la tabla de navegación (`AppNavigation.kt`).

## Por qué NO Inyectar `NavController` en el ViewModel

```text
 ❌ Inyección Directa de NavController en ViewModel:
 ViewModel ──► Contiene NavController (Acoplamiento al framework visual de Android)
 (Dificulta la reusabilidad del ViewModel y rompe las pruebas unitarias sin mocks complejos).

 ✅ Navegación Guiada por Estado:
 ViewModel ──► Actualiza UIState(navigateToHome = true)
                      │
                      ▼ Observa el estado
 AppNavigation ──► Ejecuta navController.navigate("home")

```

---

## Implementación Técnica (`AppNavigation.kt`)

```kotlin
composable("login") {
    val loginViewModel: LoginViewModel = viewModel()
    val state by loginViewModel.uiState.collectAsState()

    // Reacción reactiva a la variable de estado
    LaunchedEffect(state.navigateToHome) {
        if (state.navigateToHome) {
            navController.navigate("home") {
                popUpTo("login") { inclusive = true }
            }
        }
    }

    LoginScreen(loginViewModel = loginViewModel)
}

```

---

## Limpieza de Banderas de Navegación

Tras ejecutar la navegación, o si la pantalla vuelve a la composición, es vital resetear la bandera `navigateToHome` a `false` en el ViewModel si la instancia no es destruida, evitando re-navegaciones no deseadas.

---

## Errores Comunes

* ⚠️ **Pasar `navController` como parámetro al `ViewModel`:** Destruye la independencia de la capa de lógica de negocio respecto al framework UI de Android.

## Buenas Prácticas

* Usar bloques de efecto de costado como `LaunchedEffect(state.navigateToHome)` dentro de Compose para disparar eventos de navegación únicos en reacción al cambio de estado.

## Relación con otros conceptos

* Consume banderas declaradas en: [06 - Patron UI State Agrupacion en Data Class e Inmutabilidad con copy](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)
* Completa el desacoplamiento de navegación iniciado en: [02 - NavHostController NavHost y State Hoisting de Eventos](<../NAVEGACION_COMPOSE/02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>) (Nota de Navegación)

## Preguntas de repaso

1. **Comprensión:** Explica los problemas de arquitectura que surgen al inyectar la clase `NavController` dentro de un `ViewModel`.
2. **Aplicación:** Escribe el bloque de código en `AppNavigation.kt` que observe una variable de estado `navigateToHome` y ejecute la navegación.

## Fuente

* **Clase:** Navegación Controlada por Estado en AppNavigation
* **Timestamp:** ~55:00 - 01:00:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
