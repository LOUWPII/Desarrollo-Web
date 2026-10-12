---
tags:
  - mvvm
  - estado
  - mutablestateof
  - encapsulamiento
aliases:
  - mutableStateOf
  - private set
  - Encapsulamiento de Estado
clase: "Primer Enfoque: Manejo de Estado con mutableStateOf y Encapsulamiento"
timestamp: ~08:00 - 15:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Encapsulamiento de Estado con `mutableStateOf` y `private set`

## Definición

Es el enfoque inicial de gestión de estado dentro del ViewModel utilizando primitivas de Compose (`mutableStateOf`), aplicando un modificador de acceso restrictivo (`private set`) para prohibir la modificación directa de la variable desde la UI y forzar la actualización mediante funciones explícitas.

## Mecanismo de Encapsulamiento (`private set`)

Para evitar que la Vista mute directamente las variables de estado (ej. `viewModel.email = "otro"`), la propiedad se declara con lectura pública pero escritura privada:

```kotlin
class RegisterViewModel : ViewModel() {
    
    // Lectura pública para la UI, modificación restringida al ViewModel
    var email by mutableStateOf("")
        private set

    // Función pública de mutación (State Hoisting)
    fun updateEmail(input: String) {
        email = input
    }
}

```

---

## Eliminación de `remember` en el ViewModel

⚠️ **Regla Importante:**
Dentro de un `ViewModel` **NO se utiliza la función `remember`**. `remember` es un mecanismo diseñado para preservar memoria dentro del árbol de composición de Compose. El `ViewModel` ya retiene su propia instancia en memoria viva fuera de la composición.

---

## Consumo en la Vista (Composable)

```kotlin
@Composable
fun RegisterScreen(registerViewModel: RegisterViewModel) {
    OutlinedTextField(
        value = registerViewModel.email, // Lectura del estado
        onValueChange = { registerViewModel.updateEmail(it) } // Notificación de evento
    )
}

```

---

## Errores Comunes

* ⚠️ **Estado público modificable (`var email = ...`):** Permitir que la Vista asigne valores directamente a las propiedades del ViewModel rompe el patrón UDF y el principio de encapsulamiento.
* **Usar `remember` dentro del ViewModel:** `remember` solo es válido en contexto composable; usarlo en un ViewModel no compilará o generará fugas de lógica.

## Buenas Prácticas

* Utilizar `private set` en todas las variables mutables expuestas directamente desde un ViewModel si se utiliza `mutableStateOf`.

## Relación con otros conceptos

* Aplica el principio de elevación de estado descrito en: [02 - Arquitectura MVVM y Flujo Unidireccional de Datos en Compose](<02%20-%20Arquitectura%20MVVM%20y%20Flujo%20Unidireccional%20de%20Datos%20en%20Compose.md>)
* Evoluciona hacia patrones más robustos en: [05 - Comparativa Tecnicas de Estado mutableStateOf LiveData y StateFlow](<05%20-%20Comparativa%20Tecnicas%20de%20Estado%20mutableStateOf%20LiveData%20y%20StateFlow.md>) y [06 - Patron UI State Agrupacion en Data Class e Inmutabilidad con copy](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué se debe usar el modificador `private set` al exponer variables declaradas con `mutableStateOf` dentro de un ViewModel.
2. **Diagnóstico:** Si intentas escribir `var email by remember { mutableStateOf("") }` dentro de una clase que hereda de `ViewModel`, ¿cuál es el error conceptual cometido?

## Fuente

* **Clase:** Primer Enfoque: Manejo de Estado con mutableStateOf y Encapsulamiento
* **Timestamp:** ~08:00 - 15:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
