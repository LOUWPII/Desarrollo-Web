---
tags:
  - retrofit
  - android
  - kotlin
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Retrofit y Android
  - Índice Retrofit
---

# Índice y Mapa de Conocimiento — Consumo de API REST con Retrofit, DTOs y Jetpack Compose

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Reorganización de UI y Migración de IDs a String](<01%20-%20Reorganizacion%20de%20UI%20y%20Migracion%20de%20Identificadores%20a%20String.md>) | Subcarpetas UI, `String` vs `Int` y navegación condicional |
| 02 | [Configuración de Red en Android, IP del Emulador y Traffic Permitted](<02%20-%20Configuracion%20de%20Red%20en%20Android%20IP%20del%20Emulador%20y%20Traffic%20Permitted.md>) | `10.0.2.2`, `network_security_config.xml` e `INTERNET` |
| 03 | [Inyección de Retrofit con Dagger Hilt y AppModule](<03%20-%20Inyeccion%20de%20Retrofit%20con%20Dagger%20Hilt%20y%20AppModule.md>) | `@Module`, `@Provides`, `@Singleton` y `baseUrl` |
| 04 | [Patrón DTO, Mapeo y Desacoplamiento de Capas](<04%20-%20Patron%20DTO%20Mapeo%20y%20Desacoplamiento%20de%20Capas.md>) | `data class` de red, funciones de extensión y DataSources |
| 05 | [Servicios Retrofit, Anotaciones HTTP e Implementación de DataSources](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>) | `@GET/@POST/@PUT/@DELETE`, `@Path`, `@Body` |
| 06 | [Arquitectura de Repositorios, Result y Debate sobre Response](<06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>) | `Result<T>`, `HttpException` y Clean Architecture |
| 07 | [Estados de UI, Manejo de Carga y Efectos de Navegación en Compose](<07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>) | `UI State`, `LaunchedEffect` y renderizado condicional |
| 08 | [Operaciones CRUD, Perfil de Usuario y Eliminación Optimizada](<08%20-%20Operaciones%20CRUD%20Perfil%20de%20Usuario%20y%20Eliminacion%20Optimizada.md>) | Filtrado local en memoria y serialización HTTP 204 |

---

## 2. Mapa de Conocimiento

```text
Ecosistema Retrofit & Android Compose
├── Configuración e Infraestructura de Red
│   ├── Reorganización de UI e Identificadores String (01)
│   ├── Configuración de Red e IP 10.0.2.2 (02)
│   └── Inyección de Retrofit con Hilt (03)
│
├── Capa de Datos y Arquitectura Limpia
│   ├── Patrón DTO y Mapeo de Capas (04)
│   ├── Servicios Retrofit y DataSources (05)
│   └── Repositorios y Debate sobre Response<T> (06)
│
└── Capa de Presentación e Integración CRUD
    ├── UI States y Navegación Reactiva (07)
    └── Operaciones CRUD y Eliminación Optimizada (08)

```

### Explicación de la Relación entre los Conceptos

La arquitectura arranca con la **Reorganización de la UI e Identificadores** ([01](<01%20-%20Reorganizacion%20de%20UI%20y%20Migracion%20de%20Identificadores%20a%20String.md>)), adaptando la aplicación para conectarse mediante la **Configuración de Red e IP `10.0.2.2`** ([02](<02%20-%20Configuracion%20de%20Red%20en%20Android%20IP%20del%20Emulador%20y%20Traffic%20Permitted.md>)), e inyectando la instancia global del cliente mediante **Hilt y AppModule** ([03](<03%20-%20Inyeccion%20de%20Retrofit%20con%20Dagger%20Hilt%20y%20AppModule.md>)).

La capa de datos se aísla implementando el **Patrón DTO y Mapeo** ([04](<04%20-%20Patron%20DTO%20Mapeo%20y%20Desacoplamiento%20de%20Capas.md>)), los cuales son transferidos mediante los **Servicios Retrofit y DataSources** ([05](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>)). La lógica de negocio y el control de errores se encapsulan en los **Repositorios** ([06](<06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>)), rechazando el acoplamiento a `Response<T>`.

Finalmente, los resultados empaquetados en `Result<T>` alimentan la UI mediante **UI States y Navegación Reactiva** ([07](<07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>)), permitiendo ejecutar **Operaciones CRUD Completas y Eliminación Optimizada** ([08](<08%20-%20Operaciones%20CRUD%20Perfil%20de%20Usuario%20y%20Eliminacion%20Optimizada.md>)) con filtrado en memoria.

---

## 3. Lo Esencial

