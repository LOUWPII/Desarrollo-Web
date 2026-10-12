---
tags:
  - compose
  - navegacion
  - gradle
  - single-activity
aliases:
  - Single Activity Architecture
  - MainActivity
  - navigation-compose
clase: Importación de Librerías Gradle / Arquitectura de Actividad Única y Limpieza de MainActivity
timestamp: ~00:00 - 08:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Librerías Gradle, Single Activity Architecture y Limpieza de MainActivity

## Definición

Es el establecimiento del paradigma de **Arquitectura de Actividad Única** (*Single Activity Architecture*) en Android, donde la aplicación utiliza una única `Activity` (`MainActivity`) y delega la responsabilidad de conmutar las vistas a componentes composables organizados en un contenedor principal (`TwitterApp`), utilizando la librería oficial `navigation-compose`.

## Comparativa de Paradigmas de Navegación

| Enfoque Tradicional (XML / Múltiples Activities) | Enfoque Moderno (Compose / Single Activity) |
| --- | --- |
| Una `Activity` por cada pantalla de la aplicación. | **Una sola `Activity` (`MainActivity`) para toda la app.** |
| Cambiar de pantalla destruye o pausaba actividades completas. | Transición liviana entre composables dentro del marco de la misma actividad. |
| Transferencia de datos mediante `Intent` y `Bundle` complejos. | Paso directo de argumentos mediante parámetros o rutas de navegación. |
| Manejo complejo y propenso a errores de múltiples ciclos de vida. | Ciclo de vida global unificado y simplificado. |

---

## Dependencias Requeridas (`build.gradle.kts` - Module `:app`)

```kotlin
dependencies {
    // Motor de navegación para Jetpack Compose
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // Paquete extendido de íconos de Material Design (Filled y Outlined)
    implementation("androidx.compose.material:material-icons-extended:1.6.3")
}

```

---

## Limpieza de `MainActivity.kt` y Separación de Responsabilidades

`MainActivity` no debe contener maquetación visual, llamadas a listas ni barras de navegación. Su única responsabilidad es iniciar el punto de entrada declarativo:

```kotlin
// MainActivity.kt
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            // Se invoca únicamente el composable contenedor raíz
            TwitterApp()
        }
    }
}

```

```kotlin
// TwitterApp.kt (Ubicado en la raíz de la arquitectura)
@Composable
fun TwitterApp() {
    val navController = rememberNavController()
    
    // Contenedor global de la estructura de la aplicación
    AppNavigation(navController = navController)
}

```

---

## Errores Comunes

* ⚠️ **Acumular lógica visual en `MainActivity`:** Mezclar declaraciones de rutas, listas o estructuras de `Scaffold` dentro de `MainActivity` destruye la separación de responsabilidades y dificulta las pruebas unitarias.

## Buenas Prácticas

* Renombrar archivos al inicio del desarrollo mediante la herramienta `Refactor -> Rename` de Android Studio para evitar la acumulación de deuda técnica.

## Relación con otros conceptos

* Declara las dependencias que habilitan: [02 - NavHostController NavHost y State Hoisting de Eventos](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>)
* Define el contenedor `TwitterApp` que integra: [07 - Centralizacion de Reglas de Visibilidad de Barras con NavigationLogic](<07%20-%20Centralizacion%20de%20Reglas%20de%20Visibilidad%20de%20Barras%20con%20NavigationLogic.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Cuáles son las ventajas principales de utilizar el patrón *Single Activity Architecture* frente al desarrollo clásico de múltiples `Activities`?
2. **Aplicación:** Escribe el contenido limpio que debe tener la clase `MainActivity` en una aplicación desarrollada con Jetpack Compose.

## Fuente

* **Clase:** Importación de Librerías Gradle / Arquitectura de Actividad Única y Limpieza de MainActivity
* **Timestamp:** ~00:00 - 08:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
