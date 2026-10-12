---
tags:
  - kotlin
  - result
  - manejo-errores
  - clean-architecture
aliases:
  - Result<T>
  - Patrón Result
  - Manejo de Errores
clase: Manejo de Errores Estructurado mediante el Patrón Result
timestamp: ~112:00 - 124:00 min (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Manejo Estructurado de Errores con el Patrón Result

## Definición

**`Result<T>`** es un tipo sellado nativo de Kotlin que encapsula el éxito (`Result.success(value)`) o el fallo (`Result.failure(exception)`) de una operación asíncrona. Permite abstraer a la capa de presentación (UI) de las excepciones específicas arrojadas por los SDKs o la red.

## Arquitectura del Desacoplamiento de Excepciones

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                      Capa de Datos                          │
 │  - Captura excepciones del SDK (FirebaseInvalid...Exception) │
 │  - Mapea el error a un Result.failure(Exception("Texto"))   │
 └──────────────┬──────────────────────────────────────────────┘
                │ Retorna Result<T> limpio
 ┌──────────────▼──────────────────────────────────────────────┐
 │                    Capa de UI / ViewModel                   │
 │  - Evalúa .onSuccess { ... } o .onFailure { ... }           │
 │  - Desconoce las clases internas del SDK de Firebase.        │
 └─────────────────────────────────────────────────────────────┘

```

---

## Implementación Técnica

### 1. Manejo en el Repositorio (`AuthRepository.kt`):

```kotlin
suspend fun login(email: String, pass: String): Result<Unit> {
    return try {
        authDataSource.signIn(email, pass)
        Result.success(Unit) // Operación exitosa sin retorno de valor
    } catch (e: FirebaseInvalidCredentialsException) {
        Result.failure(Exception("Las credenciales ingresadas son incorrectas."))
    } catch (e: Exception) {
        Result.failure(Exception("Error de conexión. Intente más tarde."))
    }
}

```

### 2. Consumo en el ViewModel (`LoginViewModel.kt`):

```kotlin
fun onLoginClicked(email: String, pass: String) {
    viewModelScope.launch {
        _uiState.update { it.copy(isLoading = true) }
        
        val result = authRepository.login(email, pass)
        
        result.onSuccess {
            _uiState.update { it.copy(isLoading = false, isLoggedIn = true) }
        }.onFailure { exception ->
            _uiState.update { it.copy(isLoading = false, errorMessage = exception.message) }
        }
    }
}

```

---

## Errores Comunes

* ⚠️ **Propagar excepciones del SDK hasta la UI:** Permitir que excepciones como `FirebaseAuthInvalidUserException` lleguen directamente a la pantalla acopla la vista al SDK y muestra mensajes de error crudos en inglés al usuario.

## Buenas Prácticas

* Usar los métodos funcionales `.onSuccess` y `.onFailure` para reaccionar al resultado dentro del ViewModel de forma declarativa.

## Relación con otros conceptos

* Procesa las excepciones de las funciones descritas en: [02 - Corrutinas Avanzadas launch async await y Manejo de Excepciones](<02%20-%20Corrutinas%20Avanzadas%20launch%20async%20await%20y%20Manejo%20de%20Excepciones.md>) y [05 - Data Sources Repositorios y Autenticacion con Firebase Auth](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>)

## Preguntas de repaso

1. **Comprensión:** Explica cómo el patrón `Result<T>` ayuda a cumplir con los principios de Clean Architecture al manejar errores de red.
2. **Aplicación:** Escribe una función de repositorio que ejecute una llamada y devuelva `Result.success` o `Result.failure`.

## Fuente

* **Clase:** Manejo de Errores Estructurado mediante el Patrón Result
* **Timestamp:** ~112:00 - 124:00 min (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
