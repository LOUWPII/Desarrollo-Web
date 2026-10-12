---
tags:
  - compose
  - navegacion
  - argumentos
  - nulos
aliases:
  - Rutas Parametrizadas
  - NavBackStackEntry
  - Manejo Seguro de Nulos
clase: Navegación con Parámetros Dinámicos y Reutilización de Componentes (TweetDetailScreen)
timestamp: ~22:00 - 38:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Rutas Parametrizadas, Extracción de Argumentos y Manejo Seguro de Nulos

## Definición

Es la técnica para transferir información dinámica entre pantallas definiendo argumentos dentro de la cadena de la ruta (ej. `"tweetDetail/{tweetId}"`), especificando su tipo mediante `NavType` y extrayéndolos de forma segura desde la entidad `NavBackStackEntry`.

## Pasos para Configurar una Ruta Parametrizada

1. **Definir la ruta con la variable entre llaves:** `"tweetDetail/{tweetId}"`.
2. **Declarar el tipo de argumento:** Usando `arguments = listOf(navArgument("tweetId") { type = NavType.IntType })`.
3. **Extraer el argumento:** Utilizando `backStackEntry.arguments?.getInt("tweetId")` junto con el operador Elvis (`?:`) para asignar un valor de respaldo por defecto.
4. **Validación defensiva de nulos:** Evitar el uso del operador de aserción no nula (`!!`).

---

## Cero Tolerancia al Operador `!!` (Manejo Seguro de Nulos)

```kotlin
// ❌ PELIGROSO: Si el tweet no existe o fue eliminado, la app colapsará con NullPointerException
val tweet = LocalTweetProvider.getTweets().find { it.id == tweetId }!!

```

```kotlin
// ✅ SEGURO: Evaluación defensiva con renderizado condicional
val tweetId = backStackEntry.arguments?.getInt("tweetId") ?: 0
val tweet = LocalTweetProvider.getTweets().find { it.id == tweetId }

if (tweet != null) {
    TweetDetailScreen(
        tweet = tweet,
        onBackClick = { navController.popBackStack() }
    )
} else {
    // Vista alternativa limpia
    Text(text = "Tweet no encontrado")
}

```

---

## Implementación de la Ruta en `AppNavigation.kt`

```kotlin
composable(
    route = "tweetDetail/{tweetId}",
    arguments = listOf(
        navArgument("tweetId") { type = NavType.IntType }
    )
) { backStackEntry ->
    val tweetId = backStackEntry.arguments?.getInt("tweetId") ?: 0
    val tweet = LocalTweetProvider.getTweets().find { it.id == tweetId }

    if (tweet != null) {
        TweetDetailScreen(
            tweet = tweet,
            onBackClick = { navController.popBackStack() }
        )
    } else {
        Text(text = "Tweet no encontrado")
    }
}

```

---

## Errores Comunes

* ⚠️ **Incoherencia en los nombres de las claves:** Escribir `"tweetDetail/{tweetId}"` en la ruta pero buscar `getInt("id")` provocaría que el argumento siempre retorne nulo. El nombre del parámetro debe ser **idéntico carácter por carácter**.

## Buenas Prácticas

* Extraer la estructura visual de un componente (ej. `Tweet.kt`) fuera de contenedores rígidos como `Card` para permitir su reutilización tanto en listas como en vistas de detalle.

## Relación con otros conceptos

* Extiende la configuración básica de: [02 - NavHostController NavHost y State Hoisting de Eventos](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>)
* Se simplifica utilizando la estructura de: [05 - Tipado Seguro de Rutas con Sealed Class Screen](<05%20-%20Tipado%20Seguro%20de%20Rutas%20con%20Sealed%20Class%20Screen.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué no se debe utilizar el operador de aserción no nula (`!!`) al buscar una entidad basada en un parámetro extraído de la ruta?
2. **Aplicación:** Escribe la definición de un composable dentro de un `NavHost` que reciba un argumento entero llamado `userId`.

## Fuente

* **Clase:** Navegación con Parámetros Dinámicos y Reutilización de Componentes (TweetDetailScreen)
* **Timestamp:** ~22:00 - 38:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
