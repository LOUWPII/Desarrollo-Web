---
tags:
  - retrofit
  - arquitectura
  - repositorio
  - result
aliases:
  - Arquitectura de Repositorios
  - Result
  - Response T
  - HttpException
clase: Implementación del Repositorio, Manejo de Excepciones y Debate sobre Response
timestamp: ~40:00 - 55:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Arquitectura de Repositorios, Result y Debate sobre Response

## Definición

El **Repositorio** es la clase central que orquesta el origen de datos, ejecuta el mapeo de [DTOs](<04%20-%20Patron%20DTO%20Mapeo%20y%20Desacoplamiento%20de%20Capas.md>) a modelos de UI, atrapa excepciones de red y entrega resultados empaquetados en la clase genérica `Result<T>` (`Result.success` / `Result.failure`).

## El Debate sobre la Clase `Response<T>` de Retrofit

A menudo herramientas como ChatGPT sugieren envolver las respuestas de la red en la clase `Response<T>` de Retrofit (ej. `Response<TweetDto>`) para consultar directamente métodos como `response.isSuccessful()` o `response.code()`.

### Razón Arquitectónica para Rechazar `Response<T>`:

La clase `Response` pertenece **exclusivamente a la librería de infraestructura Retrofit**. Si en el futuro la aplicación se migra para usar Firebase, Cloud Firestore o una base de datos local SQLite (Room), la clase `Response` **deja de existir**, rompiendo todas las interfaces de contratos, repositorios y pruebas unitarias de la aplicación.

### Solución Limpia: Atrapado de `HttpException`

Devolver directamente el DTO o entidad cruda en el DataSource. Cuando el servidor responda con un código de error HTTP (ej. `404 Not Found` o `500 Internal Server Error`), Retrofit lanzará una excepción de tipo `HttpException`. Esta se atrapa en un bloque `catch` dentro del repositorio, extrayendo el código de error mediante `e.code()` sin acoplar las interfaces a Retrofit.

---

## Implementación Técnica (`data/repository/TweetRepository.kt`)

```kotlin
class TweetRepository @Inject constructor(
    private val remoteDataSource: TweetRetrofitDataSourceImplementation
) {
    suspend fun getTweets(): Result<List<TweetInfo>> {
        return try {
            val dtos = remoteDataSource.getAllTweets()
            // Transformación de DTOs a modelos de UI
            val tweetInfoList = dtos.map { it.toTweetInfo() }
            Result.success(tweetInfoList)
        } catch (e: HttpException) {
            val errorCode = e.code()
            Result.failure(Exception("Error de servidor HTTP: $errorCode"))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun createTweet(content: String, userId: String, parentTweetId: String?): Result<Unit> {
        return try {
            val dto = CreateTweetDto(
                content = content,
                userId = userId.toIntOrNull() ?: 1,
                parentTweetId = parentTweetId?.toIntOrNull()
            )
            remoteDataSource.createTweet(dto)
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

```

---

## Errores Comunes

- ⚠️ **Exponer `Response<T>` en las interfaces del DataSource:** Viola los principios de Arquitectura Limpia (*Clean Architecture*) al contaminar la capa de dominio con clases de infraestructura.

## Buenas Prácticas

- Devolver siempre `Result<T>` desde los métodos del repositorio hacia los ViewModels para obligar a la UI a gestionar explícitamente los casos de éxito y fallo.

## Relación con otros conceptos

- Transforma datos obtenidos de: [05 - Servicios Retrofit Anotaciones HTTP e Implementacion de DataSources](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>)
- Suministra datos empaquetados en `Result<T>` a: [07 - Estados de UI Manejo de Carga y Efectos de Navegacion en Compose](<07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué utilizar la clase `Response<T>` de Retrofit en la firma de un Repositorio vulnera los principios de la Arquitectura Limpia?
2. **Aplicación:** ¿Cómo se extrae el código de estado numérico (ej. 404) de una excepción `HttpException` al atraparla en un bloque `catch`?

## Fuente

- **Clase:** Implementación del Repositorio, Manejo de Excepciones y Debate sobre Response
- **Timestamp:** ~40:00 - 55:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
