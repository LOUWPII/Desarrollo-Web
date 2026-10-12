---
tags:
  - modalnavigationdrawer
  - navegacion
  - compose
  - material3
aliases:
  - ModalNavigationDrawer
  - DrawerState
  - rememberCoroutineScope
clase: Componentes Reutilizables de Imagen y Menú Lateral (ModalNavigationDrawer)
timestamp: ~138:00 - 153:00 min (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Navegación Lateral (ModalNavigationDrawer) y Componentes Reutilizables

## Definición

**`ModalNavigationDrawer`** es el componente de Material Design 3 que implementa un panel de navegación lateral deslizante. Su estado visual se controla mediante **`DrawerState`** e interactúa con corrutinas asignadas al ciclo de vida de la composición a través de **`rememberCoroutineScope`**.

## Anatomía del Panel Lateral Deslizante

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                      ModalNavigationDrawer                  │
 │ ┌──────────────────────┐ ┌────────────────────────────────┐ │
 │ │   ModalDrawerSheet   │ │           Scaffold             │ │
 │ │ - Header de Usuario  │ │ - TopAppBar (Botón Menú)       │ │
 │ │ - Opción Perfil      │ │ - Contenido Principal          │ │
 │ │ - Opción Ajustes     │ │                                │ │
 │ └──────────────────────┘ └────────────────────────────────┘ │
 └─────────────────────────────────────────────────────────────┘

```

---

## Implementación Técnica

```kotlin
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

@Composable
fun PantallaConMenuLateral(
    userPhotoUrl: String?,
    onNavigateToProfile: () -> Unit
) {
    // Estado del panel lateral (Cerrado por defecto)
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    // Ámbito de corrutinas asignado a la composición para animaciones UI
    val scope = rememberCoroutineScope()

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                Text("Menú de Opciones", modifier = Modifier.padding(16.dp))
                HorizontalDivider()
                NavigationDrawerItem(
                    label = { Text("Perfil") },
                    selected = false,
                    onClick = {
                        scope.launch { drawerState.close() } // Cierra el panel asíncronamente
                        onNavigateToProfile()
                    }
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("Twitter") },
                    navigationIcon = {
                        IconButton(onClick = {
                            scope.launch { drawerState.open() } // Abre el panel asíncronamente
                        }) {
                            ProfileAsyncImage(imageUrl = userPhotoUrl, size = 32.dp)
                        }
                    }
                )
            }
        ) { padding ->
            // Contenido de la pantalla
        }
    }
}

```

---

## Errores Comunes

* ⚠️ **Intentar abrir/cerrar el `DrawerState` de forma síncrona:** Los métodos `.open()` y `.close()` de `DrawerState` son funciones de suspensión. Intentar llamarlos fuera de una corrutina (sin `rememberCoroutineScope()`) provocará un error de compilación.

## Buenas Prácticas

* Usar `rememberCoroutineScope` para manejar animaciones y eventos de interfaz que requieran funciones de suspensión directamente en la capa composable.

## Relación con otros conceptos

* Muestra las imágenes renderizadas por: [06 - Carga de Imagenes Remotas con Coil AsyncImage](<06%20-%20Carga%20de%20Imagenes%20Remotas%20con%20Coil%20AsyncImage.md>)
* Se integra en la jerarquía general descrita en: [09 - Estructura de Pantalla Scaffold TopAppBar y Animaciones de Estado](<../COMPOSE/09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>) (Nota de Jetpack Compose)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué se requiere un `rememberCoroutineScope` para ejecutar las acciones `drawerState.open()` o `drawerState.close()`?
2. **Aplicación:** Escribe el bloque de código para declarar un `ModalNavigationDrawer` con su respectivo `drawerState` y un botón que active su apertura.

## Fuente

* **Clase:** Componentes Reutilizables de Imagen y Menú Lateral (ModalNavigationDrawer)
* **Timestamp:** ~138:00 - 153:00 min (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
