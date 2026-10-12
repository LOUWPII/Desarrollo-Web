---
tags:
  - compose
  - navegacion
  - bottomnavigation
  - iconos
aliases:
  - BottomNavigationBar
  - NavigationBar
  - Íconos Dinámicos
clase: Barra de Navegación Inferior (BottomNavigationBar) e Indicadores de Selección
timestamp: ~48:00 - 58:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Barra de Navegación Inferior (BottomNavigationBar) e Íconos Dinámicos

## Definición

Es la implementación de la barra de menú inferior de Material Design 3 (`NavigationBar` y `NavigationBarItem`), utilizando la función `currentBackStackEntryAsState()` de `NavController` para observar la ruta activa en tiempo real y alternar dinámicamente entre íconos rellenos (*filled*) y delineados (*outlined*).

## Modelo de Datos (`BottomNavItem.kt`)

```kotlin
data class BottomNavItem(
    val filledIcon: ImageVector,
    val outlinedIcon: ImageVector,
    val route: String
)

val bottomNavItems = listOf(
    BottomNavItem(Icons.Filled.Home, Icons.Outlined.Home, Screen.Home.route),
    BottomNavItem(Icons.Filled.Search, Icons.Outlined.Search, Screen.Search.route),
    BottomNavItem(Icons.Filled.Notifications, Icons.Outlined.Notifications, Screen.Notifications.route),
    BottomNavItem(Icons.Filled.Person, Icons.Outlined.Person, Screen.Profile.route)
)

```

---

## Observación de la Ruta Activa y Alternancia de Íconos

```kotlin
@Composable
fun TwitterBottomNavigationBar(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    // Observa la pila de navegación en tiempo real
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    NavigationBar(modifier = modifier) {
        bottomNavItems.forEach { item ->
            // Determina si la pestaña está activa
            val isSelected = currentRoute == item.route

            NavigationBarItem(
                selected = false, // Desactivado para imitar la estética plana de Twitter
                onClick = {
                    if (currentRoute != item.route) {
                        navController.navigate(item.route) {
                            popUpTo(Screen.Home.route)
                            launchSingleTop = true // Evita duplicar pantallas al presionar repetidamente
                        }
                    }
                },
                icon = {
                    Icon(
                        imageVector = if (isSelected) item.filledIcon else item.outlinedIcon,
                        contentDescription = null
                    )
                }
            )
        }
    }
}

```

---

## Excepción Justificada al Paso de `NavController`

Aunque la regla general de la arquitectura prohíbe pasar `NavController` a componentes de UI, la barra de navegación inferior es un **componente de control exclusivo de navegación**. Pasarle la instancia de `navController` está arquitectónicamente justificado para evitar la creación de múltiples lambdas redundantes.

---

## Errores Comunes

* ⚠️ **Omitir la validación de ruta actual en `onClick`:** No verificar `if (currentRoute != item.route)` permite al usuario presionar repetidamente el mismo botón de la barra e ir acumulando instancias duplicadas de la misma pantalla en la pila.

## Buenas Prácticas

* Configurar `launchSingleTop = true` en las opciones de navegación de la barra para garantizar que no se creen múltiples copias de una misma vista.

## Relación con otros conceptos

* Consume las rutas tipadas en: [05 - Tipado Seguro de Rutas con Sealed Class Screen](<05%20-%20Tipado%20Seguro%20de%20Rutas%20con%20Sealed%20Class%20Screen.md>)
* Se integra de forma condicional en el contenedor de: [07 - Centralizacion de Reglas de Visibilidad de Barras con NavigationLogic](<07%20-%20Centralizacion%20de%20Reglas%20de%20Visibilidad%20de%20Barras%20con%20NavigationLogic.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué pasar la instancia de `NavController` al composable de la barra inferior se considera una excepción válida a las reglas de State Hoisting?
2. **Aplicación:** Escribe el bloque de código que utiliza `currentBackStackEntryAsState()` para extraer la ruta activa de un `NavController`.

## Fuente

* **Clase:** Barra de Navegación Inferior (BottomNavigationBar) e Indicadores de Selección
* **Timestamp:** ~48:00 - 58:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
