---
tags:
  - firestore
  - dto
  - polimorfismo
  - arquitectura
aliases:
  - DTOs Polimórficos
  - Desacoplamiento de Esquemas
  - UserDtoGeneric
clase: Desacoplamiento de Esquemas Heterogéneos mediante DTOs Polimórficos
timestamp: ~36:00 - 43:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Desacoplamiento de Esquemas Heterogéneos con DTOs Polimórficos

## Definición

Es el patrón arquitectónico donde una clase abstracta o interfaz (`UserDtoGeneric`) encapsula el contrato de conversión hacia el modelo visual (`toUserProfileInfo()`), permitiendo que distintas fuentes de datos remotas (como Express/SQL versus Firestore/NoSQL) posean DTOs con nombres de campos heterogéneos sin impactar la capa de presentación.

## El Problema de la Heterogeneidad de Campos

- **Servidor Express (PostgreSQL):** La columna de ubicación se denomina `location`.
- **Servidor Firestore (NoSQL):** El campo fue guardado en español como `país`.

```text
                          ┌────────────────────────┐
                          │     UserDtoGeneric     │ (Abstracta)
                          └───────────┬────────────┘
                                      │
           ┌──────────────────────────┴──────────────────────────┐
           ▼                                                     ▼
┌─────────────────────────────┐                       ┌─────────────────────────────┐
│   UserProfileRetrofitDto    │                       │  UserProfileFirestoreDto    │
│  (Campo: location: String?) │                       │   (Campo: país: String?)    │
└──────────┬──────────────────┘                       └──────────┬──────────────────┘
           │                                                     │
           └──────────────────────────┬──────────────────────────┘
                                      │ Mapean hacia el mismo contrato de UI
                                      ▼
                          ┌────────────────────────┐
                          │    UserProfileInfo     │
                          │   (location: String)   │
                          └────────────────────────┘

```

---

## Implementación Técnica (`data/dto/UserDtoGeneric.kt`)

```kotlin
// Contrato genérico abstracto
abstract class UserDtoGeneric {
    abstract fun toUserProfileInfo(): UserProfileInfo
}

// Implementación DTO para Firestore
data class UserProfileFirestoreDto(
    val name: String = "",
    val username: String = "",
    val país: String? = null,
    val bio: String? = null
) : UserDtoGeneric() {
    constructor() : this("", "", null, null)

    override fun toUserProfileInfo() = UserProfileInfo(
        name = name,
        username = "@$username",
        location = país ?: "No hay ubicación", // Mapea 'país' a 'location' de la UI
        bio = bio ?: "No hay biografía"
    )
}

// Implementación DTO para Retrofit/Express
data class UserProfileRetrofitDto(
    val name: String = "",
    val username: String = "",
    val location: String? = null,
    val bio: String? = null
) : UserDtoGeneric() {
    override fun toUserProfileInfo() = UserProfileInfo(
        name = name,
        username = "@$username",
        location = location ?: "No hay ubicación",
        bio = bio ?: "No hay biografía"
    )
}

```

---

## Beneficio Arquitectónico Supremo

Permite alternar el origen de datos completo en la inyección de dependencias (`UserRepository`) cambiando únicamente la clase del DataSource inyectado, sin modificar ViewModels ni composables de Jetpack Compose:

```kotlin
// Cambiar entre estas dos líneas no rompe ninguna pantalla
private val userRemoteDataSource: UserFirestoreDataSourceImplementation // O UserRetrofitDataSourceImplementation

```

---

## Errores Comunes

- **Intentar renombrar columnas en bases de datos en producción:** Suele ser imposible o riesgoso. La solución elegante es resolver el desacoplamiento en la capa DTO del cliente móvil.

## Buenas Prácticas

- Usar clases abstractas o interfaces para DTOs cuando la aplicación deba soportar migración entre múltiples proveedores de backend.

## Relación con otros conceptos

- Extiende la deserialización de: [04 - Deserializacion en Firestore y Constructor Vacio en DTOs](<04%20-%20Deserializacion%20en%20Firestore%20y%20Constructor%20Vacio%20en%20DTOs.md>)
- Se utiliza dentro del repositorio analizado en: [06 - Arquitectura de Repositorios Result T y Debate sobre Response T](<../RETROFIT/06%20-%20Arquitectura%20de%20Repositorios%20Result%20T%20y%20Debate%20sobre%20Response%20T.md>) (Nota de API REST)

## Preguntas de repaso

1. **Comprensión:** Explica cómo el patrón de DTOs polimórficos permite cambiar la fuente de datos de una aplicación móvil de PostgreSQL a Firestore sin modificar la UI.

## Fuente

- **Clase:** Desacoplamiento de Esquemas Heterogéneos mediante DTOs Polimórficos
- **Timestamp:** ~36:00 - 43:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
