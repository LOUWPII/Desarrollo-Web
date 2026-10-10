---
tags:
  - firestore
  - hilt
  - android
  - di
aliases:
  - Integración de Firestore
  - FirebaseHiltModule
  - FirebaseFirestore
clase: Configuración de la Librería de Firestore e Inyección de Dependencias en Android
timestamp: ~18:00 - 20:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Integración e Inyección de Firestore con Dagger Hilt

## Definición

Es la configuración de la librería del SDK de **Firebase Firestore** para Android y su provisión centralizada en forma de instancia Singleton mediante un módulo de **Dagger Hilt** (`FirebaseHiltModule`).

## Configuración de Dependencias (`build.gradle.kts`)

```kotlin
dependencies {
    // KTX para soporte de Corrutinas (.await()) y sintaxis idiómatica de Kotlin
    implementation("com.google.firebase:firebase-firestore-ktx")
}

```

---

## Provisión de la Instancia (`injection/FirebaseHiltModule.kt`)

```kotlin
import com.google.firebase.firestore.FirebaseFirestore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object FirebaseHiltModule {

    @Provides
    @Singleton
    fun providesFirestore(): FirebaseFirestore {
        // Garantiza una única conexión persistente en toda la aplicación
        return FirebaseFirestore.getInstance()
    }
}

```

---

## Errores Comunes

- ⚠️ **Instanciar `FirebaseFirestore.getInstance()` manualmente en múltiples clases:** Rompe el patrón Singleton, genera múltiples objetos de conexión innecesarios y complica las pruebas unitarias con mocks.

## Buenas Prácticas

- Inyectar `FirebaseFirestore` mediante constructor anotado con `@Inject` exclusivamente dentro de las implementaciones de los DataSources remotos.

## Relación con otros conceptos

- Basado en el paradigma expuesto en: [01 - Paradigma NoSQL Firestore vs SQL Relacional](<01%20-%20Paradigma%20NoSQL%20Firestore%20vs%20SQL%20Relacional.md>)
- Alimenta la persistencia remota de: [03 - Registro de Metadatos de Usuario y Correccion del Getter en Auth](<03%20-%20Registro%20de%20Metadatos%20de%20Usuario%20y%20Correccion%20del%20Getter%20en%20Auth.md>)

## Preguntas de repaso

1. **Aplicación:** Escribe la función proveedora de Dagger Hilt necesaria para inyectar la instancia de `FirebaseFirestore` como Singleton.

## Fuente

- **Clase:** Configuración de la Librería de Firestore e Inyección de Dependencias en Android
- **Timestamp:** ~18:00 - 20:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
