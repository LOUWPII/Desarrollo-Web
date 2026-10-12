---
tags:
  - compose
  - navegacion
  - sealed-class
  - tipado
aliases:
  - Sealed Class Screen
  - Tipado Seguro de Rutas
  - data object
clase: Definición Tipada de Rutas con Sealed Class (Screen)
timestamp: ~38:00 - 48:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Tipado Seguro de Rutas con Sealed Class (Screen)

## Definición

Es el patrón de diseño que sustituye las cadenas de texto plano (*hardcoded strings*) utilizadas en las rutas por una jerarquía restringida de clases mediante una **`Sealed Class`**, previniendo errores de escritura en tiempo de compilación.

## Comparativa: Enum Class vs. Abstract Class vs. Sealed Class

| Estructura | Ventaja | Desventaja / Limitación | ¿Apta para Rutas? |
| --- | --- | --- | --- |
| **Enum Class** | Conjunto cerrado de opciones estáticas. | Todos sus miembros deben implementar estrictamente los mismos atributos y métodos. No permite rutas con funciones creadoras dinámicas. | ❌ No recomendable |
| **Abstract Class** | Cada subclase puede definir atributos y funciones independientes. | Pierde el control de conjunto cerrado; cualquier archivo externo puede heredar de ella, impidiendo la validación en compilación. | ❌ No recomendable |
| **Sealed Class** | **Solución híbrida perfecta:** Conjunto cerrado de subclases conocidas en compilación, permitiendo que cada miembro contenga funciones y argumentos propios. | Requiere definir las subclases dentro del mismo paquete/archivo. | ✅ **Estructura Ideal** |

---

## Implementación de `Screen.kt`

```kotlin
sealed class Screen(val route: String) {
    data object Start : Screen("start")
    data object Register : Screen("register")
    data object Home : Screen("home")
    data object Search : Screen("search")
    data object Notifications : Screen("notifications")
    data object Profile : Screen("profile")

    // Ruta parametrizada con función creadora dinámica
    data object TweetDetail : Screen("tweetDetail/{tweetId}") {
        fun createRoute(tweetId: Int): String = "tweetDetail/$tweetId"
    }
}

```

---

## Uso de la Clase Sellada en `AppNavigation.kt`

```kotlin
NavHost(
    navController = navController,
    startDestination = Screen.Start.route
) {
    composable(Screen.Start.route) { ... }
    composable(Screen.Home.route) { ... }
    
    composable(
        route = Screen.TweetDetail.route,
        arguments = listOf(navArgument("tweetId") { type = NavType.IntType })
    ) { ... }
}

// Navegación tipeada sin concatenar cadenas manualmente:
navController.navigate(Screen.TweetDetail.createRoute(tweet.id))

```

---

## Errores Comunes

* ⚠️ **Usar textos crudos (`"home"`, `"register"`):** Provoca errores tipográficos silenciosos que el compilador no detecta, causando fallos *runtime* al ejecutar la navegación.

## Buenas Prácticas

* Usar la sintaxis moderna `data object` de Kotlin para representar miembros singleton inmutables dentro de la clase sellada.

## Relación con otros conceptos

* Reemplaza las cadenas de texto utilizadas en: [02 - NavHostController NavHost y State Hoisting de Eventos](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>) y [04 - Rutas Parametrizadas Extraccion de Argumentos y Manejo Seguro de Nulos](<04%20-%20Rutas%20Parametrizadas%20Extraccion%20de%20Argumentos%20y%20Manejo%20Seguro%20de%20Nulos.md>)
* Define las rutas consumidas por: [06 - Barra de Navegacion Inferior BottomNavigationBar e Iconos Dinamicos](<06%20-%20Barra%20de%20Navegacion%20Inferior%20BottomNavigationBar%20e%20Iconos%20Dinamicos.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué una `Sealed Class` es superior a una `Enum Class` para gestionar las rutas de una aplicación con navegación parametrizada.
2. **Aplicación:** Escribe una `Sealed Class` que contenga una ruta simple ("home") y una ruta parametrizada ("profile/{userId}") con su función creadora.

## Fuente

* **Clase:** Definición Tipada de Rutas con Sealed Class (Screen)
* **Timestamp:** ~38:00 - 48:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
