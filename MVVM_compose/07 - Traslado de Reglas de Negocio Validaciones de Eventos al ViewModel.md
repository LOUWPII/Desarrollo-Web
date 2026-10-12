---
tags:
  - mvvm
  - validaciones
  - clean-architecture
  - eventos
aliases:
  - Reglas de Negocio
  - Validaciones en ViewModel
  - Procesamiento de Eventos
clase: Traslado de Reglas de Negocio, Validaciones y Eventos al ViewModel
timestamp: ~45:00 - 55:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Traslado de Reglas de Negocio, Validaciones y Eventos al ViewModel

## Definición

Es el principio de Clean Architecture que exige la migración de toda la lógica de validación (comprobación de campos vacíos, reglas de longitud de contraseñas, formatos de correo) y el procesamiento de eventos desde los composables de la interfaz hacia métodos del `ViewModel`, garantizando un código de maquetación puramente declarativo.

## Flujo de Procesamiento de un Evento de Botón

```text
 Composable (UI)              ViewModel                         UI State
┌──────────────────┐         ┌─────────────────────────┐       ┌────────────────────────┐
│ Click "Registrar"├────────►│ onRegisterClicked()     │──────►│ Actualiza:             │
└──────────────────┘         │ - Evalúa vacíos.        │       │ errorMessage = "Error" │
                             │ - Evalúa longitud < 6.  │       │ O                      │
                             │ - Confirma regla.       │       │ navigateToHome = true  │
                             └─────────────────────────┘       └────────────────────────┘

```

---

## Implementación Técnica (`LoginViewModel.kt`)

```kotlin
fun onLoginButtonClicked() {
    val currentEmail = _uiState.value.email
    val currentPassword = _uiState.value.password

    // Regla 1: Campos obligatorios
    if (currentEmail.isEmpty() || currentPassword.isEmpty()) {
        _uiState.update {
            it.copy(
                showErrorMessage = true,
                errorMessage = "Todos los campos son obligatorios"
            )
        }
        return
    }

    // Regla 2: Longitud mínima de credenciales
    if (currentPassword.length < 6) {
        _uiState.update {
            it.copy(
                showErrorMessage = true,
                errorMessage = "La contraseña debe tener al menos 6 caracteres"
            )
        }
        return
    }

    // Éxito: Despacha la transición de estado
    _uiState.update {
        it.copy(
            showErrorMessage = false,
            errorMessage = null,
            navigateToHome = true
        )
    }
}

```

---

## Desacoplamiento de la Vista

El botón dentro del Composable no contiene lógica de decisión; únicamente delega el evento:

```kotlin
Button(
    onClick = { loginViewModel.onLoginButtonClicked() },
    modifier = Modifier.fillMaxWidth()
) {
    Text("Iniciar Sesión")
}

```

---

## Errores Comunes

* ⚠️ **Condicionales `if/else` de validación dentro del Composable:** Escribir evaluadores de cadenas directamente en la UI dificulta la ejecución de pruebas unitarias sobre las reglas de negocio.

## Buenas Prácticas

* Centralizar todos los mensajes de error de validación en variables o estados procesados por el ViewModel.

## Relación con otros conceptos

* Actualiza las propiedades expuestas en: [06 - Patron UI State Agrupacion en Data Class e Inmutabilidad con copy](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)
* Dispara los indicadores consumidos en: [08 - Navegacion Guiada por Estado y Desacoplamiento de NavController](<08%20-%20Navegacion%20Guiada%20por%20Estado%20y%20Desacoplamiento%20de%20NavController.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué mover las validaciones de entrada al ViewModel facilita la realización de pruebas unitarias (*Unit Testing*).
2. **Aplicación:** Escribe un método de ViewModel que valide si un campo `email` no está vacío antes de autorizar la actualización del estado.

## Fuente

* **Clase:** Traslado de Reglas de Negocio, Validaciones y Eventos al ViewModel
* **Timestamp:** ~45:00 - 55:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
