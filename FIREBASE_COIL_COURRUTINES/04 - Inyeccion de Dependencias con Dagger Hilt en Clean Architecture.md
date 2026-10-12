---
tags:
  - dagger-hilt
  - inyeccion-dependencias
  - clean-architecture
  - android
aliases:
  - Dagger Hilt
  - HiltAndroidApp
  - Inyección de Dependencias
clase: Inyección de Dependencias con Dagger Hilt y Estructura en Capas (Clean Architecture)
timestamp: ~50:00 - 64:00 min (Parte 1)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Inyección de Dependencias con Dagger Hilt en Clean Architecture

## Definición

**Dagger Hilt** es la librería oficial recomendada por Google para automatizar la **Inyección de Dependencias (DI)** en Android. Suministra las instancias requeridas por los componentes del ciclo de vida sin necesidad de instanciarlos internamente, facilitando las pruebas unitarias y el desacoplamiento de capas.

## Anotaciones Clave de Dagger Hilt

| Anotación | Componente donde se aplica | Función |
| --- | --- | --- |
| **`@HiltAndroidApp`** | Clase `Application` raíz (`BaseApplication`). | Inicializa el contenedor de dependencias a nivel de aplicación. |
| **`@AndroidEntryPoint`** | `MainActivity` / `Fragment`. | Habilita la inyección de dependencias en componentes de Android. |
| **`@HiltViewModel`** | ViewModel (`LoginViewModel`). | Prepara la clase para ser instanciada por el contenedor de Hilt. |
| **`@Inject constructor`** | Constructor de clases. | Indica a Hilt qué dependencias debe inyectar automáticamente. |
| **`@Module` / `@InstallIn`** | Módulo de configuración (`FirebaseModule`). | Define un proveedor de dependencias de terceros. |
| **`@Provides` / `@Singleton`** | Métodos proveedores dentro del módulo. | Retorna una instancia única (*Singleton*) global. |

---

## Configuración del Módulo Proveedor (`FirebaseModule.kt`)

```kotlin
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class) // Disponible en todo el ciclo de vida de la app
object FirebaseModule {

    @Provides
    @Singleton
    fun provideFirebaseAuth(): FirebaseAuth {
        return Firebase.auth
    }
}

```

---

## Integración con Compose Navigation

Para inyectar ViewModels administrados por Hilt dentro de los grafos de navegación de Jetpack Compose, se utiliza la función `hiltViewModel()`:

```kotlin
// AppNavigation.kt
composable("login") {
    // Hilt instancia y provee el ViewModel con todas sus dependencias resueltas
    val viewModel: LoginViewModel = hiltViewModel()
    LoginScreen(viewModel = viewModel)
}

```

---

## Errores Comunes

* ⚠️ **Omitir la declaración de `@HiltAndroidApp`:** No declarar la clase `BaseApplication` en el archivo `AndroidManifest.xml` (en el atributo `android:name=".BaseApplication"`) provocará un colapso runtime al iniciar la app.

## Buenas Prácticas

* Suministrar objetos de librerías externas (como `FirebaseAuth` o `FirebaseStorage`) mediante módulos anotados con `@Module` e `@InstallIn(SingletonComponent::class)`.

## Relación con otros conceptos

* Inyecta la infraestructura configurada en: [03 - Ecosistema Firebase Arquitectura Hibrida y Version Catalog](<03%20-%20Ecosistema%20Firebase%20Arquitectura%20Hibrida%20y%20Version%20Catalog.md>)
* Proveerá instancias hacia los Data Sources de: [05 - Data Sources Repositorios y Autenticacion con Firebase Auth](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>) y [07 - Photo Picker PickVisualMedia Uri y Firebase Storage](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la función de la anotación `@HiltAndroidApp` y dónde debe ser registrada en el proyecto.
2. **Aplicación:** Escribe la función proveedora dentro de un módulo de Hilt para entregar una instancia Singleton de `FirebaseAuth`.

## Fuente

* **Clase:** Inyección de Dependencias con Dagger Hilt y Estructura en Capas (Clean Architecture)
* **Timestamp:** ~50:00 - 64:00 min (Parte 1)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
