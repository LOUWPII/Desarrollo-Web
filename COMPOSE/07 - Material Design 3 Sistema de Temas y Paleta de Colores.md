---
tags:
  - compose
  - material-3
  - tema
  - colores
aliases:
  - Material Design 3
  - Material 3
  - Sistema de Temas
  - Paleta de Colores
clase: Material Design 3, Sistema de Temas y Paleta de Colores
timestamp: ~45:00 - 01:15:00 hr (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Material Design 3, Sistema de Temas y Paleta de Colores

## Definición

**Material Design 3 (M3)** es el sistema de diseño estándar de Google para Android. Administra el esquema de colores, la tipografía y la forma de los componentes a través de la arquitectura de temas centralizada en `Theme.kt`.

## Gestión de Colores: `Color.kt` vs. `colors.xml`

En el desarrollo legacy con XML, los colores se definían en `colors.xml`. En Jetpack Compose, todos los colores se declaran como objetos de tipo `Color` en código Kotlin dentro de `ui/theme/Color.kt`.

```kotlin
// ui/theme/Color.kt
val TwitterBlue = Color(0xFF1DA1F2)
val DarkBackground = Color(0xFF15202B)
val LightBackground = Color(0xFFFFFFFF)

```

---

## Colores Dinámicos (*Dynamic Color*)

A partir de Android 12 (API 31), el sistema soporta **Dynamic Color**, una característica que adapta los colores primarios de la aplicación al fondo de pantalla del usuario.

⚠️ **Desactivación para Identidad de Marca:**
Para aplicaciones empresariales o con identidad visual corporativa rígida (como Twitter, Facebook o bancos), **se debe desactivar `dynamicColor`** en `Theme.kt` asignando `dynamicColor = false`. De lo contrario, el sistema operativo cambiará la paleta corporativa de la app.

```kotlin
// ui/theme/Theme.kt
@Composable
fun TwitterFalsoTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false, // Desactivado para preservar identidad corporativa
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}

```

---

## Errores Comunes

* **Dejar `dynamicColor = true` por defecto en apps corporativas:** Provocará que el botón de la app se muestre verde o rosa si el usuario tiene un fondo de pantalla de esos colores.

## Buenas Prácticas

* Utilizar la herramienta web **Material Theme Builder** de Google para exportar los esquemas de color claros y oscuros completos para Compose.

## Relación con otros conceptos

* Aplica temas sobre: [02 - Composables Previews y Unidades de Medida](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>) y [04 - Reglas de Modificadores Modifier y Patron Oficial de Google](<04%20-%20Reglas%20de%20Modificadores%20Modifier%20y%20Patron%20Oficial%20de%20Google.md>)
* Configura las tipografías de: [08 - Tipografias Personalizadas e Integracion de Fuentes Locales](<08%20-%20Tipografias%20Personalizadas%20e%20Integracion%20de%20Fuentes%20Locales.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué se debe asignar `dynamicColor = false` en la configuración de `Theme.kt` en una aplicación corporativa?
2. **Aplicación:** Explica la diferencia técnica de ubicación entre definir colores en el desarrollo XML antiguo versus Jetpack Compose.

## Fuente

* **Clase:** Material Design 3, Sistema de Temas y Paleta de Colores
* **Timestamp:** ~45:00 - 01:15:00 hr (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
