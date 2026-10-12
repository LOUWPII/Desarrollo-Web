---
tags:
  - mvvm
  - viewmodel
  - package-by-feature
  - android
aliases:
  - Package by Feature
  - Clase ViewModel
  - Estructuración por Features
clase: Estructuración del Proyecto y Creación del ViewModel
timestamp: ~05:00 - 08:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Estructuración de Proyecto por Features y Clase ViewModel

## Definición

Es la organización del código fuente en paquetes divididos por **Casos de Uso / Funcionalidades** (*Package by Feature*), combinada con la implementación de clases que heredan de `androidx.lifecycle.ViewModel` para retener el estado de la UI a través de cambios de configuración (como rotaciones de pantalla).

## Organización de Carpetas: *Package by Feature*

En lugar de agrupar por tipo de componente (carpetas `views/`, `models/`, `viewmodels/`), se agrupa por pantalla o caso de uso:

```text
 com.example.app/
 ├── register/
 │   ├── RegisterScreen.kt      (Vista)
 │   ├── RegisterViewModel.kt   (ViewModel)
 │   └── RegisterState.kt       (Estado de UI)
 ├── login/
 │   ├── LoginScreen.kt
 │   ├── LoginViewModel.kt
 │   └── LoginState.kt
 └── home/
     ├── HomeScreen.kt
     └── HomeViewModel.kt

```

---

## La Clase `androidx.lifecycle.ViewModel`

La clase base `ViewModel` provista por Android está vinculada al ciclo de vida del contenedor (Activity/Navigation Graph). Se mantiene en memoria durante recreaciones de la Activity provocadas por cambios de configuración (rotación del dispositivo), destruyéndose únicamente cuando la vista finaliza su ciclo de vida de forma definitiva.

```kotlin
// register/RegisterViewModel.kt
import androidx.lifecycle.ViewModel

// Convención: NombreDePantalla + ViewModel
class RegisterViewModel : ViewModel() {
    // El estado y las funciones de negocio se retienen durante rotaciones
}

```

---

## Proporción Pantalla-ViewModel

La aproximación estándar es **un ViewModel por cada pantalla o caso de uso principal**. Intentar compartir un solo ViewModel entre múltiples pantallas desacopladas genera clases sobrecargadas (*God Objects*) difíciles de mantener.

---

## Errores Comunes

* ⚠️ **Organización por capas en proyectos medianos/grandes:** Crear carpetas globales de `viewmodels/` dificulta la localización de archivos relacionados a una misma pantalla.

## Buenas Prácticas

* Nombrar cada ViewModel asociándolo a su pantalla correspondiente con el sufijo `ViewModel` (ej. `RegisterScreen` -> `RegisterViewModel`).

## Relación con otros conceptos

* Estructura las clases que encapsularán el estado en: [04 - Encapsulamiento de Estado con mutableStateOf y private set](<04%20-%20Encapsulamiento%20de%20Estado%20con%20mutableStateOf%20y%20private%20set.md>)
* Hospeda la inicialización de datos explicada en: [09 - Inicializacion de Datos en ViewModel con init y LaunchedEffect](<09%20-%20Inicializacion%20de%20Datos%20en%20ViewModel%20con%20init%20y%20LaunchedEffect.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la ventaja de organizar un proyecto de Android por *Features* (funcionalidades) en lugar de por capas de archivos.
2. **Comparación:** ¿Qué le ocurre a una variable declarada dentro de un Composable con `remember` durante una rotación de pantalla versus una variable retenida en un `ViewModel`?

## Fuente

* **Clase:** Estructuración del Proyecto y Creación del ViewModel
* **Timestamp:** ~05:00 - 08:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
