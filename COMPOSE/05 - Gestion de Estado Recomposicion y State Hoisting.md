---
tags:
  - compose
  - estado
  - recomposicion
  - state-hoisting
aliases:
  - Gestión de Estado
  - Recomposición
  - State Hoisting
clase: Gestión de Estado, Recomposición y State Hoisting
timestamp: ~00:00 - 25:00 min (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Gestión de Estado, Recomposición y State Hoisting

## Definición

El **Estado** es cualquier valor que puede cambiar a lo largo del tiempo en la aplicación (texto de un campo, estado de un botón, lista de elementos). La **Recomposición** es el proceso por el cual Compose vuelve a invocar las funciones composables para redibujar la interfaz al detectar cambios en un estado observable.

## Mecanismos de Estado: `mutableStateOf` y `remember`

* **`mutableStateOf(valor)`:** Crea un objeto de estado observable. Cuando su valor cambia, le notifica a Compose que debe recomponer los componentes vinculados.
* **`remember { ... }`:** Preserva el valor del estado en la memoria RAM del dispositivo durante los ciclos de recomposición.

⚠️ **Advertencia de Recomposición:**
Si declaras `var texto = mutableStateOf("")` **sin** envolverlo dentro de `remember`, el valor se reiniciará a su estado original cada vez que la pantalla se vuelva a ejecutar.

---

## Elevación de Estado (*State Hoisting*)

El **State Hoisting** es un patrón de diseño que consiste en mover el estado hacia el componente padre para convertir a los componentes hijos en componentes **sin estado** (*stateless*).

```text
 ┌────────────────────────────────────────────────────────┐
 │                   Componente Padre                     │
 │  - Mantiene el estado: var email by remember { ... }  │
 └───────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            │ 1. Pasa valor: email            │ 2. Pasa evento de cambio:
            │                                 │    onEmailChange = { email = it }
            ▼                                 ▼
 ┌────────────────────────────────────────────────────────┐
 │                    Componente Hijo                     │
 │  - Componente Stateless (Sin estado interno).          │
 │  - Recibe el valor e invoca la lambda al interactuar.  │
 └────────────────────────────────────────────────────────┘

```

---

## Implementación Técnica

```kotlin
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*

// Componente Hijo: Stateless (Sin estado)
@Composable
fun CampoTextoEmail(
    email: String,
    onEmailChange: (String) -> Unit
) {
    OutlinedTextField(
        value = email,
        onValueChange = { onEmailChange(it) }, // Notifica el cambio al padre
        label = { Text("Correo electrónico") }
    )
}

// Componente Padre: Stateful (Mantiene el estado)
@Composable
fun PantallaLogin() {
    var email by remember { mutableStateOf("") } // Delegado 'by'

    CampoTextoEmail(
        email = email,
        onEmailChange = { nuevoTexto -> email = nuevoTexto }
    )
}

```

---

## Errores Comunes

* **Estado interno en componentes reutilizables:** Dejar que un campo de texto gestione su propio estado interno impide que el ViewModel o el componente padre puedan leer o limpiar la información.

## Buenas Prácticas

* Usar delegados de Kotlin (`by remember { ... }`) importando `getValue` y `setValue` para evitar llamar a `.value` explícitamente.

## Relación con otros conceptos

* Controla el comportamiento de: [06 - Listas Eficientes LazyColumn LazyRow LazyGrid y Data Classes](<06%20-%20Listas%20Eficientes%20LazyColumn%20LazyRow%20LazyGrid%20y%20Data%20Classes.md>)
* Dispara animaciones en: [09 - Estructura de Pantalla Scaffold TopAppBar y Animaciones de Estado](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Qué problema ocurre si utilizas `mutableStateOf` dentro de un composable sin encerrarlo en un bloque `remember`?
2. **Aplicación:** Explica los dos parámetros esenciales que debe recibir un componente hijo para aplicar el patrón de State Hoisting.

## Fuente

* **Clase:** Gestión de Estado, Recomposición y State Hoisting
* **Timestamp:** ~00:00 - 25:00 min (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
