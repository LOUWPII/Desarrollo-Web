---
tags:
  - mvvm
  - viewmodel
  - stateflow
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC MVVM Compose
  - Índice MVVM
---

# Índice y Mapa de Conocimiento — Arquitectura MVVM con Jetpack Compose

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Entorno Gradle, Dependencias Lifecycle y Verificación en Emulador](<01%20-%20Entorno%20Gradle%20Dependencias%20Lifecycle%20y%20Verificacion%20en%20Emulador.md>) | `lifecycle-viewmodel-compose`, `runtime-livedata` y emulador |
| 02 | [Arquitectura MVVM y Flujo Unidireccional de Datos en Compose](<02%20-%20Arquitectura%20MVVM%20y%20Flujo%20Unidireccional%20de%20Datos%20en%20Compose.md>) | MVVM y UDF |
| 03 | [Estructuración de Proyecto por Features y Clase ViewModel](<03%20-%20Estructuracion%20de%20Proyecto%20por%20Features%20y%20Clase%20ViewModel.md>) | *Package by Feature* y ciclo de vida |
| 04 | [Encapsulamiento de Estado con mutableStateOf y private set](<04%20-%20Encapsulamiento%20de%20Estado%20con%20mutableStateOf%20y%20private%20set.md>) | `mutableStateOf` y `private set` |
| 05 | [Comparativa Técnicas de Estado: mutableStateOf, LiveData y StateFlow](<05%20-%20Comparativa%20Tecnicas%20de%20Estado%20mutableStateOf%20LiveData%20y%20StateFlow.md>) | `StateFlow` como estándar |
| 06 | [Patrón UI State: Agrupación en Data Class e Inmutabilidad con copy](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>) | `data class`, `.update` y `.copy` |
| 07 | [Traslado de Reglas de Negocio, Validaciones y Eventos al ViewModel](<07%20-%20Traslado%20de%20Reglas%20de%20Negocio%20Validaciones%20de%20Eventos%20al%20ViewModel.md>) | Validaciones y eventos en ViewModel |
| 08 | [Navegación Guiada por Estado y Desacoplamiento de NavController](<08%20-%20Navegacion%20Guiada%20por%20Estado%20y%20Desacoplamiento%20de%20NavController.md>) | Banderas de estado y `LaunchedEffect` |
| 09 | [Inicialización de Datos en ViewModel con init y LaunchedEffect](<09%20-%20Inicializacion%20de%20Datos%20en%20ViewModel%20con%20init%20y%20LaunchedEffect.md>) | `init` vs. `LaunchedEffect(key)` |

---

## 2. Mapa de Conocimiento

```text
Ecosistema MVVM con Jetpack Compose
├── Infraestructura y Fundamentos
│   ├── Configuración Gradle y Verificación en Emulador (01)
│   ├── Arquitectura MVVM y Flujo Unidireccional (02)
│   └── Estructuración por Features y ViewModel (03)
│
├── Gestión y Evolución del Estado
│   ├── Encapsulamiento con mutableStateOf y private set (04)
│   ├── Comparativa: mutableStateOf vs LiveData vs StateFlow (05)
│   └── Patrón UI State e Inmutabilidad con copy (06)
│
└── Lógica de Negocio, Navegación e Inicialización
    ├── Traslado de Reglas de Negocio al ViewModel (07)
    ├── Navegación Guiada por Estado (08)
    └── Inicialización con init y LaunchedEffect (09)

```

### Explicación de la Relación entre los Conceptos

La arquitectura arranca configurando el entorno en **Gradle y Lifecycle** ([01](<01%20-%20Entorno%20Gradle%20Dependencias%20Lifecycle%20y%20Verificacion%20en%20Emulador.md>)), aplicando los principios de la **Arquitectura MVVM y UDF** ([02](<02%20-%20Arquitectura%20MVVM%20y%20Flujo%20Unidireccional%20de%20Datos%20en%20Compose.md>)) dentro de la **Estructuración por Features y la clase ViewModel** ([03](<03%20-%20Estructuracion%20de%20Proyecto%20por%20Features%20y%20Clase%20ViewModel.md>)).

