---
tags:
  - mvvm
  - stateflow
  - livedata
  - estado
aliases:
  - StateFlow
  - LiveData
  - Comparativa de Estado
clase: "Comparativa de Estado: mutableStateOf vs. LiveData vs. StateFlow"
timestamp: ~15:00 - 30:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Comparativa Técnicas de Estado: `mutableStateOf` vs. `LiveData` vs. `StateFlow`

## Definición

Es el análisis técnico de las tres estructuras observables utilizadas en Android para representar estado dentro de un ViewModel, evaluando su compatibilidad con Jetpack Compose, seguridad ante nulos y proyección hacia librerías multiplataforma.

## Tabla Comparativa Técnica

| Característica | `mutableStateOf` | `LiveData` | `StateFlow` |
| --- | --- | --- | --- |
| **Origen / Era** | Jetpack Compose nativo. | Android XML / Arch. Components (Legacy). | Kotlin Coroutines / Flow (Estándar Actual). |
| **Manejo de Nulos** | Respeta el tipo declarado. | **Obliga retorno de nulos (`T?`).** | **Garantiza tipos no nulos (`T`).** |
| **Suscripción en UI** | Directa (delegado `by`). | Requiere `observeAsState(...)`. | Requiere `collectAsState()`. |
| **Multiplataforma** | Limitado a Compose UI. | Exclusivo del SDK de Android. | **Kotlin Puro (KMP Compatible).** |
| **Transformaciones** | Manuales. | Mediante `Transformations` (Limitado). | Operadores reactivos (`map`, `filter`, etc.). |

---

## Implementación con `StateFlow` (Estándar Recomendado)

```kotlin
// ViewModel: Encapsulamiento con doble variable
class RegisterViewModel : ViewModel() {

    // Variable privada mutable de modificación interna
    private val _password = MutableStateFlow("")
    
    // Propiedad pública inmutable expuesta a la UI como StateFlow
    val password: StateFlow<String> = _password.asStateFlow()

    fun updatePassword(input: String) {
        _password.value = input
    }
}

```

```kotlin
// Composable UI: Recolección consciente de recomposición
@Composable
fun RegisterScreen(registerViewModel: RegisterViewModel) {
    // Convierte el StateFlow en un State de Compose
    val password by registerViewModel.password.collectAsState()

    OutlinedTextField(
        value = password,
        onValueChange = { registerViewModel.updatePassword(it) }
    )
}

```

---

## Por qué Descartar `LiveData` en Proyectos Nuevos con Compose

`LiveData` pertenece a la era de las vistas en XML. Su método de observación en Compose (`observeAsState()`) obliga a declarar un valor inicial por defecto porque el valor interno de `LiveData` siempre es nulable (`T?`), generando código defensivo innecesario con operadores `?:`.

---

## Errores Comunes

* ⚠️ **Exponer `MutableStateFlow` de forma pública:** Permitir que la UI acceda a la versión mutable (`_password.value = "..."`) vulnera el encapsulamiento. Siempre se debe exponer como `StateFlow` mediante `.asStateFlow()`.

## Buenas Prácticas

* Usar la convención del guion bajo (`_uiState`) para la propiedad privada mutable y la versión sin guion bajo (`uiState`) para la propiedad pública inmutable.

## Relación con otros conceptos

* Sirve como motor reactivo para el patrón presentado en: [06 - Patron UI State Agrupacion en Data Class e Inmutabilidad con copy](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)
* Se conecta con las rutas de navegación en: [08 - Navegacion Guiada por Estado y Desacoplamiento de NavController](<08%20-%20Navegacion%20Guiada%20por%20Estado%20y%20Desacoplamiento%20de%20NavController.md>)

## Preguntas de repaso

1. **Comparación:** Menciona tres ventajas técnicas por las cuales `StateFlow` es superior a `LiveData` en aplicaciones desarrolladas con Jetpack Compose.
2. **Aplicación:** Escribe las dos declaraciones de variables requeridas en un ViewModel para exponer una propiedad `userName` de forma segura mediante `StateFlow`.

## Fuente

* **Clase:** Comparativa de Estado: mutableStateOf vs. LiveData vs. StateFlow
* **Timestamp:** ~15:00 - 30:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
