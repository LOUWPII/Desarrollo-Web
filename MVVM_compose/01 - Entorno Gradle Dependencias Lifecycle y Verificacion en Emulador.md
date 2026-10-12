---
tags:
  - mvvm
  - gradle
  - lifecycle
  - android
aliases:
  - Entorno Gradle MVVM
  - lifecycle-viewmodel-compose
  - Verificación en Emulador
clase: Configuración de Dependencias en Gradle y Verificación de Entorno
timestamp: ~00:00 - 02:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Entorno Gradle, Dependencias Lifecycle y Verificación en Emulador

## Definición

Es el proceso de integración de las librerías oficiales de arquitectura de Android (`lifecycle-viewmodel-compose` y `runtime-livedata`) en el script de construcción de Gradle, acompañado por el protocolo de verificación en tiempo de ejecución mediante compilación directa en emulador o dispositivo físico.

## Configuración de Dependencias (`build.gradle.kts` - Module `:app`)

```kotlin
dependencies {
    // ViewModel para Jetpack Compose
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")

    // Integración de LiveData con Compose (para interoperabilidad/legacy)
    implementation("androidx.compose.runtime:runtime-livedata:1.6.0")
}

```

---

## Protocolo de Verificación Post-Sincronización

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                 Sincronización de Gradle                    │
 └──────────────┬──────────────────────────────────────────────┘
                │
                ▼
 ⚠️ NO CONFIAR ÚNICAMENTE EN LOS `@Preview` DE ANDROID STUDIO
  - Los Previews pueden renderizar vistas ignorando conflictos de 
    versiones o faltas de inicializadores en tiempo de ejecución.
                │
                ▼
 ✅ REGLA DE ORO: Compilar y ejecutar inmediatamente en el emulador
    para validar la compatibilidad de binarios y dependencias.

```

---

## Errores Comunes

* ⚠️ **Falsa seguridad por Previews verdes:** Asumir que el código es correcto porque `@Preview` compila sin errores. Al ejecutar en el dispositivo, conflictos de versiones entre dependencias de `lifecycle` o Compose causarán un colapso instantáneo (*Crash*) al arrancar.

## Buenas Prácticas

* Ejecutar la aplicación en un emulador inmediatamente después de cada sincronización de Gradle (`Sync Now`) para descartar fallas de compatibilidad.

## Relación con otros conceptos

* Habilita la instanciación de clases descritas en: [03 - Estructuracion de Proyecto por Features y Clase ViewModel](<03%20-%20Estructuracion%20de%20Proyecto%20por%20Features%20y%20Clase%20ViewModel.md>)
* Permite la recolección de estados analizada en: [05 - Comparativa Tecnicas de Estado mutableStateOf LiveData y StateFlow](<05%20-%20Comparativa%20Tecnicas%20de%20Estado%20mutableStateOf%20LiveData%20y%20StateFlow.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué no se debe confiar únicamente en las previsualizaciones (`@Preview`) tras agregar o actualizar librerías en Gradle?
2. **Aplicación:** Escribe las dos dependencias de Lifecycle requeridas para integrar la arquitectura MVVM con Jetpack Compose.

## Fuente

* **Clase:** Configuración de Dependencias en Gradle y Verificación de Entorno
* **Timestamp:** ~00:00 - 02:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