1. **IP del Emulador (`10.0.2.2`):** El emulador de Android debe conectarse al servidor local del host usando [`http://10.0.2.2:3000`](http://10.0.2.2:3000) en lugar de `localhost`.
2. **Tráfico Claro HTTP:** Para realizar solicitudes `http://` en Android 9+, se debe configurar el archivo `network_security_config.xml` vinculándolo en el `AndroidManifest.xml`.
3. **Patrón DTO para Desacoplamiento:** Separa los objetos de red (JSON) de los modelos de la UI, utilizando funciones de extensión (`Dto.toDomain()`) para proteger las vistas de cambios en el servidor.
4. **Desacoplamiento Tecnológico:** Se debe evitar el uso de la clase `Response<T>` de Retrofit en Repositorios y DataSources, atrapando excepciones `HttpException` para mantener la arquitectura limpia e independiente.
5. **Navegación Reactiva con `LaunchedEffect`:** Operaciones asíncronas de guardado o edición deben conmutar banderas booleanas observadas por `LaunchedEffect` para evitar cierres prematuros de pantalla.
6. **Filtrado Local en Memoria:** Al eliminar un registro con éxito, se debe remover directamente del `UI State` local usando `.filter()`, evitando re-consultar toda la lista por red.

---

## 4. Debo Saber Hacer

- [ ] Configurar el archivo `network_security_config.xml` y habilitar el permiso de internet en el `AndroidManifest.xml`. → [02](<02%20-%20Configuracion%20de%20Red%20en%20Android%20IP%20del%20Emulador%20y%20Traffic%20Permitted.md>)
- [ ] Proveer una instancia Singleton de Retrofit con `GsonConverterFactory` dentro de un módulo de Dagger Hilt (`AppModule`). → [03](<03%20-%20Inyeccion%20de%20Retrofit%20con%20Dagger%20Hilt%20y%20AppModule.md>)
- [ ] Crear DTOs de entrada y salida (`CreateTweetDto`) con sus respectivas funciones de extensión de mapeo. → [04](<04%20-%20Patron%20DTO%20Mapeo%20y%20Desacoplamiento%20de%20Capas.md>)
- [ ] Declarar servicios Retrofit con anotaciones `@GET`, `@POST`, `@PUT`, `@DELETE`, `@Path` y `@Body`. → [05](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>)
- [ ] Implementar repositorios que atrapen `HttpException` y retornen objetos empaquetados en `Result<T>`. → [06](<06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>)
- [ ] Manejar renderizado condicional con `when` en Compose para mostrar `CircularProgressIndicator` en estados de carga. → [07](<07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>)
- [ ] Implementar navegación de retorno asíncrona mediante `LaunchedEffect(state.navigateBack)`. → [07](<07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>)
- [ ] Aplicar filtrado en memoria (`.filter { it.id != id }`) en un ViewModel al recibir una confirmación de eliminación exitosa. → [08](<08%20-%20Operaciones%20CRUD%20Perfil%20de%20Usuario%20y%20Eliminacion%20Optimizada.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Usar `localhost` en el emulador** | Intentar conectar `127.0.0.1` en lugar de `10.0.2.2` y recibir rechazo de conexión | [02](<02%20-%20Configuracion%20de%20Red%20en%20Android%20IP%20del%20Emulador%20y%20Traffic%20Permitted.md>) |
| **Omitir la barra final `/` en la `baseUrl`** | Colapso en tiempo de ejecución (`IllegalArgumentException: baseUrl must end in /`) | [03](<03%20-%20Inyeccion%20de%20Retrofit%20con%20Dagger%20Hilt%20y%20AppModule.md>) |
| **Acoplar la UI a clases DTO** | Pasar DTOs directamente a los composables en lugar de modelos de dominio | [04](<04%20-%20Patron%20DTO%20Mapeo%20y%20Desacoplamiento%20de%20Capas.md>) |
| **Desalinear `@Path` con `{...}` de la URL** | Error de coincidencia en tiempo de ejecución en el servicio Retrofit | [05](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>) |
| **Usar `Response<T>` en Repositorios** | Contaminar la capa de dominio con clases exclusivas de Retrofit | [06](<06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>) |
| **Navegar de forma síncrona en botones** | Invocar `popBackStack()` antes de la confirmación asíncrona de la BD | [07](<07%20-%20Estados%20de%20UI%20Manejo%20de%20Carga%20y%20Efectos%20de%20Navegacion%20en%20Compose.md>) |
| **Re-consultar la red tras eliminar** | Realizar un `getTweets()` completo en lugar de filtrar la lista local | [08](<08%20-%20Operaciones%20CRUD%20Perfil%20de%20Usuario%20y%20Eliminacion%20Optimizada.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Redes)** ¿Por qué se debe utilizar la dirección IP `10.0.2.2` en lugar de `localhost` para conectar un emulador de Android a un servidor Node.js local?
2. **(Diagnóstico / Retrofit)** Si Retrofit lanza la excepción `java.lang.IllegalArgumentException: baseUrl must end in /`, ¿cuál es el error en tu archivo `AppModule.kt`?
3. **(Arquitectura / DTOs)** Mencióna tres razones técnicas por las cuales se debe implementar el patrón DTO en lugar de usar los modelos de la UI directamente para las peticiones de red.
4. **(Diseño / Clean Architecture)** ¿Por qué el uso de la clase `Response<T>` de Retrofit dentro de la interfaz de un Repositorio vulnera la Arquitectura Limpia?
5. **(Aplicación / Compose)** Escribe el bloque de código con `LaunchedEffect` necesario para ejecutar una acción de navegación solo cuando la propiedad `navigateBack` del estado sea `true`.
6. **(Optimización / Performance)** Explica la diferencia entre refrescar una lista de la UI haciendo una petición GET a la red versus aplicar un filtrado local en memoria tras eliminar un elemento.