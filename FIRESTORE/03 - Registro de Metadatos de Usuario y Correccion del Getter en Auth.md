---
tags:
  - firestore
  - firebase-auth
  - android
aliases:
  - Registro de Metadatos
  - Getter en Auth
  - UID como Document ID
clase: Registro de Metadatos de Usuario en Firestore y Corrección del Getter en Auth
timestamp: ~20:00 - 30:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Registro de Metadatos de Usuario y Corrección del Getter en Auth

## Definición

Es el patrón de separación de responsabilidades entre la **Autenticación** (gestionada por Firebase Auth para credenciales) y el **Perfil de Usuario** (almacenado como un documento en la colección `users` de Firestore), junto con el control de referencias en tiempo real del usuario actualmente autenticado.

## Separación de Responsabilidades

```text
 ┌───────────────────────────┐           ┌───────────────────────────┐
 │       Firebase Auth       │           │    Firestore ("users")    │
 ├───────────────────────────┤           ├───────────────────────────┤
 │ - email                   │           │ - username                │
 │ - password (hash)         │ ──UID──►  │ - name                    │
 │ - UID (Clave Primaria)    │           │ - country                 │
 └───────────────────────────┘           │ - bio                     │
                                         └───────────────────────────┘

```

---

## Corrección Crítica del Getter dinámico en `AuthRemoteDataSource`

### ❌ Error Común (Evaluación Estática):

Si `currentUser` se asigna al instanciar la clase (`val currentUser = firebaseAuth.currentUser`), la propiedad almacenará un valor estático inicial (`null` antes del login) y no se actualizará cuando el usuario inicie sesión.

### ✅ Solución Técnica (Getter Personalizado):

```kotlin
// Evalúa el usuario en tiempo real en cada llamada a la propiedad
val currentUser: FirebaseUser?
    get() = firebaseAuth.currentUser

```

---

## Guardado de Perfil usando el UID como Document ID

Para vincular de forma transparente Firebase Auth con Firestore, **no** se permite que Firestore genere un ID aleatorio para el documento de usuario. Se asigna explícitamente el `uid` de Auth como clave del documento:

```kotlin
// UserFirestoreDataSourceImplementation.kt
override suspend fun registerUser(dto: RegisterUserDto, userId: String) {
    database.collection("users")
        .document(userId) // Asigna el UID como clave primaria del documento
        .set(dto)
        .await() // Pausa la corrutina hasta confirmar la escritura remota
}

```

---

## Errores Comunes

- ⚠️ **Omitir `.await()`:** Si no se utiliza `.await()`, la función continuará de forma asíncrona antes de que Firestore confirme el guardado, haciendo que la pantalla de registro se cierre antes de persistir los datos.
- **Guardar contraseñas en Firestore:** Almacenar la contraseña en texto plano o campos dentro del documento es una vulnerabilidad de seguridad grave.

## Buenas Prácticas

- Usar DTOs dedicados para el registro (`RegisterUserDto`) con campos opcionales (`country: String? = null`).

## Relación con otros conceptos

- Utiliza la instancia inyectada en: [02 - Integracion e Inyeccion de Firestore con Dagger Hilt](<02%20-%20Integracion%20e%20Inyeccion%20de%20Firestore%20con%20Dagger%20Hilt.md>)
- Se consulta mediante la técnica descrita en: [04 - Deserializacion en Firestore y Constructor Vacio en DTOs](<04%20-%20Deserializacion%20en%20Firestore%20y%20Constructor%20Vacio%20en%20DTOs.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué la propiedad `currentUser` dentro del DataSource de autenticación debe implementarse utilizando un getter personalizado (`get()`)?
2. **Aplicación:** Escribe la instrucción de Firestore para guardar un objeto `RegisterUserDto` asignándole una clave primaria de documento personalizada.

## Fuente

- **Clase:** Registro de Metadatos de Usuario en Firestore y Corrección del Getter en Auth
- **Timestamp:** ~20:00 - 30:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
