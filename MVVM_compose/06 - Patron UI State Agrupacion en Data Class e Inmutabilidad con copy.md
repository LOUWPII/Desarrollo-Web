---
tags:
  - mvvm
  - ui-state
  - data-class
  - inmutabilidad
aliases:
  - UI State
  - Data Class de Estado
  - Inmutabilidad con copy
clase: "Estructuración del Estado en el ViewModel: Variables Sueltas vs. Data Class (UI State)"
timestamp: ~30:00 - 45:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Patrón UI State: Agrupación en Data Class e Inmutabilidad con `copy`

## Definición

El patrón **UI State** consiste en unificar todas las propiedades visuales y banderas de control de una pantalla dentro de una única estructura de datos inmutable (`data class`). El ViewModel gestiona un único flujo de estado (`StateFlow<UIState>`) que se actualiza emitiendo copias modificadas mediante la función `.copy()`.

## Anti-patrón: Variables Sueltas Múltiples vs. UI State Unificado

```text
 ❌ Inconveniente de Variables Individuales:
 val email: StateFlow<String>
 val password: StateFlow<String>
 val isPasswordVisible: StateFlow<Boolean>
 val isLoading: StateFlow<Boolean>
 (La UI debe ejecutar 4 collectAsState() independientes, generando código repetitivo).

```

```text
 ✅ Solución Unificada (UI State Pattern):
 data class LoginState(
     val email: String = "",
     val password: String = "",
     val isPasswordVisible: Boolean = false,
     val isLoading: Boolean = false
 )
 (La UI solo recolecta un único objeto: val state by viewModel.uiState.collectAsState()).

```

---

## Implementación Técnica (`LoginState.kt` y `LoginViewModel.kt`)

```kotlin
// Data Class con valores iniciales por defecto
data class LoginState(
    val email: String = "",
    val password: String = "",
    val isPasswordVisible: Boolean = false,
    val errorMessage: String? = null,
    val navigateToHome: Boolean = false
)

class LoginViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(LoginState())
    val uiState: StateFlow<LoginState> = _uiState.asStateFlow()

    fun updateEmail(input: String) {
        // Actualización atómica utilizando .update e it.copy(...)
        _uiState.update { currentState ->
            currentState.copy(email = input)
        }
    }

    fun togglePasswordVisibility() {
        _uiState.update { currentState ->
            currentState.copy(isPasswordVisible = !currentState.isPasswordVisible)
        }
    }
}

```

---

## Ventajas de la Inmutabilidad con `.copy()`

1. **Atomicidad:** Toda la pantalla se recompone frente a una sola emisión de estado consistente.
2. **Trazabilidad:** Facilita la depuración al poder registrar el historial exacto de estados por los que ha pasado la vista.
3. **Sintaxis limpia en la UI:** Se accede a las propiedades de forma directa (`state.email`, `state.isPasswordVisible`).

---

## Errores Comunes

* ⚠️ **Modificar propiedades internas mutando el objeto original:** Las `data class` de estado deben contener exclusivamente propiedades inmutables (`val`). Intentar declarar campos con `var` destruye la reactividad y causa fallas de recomposición en Compose.

## Buenas Prácticas

* Usar siempre `_uiState.update { it.copy(...) }` para garantizar modificaciones de estado seguras en entornos multihilo.

## Relación con otros conceptos

* Utiliza la infraestructura de `StateFlow` definida en: [05 - Comparativa Tecnicas de Estado mutableStateOf LiveData y StateFlow](<05%20-%20Comparativa%20Tecnicas%20de%20Estado%20mutableStateOf%20LiveData%20y%20StateFlow.md>)
* Se modifica desde los eventos de negocio analizados en: [07 - Traslado de Reglas de Negocio Validaciones de Eventos al ViewModel](<07%20-%20Traslado%20de%20Reglas%20de%20Negocio%20Validaciones%20de%20Eventos%20al%20ViewModel.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la diferencia de manejo en la UI entre usar 5 `StateFlow` independientes versus un único `data class` de `UI State`.
2. **Aplicación:** Escribe una instrucción con `_uiState.update` que modifique únicamente la propiedad `isLoading` a `true` dentro de un objeto `LoginState`.

## Fuente

* **Clase:** Estructuración del Estado en el ViewModel: Variables Sueltas vs. Data Class (UI State)
* **Timestamp:** ~30:00 - 45:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
