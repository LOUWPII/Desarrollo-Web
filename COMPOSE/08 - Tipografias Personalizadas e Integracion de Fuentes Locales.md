---
tags:
  - compose
  - tipografias
  - fuentes
  - recursos
aliases:
  - Tipografías Personalizadas
  - Fuentes Locales
  - FontFamily
clase: Integración de Tipografías Personalizadas y Google Fonts API
timestamp: ~01:15:00 - 01:30:00 hr (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Tipografías Personalizadas e Integración de Fuentes Locales

## Definición

Es el procedimiento para integrar e instanciar familias de fuentes tipográficas (*fonts*) personalizadas dentro de un proyecto de Jetpack Compose, utilizando archivos de fuente descargados localmente (`.ttf` o `.otf`) guardados en el directorio de recursos `res/font/`.

## Reglas Estrictas de Nombrado de Archivos en `res/font/`

Los archivos de fuentes físicas colocados en la carpeta `res/font/` deben cumplir con reglas estrictas exigidas por el compilador de Android:

1. Solo se permiten **letras minúsculas** (`a-z`).
2. Solo se permiten **números** (`0-9`) y **guiones bajos** (`_`).
3. ❌ **Prohibido:** No utilizar mayúsculas, guiones medios (`-`) ni espacios.

```text
  res/font/
  ├── pico_black.ttf       ✅ Correcto
  ├── TwitterFont-Bold.ttf ❌ Error de compilación (mayúsculas y guión medio)
  └── mi fuente.ttf        ❌ Error de compilación (espacio)

```

---

## Implementación Técnica

```kotlin
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import com.example.twitterfalso.R

// 1. Declaración de la familia de fuentes asociando el archivo de res/font
val TwitterLogoFont = FontFamily(
    Font(R.font.pico_black, FontWeight.Normal)
)

// 2. Uso dentro de un composable Text
@Composable
fun LogoTwitterHeader() {
    Text(
        text = "Twitter",
        fontFamily = TwitterLogoFont,
        fontSize = 28.sp
    )
}

```

---

## Errores Comunes

* ⚠️ **Error de compilación por nombres inválidos en `res/font`:** Nombrar una fuente como `Roboto-Bold.ttf` detendrá la construcción del proyecto en Android Studio. Se debe renombrar a `roboto_bold.ttf`.

## Buenas Prácticas

* Centralizar las definiciones de tipografía en el archivo `ui/theme/Type.kt` para que sean accesibles globalmente a través de `MaterialTheme.typography`.

## Relación con otros conceptos

* Complementa la personalización de: [07 - Material Design 3 Sistema de Temas y Paleta de Colores](<07%20-%20Material%20Design%203%20Sistema%20de%20Temas%20y%20Paleta%20de%20Colores.md>)
* Se muestra en los componentes superiores de: [09 - Estructura de Pantalla Scaffold TopAppBar y Animaciones de Estado](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>)

## Preguntas de repaso

1. **Diagnóstico:** Si agregas un archivo de fuente llamado `Pico-Black.ttf` en `res/font/` y el proyecto falla al compilar, ¿cuál es la causa y cómo lo solucionas?
2. **Aplicación:** Escribe el código necesario en Kotlin para crear un objeto `FontFamily` basado en un archivo `res/font/pico_black.ttf`.

## Fuente

* **Clase:** Integración de Tipografías Personalizadas y Google Fonts API
* **Timestamp:** ~01:15:00 - 01:30:00 hr (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
