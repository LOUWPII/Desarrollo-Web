---
tags:
  - retrofit
  - dto
  - arquitectura
  - kotlin
aliases:
  - Patrón DTO
  - Mapping de Capas
  - Desacoplamiento
clase: Patrón DTO (Data Transfer Objects) y Arquitectura de Capas Independientes
timestamp: ~15:00 - 30:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Patrón DTO, Mapeo y Desacoplamiento de Capas

## Definición

El **Patrón DTO** (*Data Transfer Object*) consiste en crear objetos de datos diseñados exclusivamente para representar la estructura exacta en que la información viaja por la red (JSON), aislando los modelos visuales de la interfaz de usuario (**UI Models**) de los cambios en los esquemas del servidor o base de datos.

## Razones para Usar DTOs

1. **Desacoplamiento y Resistencia a Cambios:** Si el backend renombrara una columna en PostgreSQL (ej. de `createdAt` a `fecha_creacion`), solo se modifica el DTO y su función de mapeo; las pantallas de la UI permanecen intactas.
2. **Manejo de Estructuras Anidadas:** Las respuestas JSON suelen venir profundamente anidadas (ej. un objeto `user` dentro del JSON de `tweet`), mientras que la UI prefiere propiedades planas.
3. **Transformación de Tipos:** Formatear datos crudos antes de enviarlos a la vista (ej. convertir `3065` likes enteros a la cadena `"3.6K"` o timestamps a `"Hace 2 horas"`).

```text
  API REST (JSON) ──►  TweetDto (Red)  ──►  .toTweetInfo()  ──►  TweetInfo (UI)  ──►  Pantallas Compose

```

---

## Implementación Técnica

### 1. DTOs de Entrada (`data/dto/TweetDto.kt`):

```kotlin
data class UserDto(
    val id: Int,
    val username: String,
    val name: String,
    val profileImage: String?
)

data class TweetDto(
    val id: Int,
    val userId: Int,
    val content: String,
    val image: String?,
    val likes: Int,
    val retweets: Int,
    val commentsCount: Int,
    val createdAt: String,
    val user: UserDto // Estructura anidada proveniente del JOIN en el backend
)

```

### 2. DTO de Salida para Creación/Edición (`CreateTweetDto.kt`):

Diseñado con los campos mínimos requeridos para enviar en el cuerpo (`@Body`) de la petición `POST` o `PUT`.

```kotlin
data class CreateTweetDto(
    val content: String,
    val userId: Int,
    val parentTweetId: Int? = null,
    val tweetId: Int? = null
)

```

### 3. Función de Extensión / Mapeo (`TweetDto.toTweetInfo()`):

```kotlin
fun TweetDto.toTweetInfo(): TweetInfo {
    return TweetInfo(
        id = this.id.toString(),
        profileImage = this.user.profileImage ?: "",
        username = this.user.name,
        userTag = "@${this.user.username}",
        time = this.createdAt,
        content = this.content,
        likes = this.likes.toString(),
        retweets = this.retweets.toString(),
        comments = this.commentsCount.toString()
    )
}

```

### 4. Contrato Limpio del DataSource (`TweetRemoteDataSource.kt`):

```kotlin
interface TweetRemoteDataSource {
    suspend fun getAllTweets(): List<TweetDto>
    suspend fun getTweetById(id: String): TweetDto?
    suspend fun createTweet(dto: CreateTweetDto)
    suspend fun deleteTweet(id: String)
}

```

---

## Errores Comunes

- ⚠️ **Incoherencia de tipos en el DTO:** Declarar un atributo en el DTO como `String` cuando el JSON de la API devuelve un `Int`. El DTO debe reflejar estrictamente los tipos del backend.

## Buenas Prácticas

- Usar funciones de extensión (`fun Dto.toDomain()`) para centralizar la conversión entre capas.

## Relación con otros conceptos

- Protege los modelos de la UI en: [01 - Reorganizacion de UI y Migracion de Identificadores a String](<01%20-%20Reorganizacion%20de%20UI%20y%20Migracion%20de%20Identificadores%20a%20String.md>)
- Es devuelto por los servicios de: [05 - Servicios Retrofit Anotaciones HTTP e Implementacion de DataSources](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>)
- Se procesa en el repositorio en: [06 - Arquitectura de Repositorios Result T y Debate sobre Response T](<06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué no se debe usar directamente una clase DTO para renderizar los elementos dentro de una pantalla Jetpack Compose?
2. **Aplicación:** Escribe una función de extensión en Kotlin que mapee un `UserProfileDto` a un modelo `UserProfileInfo`.

## Fuente

- **Clase:** Patrón DTO (Data Transfer Objects) y Arquitectura de Capas Independientes
- **Timestamp:** ~15:00 - 30:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
