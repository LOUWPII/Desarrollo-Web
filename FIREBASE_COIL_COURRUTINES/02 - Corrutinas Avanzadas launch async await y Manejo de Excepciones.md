---
tags:
  - kotlin
  - corrutinas
  - async
  - excepciones
aliases:
  - launch
  - async await
  - Coroutine Builders
clase: Ejecución Concurrente, Builders de Corrutina (launch vs. async/await) y Manejo de Excepciones
timestamp: ~15:00 - 33:00 min (Parte 1)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Corrutinas Avanzadas: launch, async/await y Manejo de Excepciones

## Definición

Son los constructores (*Coroutine Builders*) y mecanismos de ámbito que permiten estructurar la ejecución concurrente paralela y gestionar fallos asíncronos sin propagar cancelaciones no deseadas entre tareas independientes.

## Constructores de Corrutina (`launch` vs. `async/await`)

| Constructor | Tipo de Tarea | Retorno | Caso de Uso |
| --- | --- | --- | --- |
| **`launch`** | *Fire and forget* (dispara y olvida). | `Job` (no retorna resultado directo). | Operaciones donde no se requiere un objeto de respuesta (ej. enviar logs, guardar en caché local). |
| **`async`** | Tarea diferida concurrente. | `Deferred<T>` (promesa/futuro de valor). | Consultas paralelas donde se necesita combinar o esperar el resultado mediante `.await()`. |

---

## Reducción de Tiempo por Concurrencia Paralela

Si se ejecutan dos peticiones independientes en forma síncrona o secuencial, los tiempos se suman. Al paralelizarse con `async`, el tiempo total equivale únicamente a la petición de mayor duración:

```kotlin
import kotlinx.coroutines.*

suspend fun mostrarInformacion() = coroutineScope {
    // Se inician ambas peticiones simultáneamente en segundo plano
    val userDeferred: Deferred<String> = async { obtenerUsuario() }   // Toma 4 segundos
    val tweetsDeferred: Deferred<List<String>> = async { obtenerTweets() } // Toma 3 segundos

    // .await() suspende la ejecución hasta obtener los resultados
    val user = userDeferred.await()
    val tweets = tweetsDeferred.await()

    // El bloque se completa en 4 segundos totales (no en 7 segundos)
    println("Usuario: $user tiene ${tweets.size} tweets")
}

```

---

## Aislamiento de Excepciones en Ámbitos Asíncronos

Un error no capturado dentro de una corrutina en un `coroutineScope` cancelará de forma predeterminada a todas las corrutinas hermanas. Para evitar cancelaciones en cascada, el manejo de errores debe capturarse dentro del bloque individual de cómputo:

```kotlin
suspend fun obtenerUsuarioSeguro(): String {
    return try {
        obtenerUsuarioConRiesgo()
    } catch (e: Exception) {
        "Usuario por defecto (Falló la carga)"
    }
}

```

---

## Errores Comunes

* ⚠️ **Sincronizar corrutinas con múltiples `launch`:** Usar dos bloques `launch` independientes cuando se requiere combinar sus respuestas es un anti-patrón, ya que no existe una forma limpia de coordinar su finalización. Se debe usar `async/await`.

## Buenas Prácticas

* Delimitar siempre grupos de tareas concurrentes utilizando `coroutineScope` para garantizar que la función no retorne hasta que todas sus corrutinas hijas hayan completado.

## Relación con otros conceptos

* Amplía los fundamentos establecidos en: [01 - Hilo Principal Concurrencia y Fundamentos de Corrutinas en Kotlin](<01%20-%20Hilo%20Principal%20Concurrencia%20y%20Fundamentos%20de%20Corrutinas%20en%20Kotlin.md>)
* Alimenta las llamadas asíncronas en el ViewModel de: [05 - Data Sources Repositorios y Autenticacion con Firebase Auth](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>) y [08 - Manejo Estructurado de Errores con el Patron Result T](<08%20-%20Manejo%20Estructurado%20de%20Errores%20con%20el%20Patron%20Result%20T.md>)

## Preguntas de repaso

1. **Comparación:** Explica la diferencia técnica de caso de uso entre `launch` y `async`.
2. **Cálculo / Rendimiento:** Si la Petición A tarda 5 segundos y la Petición B tarda 2 segundos, ¿cuánto tiempo tomará la ejecución si se paralelizan con `async` dentro de un `coroutineScope`?

## Fuente

* **Clase:** Ejecución Concurrente, Builders de Corrutina (launch vs. async/await) y Manejo de Excepciones
* **Timestamp:** ~15:00 - 33:00 min (Parte 1)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
