---
tags:
  - compose
  - composables
  - previews
  - unidades
aliases:
  - Composables
  - Previews
  - sp vs dp
clase: Fundamentos de Jetpack Compose: Composables y Previews
timestamp: ~15:00 - 30:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Composables, Previews y Unidades de Medida

## Definición

Un **Composable** es una función de Kotlin anotada con `@Composable` que describe de forma declarativa un elemento de la interfaz gráfica. Las **Previews** (`@Preview`) permiten visualizar estos componentes en tiempo de diseño sin necesidad de instalar la app en un emulador.

## Convención de Nombres

Toda función `@Composable` debe comenzar obligatoriamente con **letra Mayúscula** (PascalCase) para diferenciarse de las funciones de lógica estándar de Kotlin (camelCase).

```kotlin
// ✅ Correcto: Inicia en Mayúscula
@Composable
fun MensajeBienvenida(nombre: String) { ... }

// ❌ Incorrecto: Inicia en minúscula
@Composable
fun mensajeBienvenida(nombre: String) { ... }

```

---

## Unidades de Medida en Android (sp vs. dp)

| Unidad | Nombre Completo | Caso de Uso Exclusivo | Comportamiento |
| --- | --- | --- | --- |
| **`sp`** | *Scale-independent Pixels* | **Tamaños de fuente de texto.** | Escala automáticamente según las configuraciones de accesibilidad configuradas por el usuario en el sistema. |
| **`dp`** | *Density-independent Pixels* | **Dimensiones de cajas, márgenes, bordes, tamaños de imagen y espaciados.** | Mantiene proporciones físicas uniformes a través de pantallas con diferentes densidades de píxeles. |

---

## Implementación Técnica

```kotlin
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp

@Composable
fun MensajeBienvenida(nombre: String) {
    Text(
        text = "Bienvenido a $nombre",
        fontSize = 20.sp, // Uso exclusivo de sp para tipografía
        fontWeight = FontWeight.Bold,
        color = Color(0xFF1DA1F2)
    )
}

@Preview(showBackground = true)
@Composable
fun MensajeBienvenidaPreview() {
    MensajeBienvenida("Twitter")
}

```

---

## Errores Comunes

* ⚠️ **Usar `dp` para tamaños de texto:** Rompe las preferencias de accesibilidad de usuarios con problemas visuales que requieren aumentar el tamaño del texto en la configuración de Android.

## Buenas Prácticas

* Usar la anotación `@Preview(showBackground = true)` para visualizar fondos blancos debajo de componentes de texto durante el diseño.

## Relación con otros conceptos

* Define los bloques que se organizan dentro de: [03 - Layouts Basicos Column Row Box y Recursos R](<03%20-%20Layouts%20Basicos%20Column%20Row%20Box%20y%20Recursos%20R.md>)
* Se estiliza mediante: [04 - Reglas de Modificadores Modifier y Patron Oficial de Google](<04%20-%20Reglas%20de%20Modificadores%20Modifier%20y%20Patron%20Oficial%20de%20Google.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la diferencia técnica entre las unidades de medida `sp` y `dp` y cuándo debe usarse cada una.
2. **Diagnóstico:** Si creas una función `@Composable` nombrada `botonRegistro()`, ¿por qué la herramienta de desarrollo o tu equipo marcarán un error de convención?

## Fuente

* **Clase:** Fundamentos de Jetpack Compose: Composables y Previews
* **Timestamp:** ~15:00 - 30:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
