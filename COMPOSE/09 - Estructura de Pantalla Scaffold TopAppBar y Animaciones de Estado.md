---
tags:
  - compose
  - scaffold
  - topappbar
  - animaciones
aliases:
  - Scaffold
  - TopAppBar
  - AnimatedVisibility
  - PaddingValues
clase: Estructuración con Scaffold, TopAppBar y Animaciones de Estado
timestamp: ~01:30:00 - 01:45:00 hr (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Estructura de Pantalla con Scaffold, TopAppBar y Animaciones de Estado

## Definición

**`Scaffold`** es un contenedor estructural de Material Design 3 que organiza de forma estándar los elementos principales de una pantalla (barra superior `TopAppBar`, botón flotante `FloatingActionButton`, barra inferior y área de contenido principal). **`AnimatedVisibility`** es un contenedor reactivo para animar la entrada y salida de componentes según el estado.

## Estructura Anatómica de `Scaffold`

```text
 ┌────────────────────────────────────────────────────────┐
 │                   CenterAlignedTopAppBar               │
 ├────────────────────────────────────────────────────────┤
 │                                                        │
 │                   Contenido Principal                  │
 │             (Box / LazyColumn con padding)             │
 │                                                        │
 │                                 ┌────────────────────┐ │
 │                                 │AnimatedVisibility  │ │
 │                                 │ ┌────────────────┐ │ │
 │                                 │ │     FAB        │ │ │
 │                                 │ └────────────────┘ │ │
 │                                 └────────────────────┘ │
 └────────────────────────────────────────────────────────┘

```

---

## Manejo Obligatorio de `PaddingValues`

El parámetro `content` del `Scaffold` entrega un objeto `paddingValues`. Es **estrictamente obligatorio** aplicar este padding al contenedor principal del contenido para evitar que la barra superior (`TopAppBar`) o inferior tapen los elementos en pantalla.

---

## Implementación Técnica

```kotlin
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaPrincipalTwitter(isExpanded: Boolean) {
    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = { Text("Twitter", fontFamily = TwitterLogoFont) }
            )
        },
        floatingActionButton = {
            // Animación reactiva basada en un booleano de estado
            AnimatedVisibility(
                visible = isExpanded,
                enter = fadeIn(),
                exit = fadeOut()
            ) {
                FloatingActionButton(onClick = { }) {
                    Icon(Icons.Filled.Add, contentDescription = "Crear tweet")
                }
            }
        }
    ) { paddingValues ->
        // Aplicación obligatoria del padding entregado por Scaffold
        Box(modifier = Modifier.padding(paddingValues)) {
            // Contenido de la pantalla (ej. LazyColumn)
        }
    }
}

```

---

## Errores Comunes

* ⚠️ **Ignorar `paddingValues`:** No aplicar `Modifier.padding(paddingValues)` hará que los primeros elementos de la lista queden ocultos debajo de la barra superior.

## Buenas Prácticas

* Usar `AnimatedVisibility` para ocultar el botón flotante (*FAB*) cuando el usuario realiza un scroll descendente extenso en una `LazyColumn`.

## Relación con otros conceptos

* Estructura las pantallas que alojan: [06 - Listas Eficientes LazyColumn LazyRow LazyGrid y Data Classes](<06%20-%20Listas%20Eficientes%20LazyColumn%20LazyRow%20LazyGrid%20y%20Data%20Classes.md>)
* Reacciona a los estados manejados en: [05 - Gestion de Estado Recomposicion y State Hoisting](<05%20-%20Gestion%20de%20Estado%20Recomposicion%20y%20State%20Hoisting.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué es obligatorio aplicar el parámetro `paddingValues` entregado por la función `Scaffold` a tu contenedor de contenido?
2. **Aplicación:** Escribe la estructura de un `Scaffold` que contenga una `CenterAlignedTopAppBar` y aplique el `paddingValues` a un contenedor `Box`.

## Fuente

* **Clase:** Estructuración con Scaffold, TopAppBar y Animaciones de Estado
* **Timestamp:** ~01:30:00 - 01:45:00 hr (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
