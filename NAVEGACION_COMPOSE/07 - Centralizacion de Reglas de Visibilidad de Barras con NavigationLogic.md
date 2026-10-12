---
tags:
  - compose
  - navegacion
  - clean-architecture
  - scaffold
aliases:
  - NavigationLogic
  - Visibilidad de Barras
  - Scaffold Centralizado
clase: Arquitectura de Control Visibilidad de Barras (TopBar / BottomBar) y Objeto NavigationLogic
timestamp: ~58:00 - 01:08:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Centralización de Reglas de Visibilidad de Barras con NavigationLogic

## Definición

Es el patrón de Clean Architecture que encapsula en un objeto Singleton (`NavigationLogic`) las reglas de negocio que determinan qué pantallas deben mostrar u ocultar componentes de la estructura global (como `TopBar` y `BottomBar`), evitando la duplicación del `Scaffold` o la inclusión de condicionales complejas dentro de las vistas.

## Comparativa de Diseños de Estructura

```text
 ❌ Anti-patrón (Duplicación de Scaffold):
 HomeScreen         ──► Tiene su propio Scaffold con BottomBar
 SearchScreen       ──► Tiene su propio Scaffold con BottomBar
 TweetDetailScreen  ──► Tiene su propio Scaffold sin BottomBar
 (Obliga a propagar el NavController a todas las pantallas)

```

```text
 ✅ Solución Limpia (Scaffold Centralizado con NavigationLogic):
 TwitterApp (Un solo Scaffold Central)
    ├── topBar = { if (NavigationLogic.shouldShowTopBar(currentRoute)) TopBar() }
    ├── bottomBar = { if (NavigationLogic.shouldShowBottomBar(currentRoute)) BottomBar() }
    └── content = { AppNavigation(...) }

```

---

## Implementación de `NavigationLogic.kt`

```kotlin
object NavigationLogic {

    private val topBarDisabledScreens = listOf(
        Screen.Start.route,
        Screen.Register.route
    )

    private val bottomBarEnabledScreens = listOf(
        Screen.Home.route,
        Screen.Search.route,
        Screen.Notifications.route,
        Screen.Profile.route
    )

    fun shouldShowTopBar(currentRoute: String?): Boolean {
        return currentRoute !in topBarDisabledScreens
    }

    fun shouldShowBottomBar(currentRoute: String?): Boolean {
        return currentRoute in bottomBarEnabledScreens
    }
}

```

---

## Integración en el Contenedor Principal (`TwitterApp.kt`)

```kotlin
@Composable
fun TwitterApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        topBar = {
            if (NavigationLogic.shouldShowTopBar(currentRoute)) {
                TwitterTopAppBar()
            }
        },
        bottomBar = {
            if (NavigationLogic.shouldShowBottomBar(currentRoute)) {
                TwitterBottomNavigationBar(navController = navController)
            }
        }
    ) { paddingValues ->
        AppNavigation(
            navController = navController,
            modifier = Modifier.padding(paddingValues)
        )
    }
}

```

---

## Errores Comunes

* ⚠️ **Escribir sentencias `if` con cadenas hardcodeadas dentro del composable visual:** Ensucia el archivo de interfaz y mezcla responsabilidades de renderizado con reglas de navegación.

## Buenas Prácticas

* Centralizar todas las listas de excepciones de visibilidad dentro del objeto `NavigationLogic` para permitir modificaciones rápidas sin tocar la maquetación.

## Relación con otros conceptos

* Controla la visibilidad de la barra creada en: [06 - Barra de Navegacion Inferior BottomNavigationBar e Iconos Dinamicos](<06%20-%20Barra%20de%20Navegacion%20Inferior%20BottomNavigationBar%20e%20Iconos%20Dinamicos.md>)
* Se evalúa en el `Scaffold` principal definido en: [01 - Librerias Gradle Single Activity Architecture y Limpieza de MainActivity](<01%20-%20Librerias%20Gradle%20Single%20Activity%20Architecture%20y%20Limpieza%20de%20MainActivity.md>)

## Preguntas de repaso

1. **Comprensión:** Explica las ventajas de centralizar las reglas de visibilidad de las barras en un objeto `NavigationLogic` versus duplicar el contenedor `Scaffold` en cada pantalla.
2. **Aplicación:** Escribe el método del objeto `NavigationLogic` que determine si la barra superior debe mostrarse o no basándose en una lista de rutas deshabilitadas.

## Fuente

* **Clase:** Arquitectura de Control Visibilidad de Barras (TopBar / BottomBar) y Objeto NavigationLogic
* **Timestamp:** ~58:00 - 01:08:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