El manejo de datos evoluciona desde **Encapsulamiento con `private set`** ([04](<04%20-%20Encapsulamiento%20de%20Estado%20con%20mutableStateOf%20y%20private%20set.md>)), comparando técnicas en **`mutableStateOf` vs `LiveData` vs `StateFlow`** ([05](<05%20-%20Comparativa%20Tecnicas%20de%20Estado%20mutableStateOf%20LiveData%20y%20StateFlow.md>)), hasta consolidarse en el **Patrón UI State con Data Classes e Inmutabilidad** ([06](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)).

La lógica se desacopla mediante el **Traslado de Reglas de Negocio y Eventos al ViewModel** ([07](<07%20-%20Traslado%20de%20Reglas%20de%20Negocio%20Validaciones%20de%20Eventos%20al%20ViewModel.md>)), coordinando la interfaz con **Navegación Guiada por Estado** ([08](<08%20-%20Navegacion%20Guiada%20por%20Estado%20y%20Desacoplamiento%20de%20NavController.md>)) e hidratando las vistas con **Inicialización mediante `init` y `LaunchedEffect`** ([09](<09%20-%20Inicializacion%20de%20Datos%20en%20ViewModel%20con%20init%20y%20LaunchedEffect.md>)).

> [!note] Enlaces cruzados externos
> La nota [08 - Navegación Guiada por Estado](<08%20-%20Navegacion%20Guiada%20por%20Estado%20y%20Desacoplamiento%20de%20NavController.md>) completa el desacoplamiento iniciado en [02 - NavHostController, NavHost y State Hoisting de Eventos](<../NAVEGACION_COMPOSE/02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>) (módulo de Navegación).
> La nota [09 - Inicialización de Datos con init y LaunchedEffect](<09%20-%20Inicializacion%20de%20Datos%20en%20ViewModel%20con%20init%20y%20LaunchedEffect.md>) complementa la carga reactiva de [08 - Borrado Recursivo en Cascada y Recarga Reactiva con LaunchedEffect](<../FIRESTORE/08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>) (módulo de Firestore).

---

## 3. Lo Esencial

1. **Flujo Unidireccional de Datos (UDF):** La UI notifica eventos al ViewModel y este emite estados inmutables que re-componen la vista.
2. **Estructura Recomendada (`StateFlow`):** Se debe usar `StateFlow` sobre `LiveData` por su garantía de tipos no nulos y compatibilidad con Kotlin Coroutines.
3. **Patrón UI State:** Agrupar todas las propiedades de una pantalla en una `data class` inmutable y actualizar el estado mediante `_uiState.update { it.copy(...) }`.
4. **Encapsulamiento de Estado:** Ocultar la versión mutable (`_uiState`) como `private` y exponer únicamente la versión inmutable (`uiState: StateFlow`) hacia la vista.
5. **Aislamiento de la UI:** No escribir condicionales de validación ni reglas de negocio dentro de los Composables; todo debe procesarse en el ViewModel.
6. **Desacoplamiento de `NavController`:** No inyectar `NavController` en los ViewModels. La navegación debe reaccionar a banderas de estado desde `AppNavigation.kt`.

---

## 4. Debo Saber Hacer

