---
tags:
  - compose
  - lazycolumn
  - lazyrow
  - lazygrid
  - data-class
aliases:
  - LazyColumn
  - LazyRow
  - LazyGrid
  - Data Classes
clase: Listas Eficientes (LazyColumn, LazyRow, LazyGrid) y Data Classes
timestamp: ~25:00 - 45:00 min (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Listas Eficientes (LazyColumn, LazyRow, LazyGrid) y Data Classes

## Definición

Los **Lazy Components** (`LazyColumn`, `LazyRow`, `LazyGrid`) son contenedores optimizados para renderizar listas dinámicas o extensas de información. Funcionan de manera equivalente al `RecyclerView` del desarrollo clásico con XML, reciclando los elementos visuales que salen de pantalla para mantener bajo el consumo de memoria.

## Diferencia de Rendimiento: `Column` vs. `LazyColumn`

* **`Column` tradicional:** Carga y dibuja en memoria **todos** los elementos del arreglo de forma simultánea, incluso si están fuera del área visible. Es ineficiente para listas de más de 10-15 elementos.
* **`LazyColumn`:** Carga y dibuja en memoria **únicamente los elementos visibles actualmente en pantalla**, destruyendo o reciclando las vistas a medida que el usuario realiza scroll.

---

## Modelado de Entidades con `data class`

En Kotlin, se utilizan las **Data Classes** para definir los modelos de datos que alimentarán las listas. Estas clases autogeneran métodos como `equals()`, `hashCode()`, `toString()` y `copy()`.

```kotlin
// Modelo de datos para un Tweet
data class TweetInfo(
    val id: Int,
    val username: String,
    val userTag: String,
    val time: String,
    val content: String,
    val likesCount: Int,
    val isLiked: Boolean
)

```

---

## Implementación Técnica

```kotlin
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ListaTweets(tweetsList: List<TweetInfo>) {
    LazyColumn {
        // Método items para iterar sobre la colección de datos
        items(tweetsList) { tweet ->
            TarjetaTweet(tweetInfo = tweet)
            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}

```

---

## Errores Comunes

* ⚠️ **Anidar `LazyColumn` dentro de otra `LazyColumn`:** Provoca excepciones de cálculo de dimensiones infinitas (*IllegalStateException*). Se debe usar una sola `LazyColumn` o gestionar encabezados con el método `item { ... }`.

## Buenas Prácticas

* Crear objetos Singleton auxiliares (`LocalTweetProvider`) para proveer colecciones de datos estáticas durante la fase de diseño y pruebas en las `@Preview`.

## Relación con otros conceptos

* Se alimenta de modelos creados con: [05 - Gestion de Estado Recomposicion y State Hoisting](<05%20-%20Gestion%20de%20Estado%20Recomposicion%20y%20State%20Hoisting.md>)
* Se integra en la estructura global de: [09 - Estructura de Pantalla Scaffold TopAppBar y Animaciones de Estado](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué `LazyColumn` es superior en uso de memoria RAM comparado con un bucle `forEach` dentro de una `Column` tradicional.
2. **Aplicación:** Escribe el bloque de código necesario para renderizar una lista de productos usando `LazyColumn` y el método `items`.

## Fuente

* **Clase:** Listas Eficientes (LazyColumn, LazyRow, LazyGrid) y Data Classes
* **Timestamp:** ~25:00 - 45:00 min (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
