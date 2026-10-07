---
tags:
  - retrofit
  - android
  - datasource
  - anotaciones
aliases:
  - Servicios Retrofit
  - Anotaciones HTTP
  - DataSources
clase: Definición de Servicios Retrofit, Anotaciones HTTP e Implementación de DataSources
timestamp: ~30:00 - 40:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Servicios Retrofit, Anotaciones HTTP e Implementación de DataSources

## Definición

Un **Servicio Retrofit** es una interfaz en Kotlin donde se declaran las rutas, métodos y contratos de red utilizando anotaciones de Retrofit (`@GET`, `@POST`, `@PUT`, `@DELETE`). La **Implementación del DataSource** es la clase que ejecuta estos métodos para cumplir con la interfaz del DataSource.

## Anotaciones HTTP Principales

- **`@GET("ruta")`:** Realiza peticiones de lectura.
- **`@POST("ruta")`:** Realiza peticiones de creación.
- **`@PUT("ruta/{id}")`:** Realiza peticiones de actualización.
- **`@DELETE("ruta/{id}")`:** Realiza peticiones de eliminación.
- **`@Path("variable")`:** Reemplaza dinámicamente bloques de la URL entre llaves `{variable}`.
- **`@Body`:** Serializa un objeto (como `CreateTweetDto`) en el cuerpo de la petición HTTP.

---

## Implementación Técnica

### 1. Interfaz del Servicio (`data/services/TweetRetrofitService.kt`):

```kotlin
import retrofit2.http.*

interface TweetRetrofitService {
    @GET("tweets")
    suspend fun getAllTweets(): List<TweetDto>

    @GET("tweets/{id}")
    suspend fun getTweetById(@Path("id") id: String): TweetDto

    @GET("tweets/{id}/replies")
    suspend fun getReplies(@Path("id") id: String): List<TweetDto>

    @POST("tweets")
    suspend fun createTweet(@Body dto: CreateTweetDto)

    @PUT("tweets/{id}")
    suspend fun updateTweet(@Path("id") id: String, @Body dto: CreateTweetDto)

    @DELETE("tweets/{id}")
    suspend fun deleteTweet(@Path("id") id: String)
}

```

### 2. Registro del Servicio en `AppModule.kt`:

```kotlin
@Provides
@Singleton
fun providesTweetRetrofitService(retrofit: Retrofit): TweetRetrofitService {
    return retrofit.create(TweetRetrofitService::class.java)
}

```

### 3. Implementación del DataSource (`TweetRetrofitDataSourceImplementation.kt`):

```kotlin
class TweetRetrofitDataSourceImplementation @Inject constructor(
    private val service: TweetRetrofitService
) : TweetRemoteDataSource {
    override suspend fun getAllTweets(): List<TweetDto> = service.getAllTweets()
    override suspend fun getTweetById(id: String): TweetDto = service.getTweetById(id)
    override suspend fun getReplies(id: String): List<TweetDto> = service.getReplies(id)
    override suspend fun createTweet(dto: CreateTweetDto) = service.createTweet(dto)
    override suspend fun updateTweet(id: String, dto: CreateTweetDto) = service.updateTweet(id, dto)
    override suspend fun deleteTweet(id: String) = service.deleteTweet(id)
}

```

---

## Errores Comunes

- ⚠️ **Nombres desacoplados en `@Path`:** Escribir `@GET("tweets/{id}")` pero nombrar el parámetro `@Path("tweet_id") id: String` provocará un error de coincidencia en tiempo de ejecución. El nombre dentro del `@Path("...")` debe coincidir exactamente con el texto dentro de las llaves en la URL.

## Buenas Prácticas

- Marcar todas las funciones del servicio Retrofit con la palabra clave `suspend` para ser invocadas dentro de corrutinas sin bloquear el hilo principal.

## Relación con otros conceptos

- Instanciado mediante: [03 - Inyeccion de Retrofit con Dagger Hilt y AppModule](<03%20-%20Inyeccion%20de%20Retrofit%20con%20Dagger%20Hilt%20y%20AppModule.md>)
- Consume objetos creados en: [04 - Patron DTO Mapeo y Desacoplamiento de Capas](<04%20-%20Patron%20DTO%20Mapeo%20y%20Desacoplamiento%20de%20Capas.md>)
- Inyectado dentro de: [06 - Arquitectura de Repositorios Result T y Debate sobre Response T](<06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>)

## Preguntas de repaso

1. **Aplicación:** Escribe la firma de un método Retrofit que envíe una petición `PUT` a la ruta `users/{id}` pasando un objeto `UpdateUserDto` en el cuerpo.

## Fuente

- **Clase:** Definición de Servicios Retrofit, Anotaciones HTTP e Implementación de DataSources
- **Timestamp:** ~30:00 - 40:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