- [ ] Agregar dependencias de `lifecycle-viewmodel-compose` y `runtime-livedata` en `build.gradle.kts`. → [01](<01%20-%20Entorno%20Gradle%20Dependencias%20Lifecycle%20y%20Verificacion%20en%20Emulador.md>)
- [ ] Crear la jerarquía de paquetes agrupando por características (*Package by Feature*). → [03](<03%20-%20Estructuracion%20de%20Proyecto%20por%20Features%20y%20Clase%20ViewModel.md>)
- [ ] Implementar clases que extiendan de `androidx.lifecycle.ViewModel`. → [03](<03%20-%20Estructuracion%20de%20Proyecto%20por%20Features%20y%20Clase%20ViewModel.md>)
- [ ] Aplicar el encapsulamiento de estado con `private set` o mediante la pareja `_uiState` / `uiState`. → [04](<04%20-%20Encapsulamiento%20de%20Estado%20con%20mutableStateOf%20y%20private%20set.md>)
- [ ] Diseñar clases de tipo `data class` para encapsular el `UIState` completo de una pantalla. → [06](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)
- [ ] Actualizar el estado de forma atómica usando `_uiState.update { it.copy(...) }`. → [06](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>)
- [ ] Recolectar `StateFlow` dentro de Composables utilizando la extensión `.collectAsState()`. → [05](<05%20-%20Comparativa%20Tecnicas%20de%20Estado%20mutableStateOf%20LiveData%20y%20StateFlow.md>)
- [ ] Migrar validaciones de formularios desde la UI hacia métodos del ViewModel. → [07](<07%20-%20Traslado%20de%20Reglas%20de%20Negocio%20Validaciones%20de%20Eventos%20al%20ViewModel.md>)
- [ ] Implementar la navegación guiada por estado dentro de `AppNavigation.kt` observando variables booleanas. → [08](<08%20-%20Navegacion%20Guiada%20por%20Estado%20y%20Desacoplamiento%20de%20NavController.md>)
- [ ] Ejecutar cargas de datos parametrizadas usando `LaunchedEffect(key)` dentro de composables visuales. → [09](<09%20-%20Inicializacion%20de%20Datos%20en%20ViewModel%20con%20init%20y%20LaunchedEffect.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Confiar ciegamente en `@Preview` tras cambiar Gradle** | No probar la app en emulador puede ocultar fallos fatales de compatibilidad de binarios | [01](<01%20-%20Entorno%20Gradle%20Dependencias%20Lifecycle%20y%20Verificacion%20en%20Emulador.md>) |
| **Escribir lógica de validación en la UI** | Evalúa longitudes o campos vacíos dentro de las funciones Composables | [02](<02%20-%20Arquitectura%20MVVM%20y%20Flujo%20Unidireccional%20de%20Datos%20en%20Compose.md>) |
| **Usar `remember` dentro de un ViewModel** | Intenta retener memoria con `remember` en una clase que ya retiene su propia instancia | [04](<04%20-%20Encapsulamiento%20de%20Estado%20con%20mutableStateOf%20y%20private%20set.md>) |
| **Exponer variables mutables (`MutableStateFlow`)** | Permite que la vista modifique directamente los valores del estado del ViewModel | [05](<05%20-%20Comparativa%20Tecnicas%20de%20Estado%20mutableStateOf%20LiveData%20y%20StateFlow.md>) |
| **Inyectar `NavController` en el ViewModel** | Acopla la lógica de negocio al framework de la interfaz gráfica | [08](<08%20-%20Navegacion%20Guiada%20por%20Estado%20y%20Desacoplamiento%20de%20NavController.md>) |
| **Declarar variables mutables (`var`) dentro del `UIState`** | Rompe la inmutabilidad de la `data class` de estado | [06](<06%20-%20Patron%20UI%20State%20Agrupacion%20en%20Data%20Class%20e%20Inmutabilidad%20con%20copy.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Arquitectura)** Explica cómo el principio de Flujo Unidireccional de Datos (UDF) evita inconsistencias en el estado visual de una pantalla.
2. **(Comparación / Estado)** ¿Por qué se prefiere `StateFlow` sobre `LiveData` en proyectos modernos desarrollados con Jetpack Compose?
3. **(Diseño / Encapsulamiento)** Escribe la declaración correcta para exponer una propiedad `uiState` de forma pública en un ViewModel sin permitir que la vista la modifique.
4. **(Aplicación / Refactorización)** Muestra cómo refactorizarías un evento `onValueChange` que valida un correo en la UI para que la regla de negocio viva en el ViewModel.
5. **(Navegación / Clean Code)** ¿Por qué la llamada `navController.navigate("home")` debe ejecutarse en `AppNavigation.kt` y no dentro del `ViewModel`?
6. **(Ciclo de Vida / Carga)** ¿Cuál es la diferencia entre inicializar datos dentro del bloque `init` del ViewModel versus hacerlo con `LaunchedEffect` en la UI?