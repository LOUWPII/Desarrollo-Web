---
tags:
  - firestore
  - dto
  - deserializacion
  - kotlin
aliases:
  - Deserialización en Firestore
  - Constructor Vacío
  - toObject
clase: Consulta de Perfil de Usuario, Deserialización y Constructor Vacío en DTOs
timestamp: ~30:00 - 36:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Deserialización en Firestore y Constructor Vacío en DTOs

## Definición

Es el proceso de conversión de una captura de documento en formato JSON (`DocumentSnapshot`) enviada por Firestore hacia una clase de datos (*data class*) de Kotlin mediante el método `snapshot.toObject(Class)`.

## Requisito del Constructor Sin Parámetros (Constructor Vacío)

Las librerías de reflexión interna de Firebase requieren un **constructor por defecto sin argumentos** para poder instanciar dinámicamente la clase antes de asignar sus propiedades por reflexión.

Si una `data class` no posee un constructor primario con valores por defecto para todos sus campos ni un constructor secundario explícito sin argumentos, la aplicación **colapsará en tiempo de ejecución**:

```text
com.google.firebase.firestore.RuntimeException: 
Could not deserialize object. Class UserProfileDto does not define a no-argument constructor.

```

---

## Implementación de DTOs con Constructor Vacío

```kotlin
// data/dto/UserProfileDto.kt
data class UserProfileDto(
    val name: String = "",
    val username: String = "",
    val país: String? = null,
    val bio: String? = null
) {
    // Constructor secundario explícito sin parámetros requerido por la reflexión de Firestore
    constructor() : this("", "", null, null)
}

```

---

## Consulta y Deserialización en DataSource

```kotlin
override suspend fun getUserById(userId: String): UserProfileDto {
    val snapshot = database.collection("users")
        .document(userId)
        .get()
        .await()
        
    // Deserialización automática a DTO
    return snapshot.toObject(UserProfileDto::class.java)
        ?: throw Exception("No se encontró el documento de usuario")
}

```

---

## Errores Comunes

- ⚠️ **Omitir el constructor por defecto o valores por defecto:** Es la causa principal de fallos *runtime* al leer documentos de Firestore.

## Buenas Prácticas

- Asignar siempre valores por defecto a todas las propiedades en la firma primaria del DTO o incluir un constructor secundario `constructor() : this(...)`.

## Relación con otros conceptos

- Lee datos escritos por: [03 - Registro de Metadatos de Usuario y Correccion del Getter en Auth](<03%20-%20Registro%20de%20Metadatos%20de%20Usuario%20y%20Correccion%20del%20Getter%20en%20Auth.md>)
- Se integra en la jerarquía polimórfica descrita en: [05 - Desacoplamiento de Esquemas Heterogeneos con DTOs Polimorficos](<05%20-%20Desacoplamiento%20de%20Esquemas%20Heterogeneos%20con%20DTOs%20Polimorficos.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué la reflexión de Firebase exige un constructor sin parámetros para deserializar un documento con `.toObject()`?
2. **Aplicación:** Escribe una `data class` DTO para Firestore con 3 propiedades que incluya el constructor secundario necesario para evitar errores de reflexión.

## Fuente

- **Clase:** Consulta de Perfil de Usuario, Deserialización y Constructor Vacío en DTOs
- **Timestamp:** ~30:00 - 36:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
