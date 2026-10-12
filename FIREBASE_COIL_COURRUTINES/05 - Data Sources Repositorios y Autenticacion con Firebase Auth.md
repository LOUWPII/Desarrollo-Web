---
tags:
  - firebase-auth
  - data-sources
  - repositorios
  - clean-architecture
aliases:
  - Firebase Auth
  - AuthRemoteDataSource
  - Splash Screen
clase: Implementación de Data Sources, Repositorios y Autenticación / Splash Screen
timestamp: ~64:00 - 93:00 min (Parte 1)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Data Sources, Repositorios y Autenticación con Firebase Auth

## Definición

Es la estructuración en capas para gestionar la seguridad de usuarios. El **Data Source** interactúa directamente con los métodos asíncronos del SDK de Firebase Auth, mientras que el **Repository** expone la lógica de negocio consumida por los ViewModels dentro de un `viewModelScope`.

## Estructura de Capas de Autenticación

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                UI Layer (LoginViewModel)                    │
 │  - Invoca operaciones en viewModelScope.launch.             │
 └──────────────┬──────────────────────────────────────────────┘
                │
 ┌──────────────▼──────────────────────────────────────────────┐
 │             Domain/Data Layer (AuthRepository)              │
 │  - Modela respuestas y maneja reglas de negocio.             │
 └──────────────┬──────────────────────────────────────────────┘
                │
 ┌──────────────▼──────────────────────────────────────────────┐
 │         Data Source Layer (AuthRemoteDataSource)            │
 │  - Llama directamente a Firebase.auth.signInWithEmail...    │
 └─────────────────────────────────────────────────────────────┘

```

---

## Implementación Técnica (`AuthRemoteDataSource.kt`)

```kotlin
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

class AuthRemoteDataSource @Inject constructor(
    private val auth: FirebaseAuth
) {
    // Convierte las llamadas de tareas de Firebase a funciones de suspensión de Kotlin
    suspend fun signIn(email: String, pass: String) {
        auth.signInWithEmailAndPassword(email, pass).await()
    }

    suspend fun signUp(email: String, pass: String) {
        auth.createUserWithEmailAndPassword(email, pass).await()
    }

    fun signOut() = auth.signOut()

    // Getter dinámico para evaluar la instancia activa
    val currentUser: FirebaseUser?
        get() = auth.currentUser
}

```

---

## Redirección Lógica Inicial (*Splash Screen*)

El estado inicial de navegación se resuelve consultando la propiedad `currentUser` dentro del ViewModel del Splash:

```kotlin
@HiltViewModel
class SplashViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {

    // Determina la pantalla de destino sin mostrar formularios si la sesión sigue activa
    val isUserLoggedIn: Boolean
        get() = authRepository.currentUser != null
}

```

---

## Errores Comunes

* ⚠️ **Omitir la extensión `.await()`:** Las funciones de Firebase Auth retornan objetos de tipo `Task<T>`. Omitir `.await()` provoca que la corrutina finalice inmediatamente sin esperar a que el servidor valide las credenciales.

## Buenas Prácticas

* Evaluar siempre `auth.currentUser` mediante un getter dinámico (`get() = auth.currentUser`) para evitar retener referencias estáticas desactualizadas de la sesión del usuario.

## Relación con otros conceptos

* Ejecuta las corrutinas analizadas en: [01 - Hilo Principal Concurrencia y Fundamentos de Corrutinas en Kotlin](<01%20-%20Hilo%20Principal%20Concurrencia%20y%20Fundamentos%20de%20Corrutinas%20en%20Kotlin.md>)
* Es inyectado mediante las reglas descritas en: [04 - Inyeccion de Dependencias con Dagger Hilt en Clean Architecture](<04%20-%20Inyeccion%20de%20Dependencias%20con%20Dagger%20Hilt%20en%20Clean%20Architecture.md>)
* Encapsula sus resultados en: [08 - Manejo Estructurado de Errores con el Patron Result T](<08%20-%20Manejo%20Estructurado%20de%20Errores%20con%20el%20Patron%20Result%20T.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la función del método `.await()` al invocar llamadas del SDK de Firebase Auth dentro de una función de suspensión.
2. **Aplicación:** Escribe el método de un ViewModel para procesar un registro asíncrono dentro de `viewModelScope.launch`.

## Fuente

* **Clase:** Implementación de Data Sources, Repositorios y Autenticación / Splash Screen
* **Timestamp:** ~64:00 - 93:00 min (Parte 1)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
