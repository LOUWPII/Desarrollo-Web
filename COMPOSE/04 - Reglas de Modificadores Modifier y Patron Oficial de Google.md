---
tags:
  - compose
  - modifier
  - estado
  - hoisting
  - google
aliases:
  - Modifier
  - Modificadores
  - Patrón de Google
clase: Modificadores (Modifier) y Buenas Prácticas de Google
timestamp: ~45:00 - 01:10:00 hr
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Reglas de Modificadores (Modifier) y Patrón Oficial de Google

## Definición

El objeto **`Modifier`** es el elemento fundamental en Jetpack Compose para alterar dimensiones, aplicar rellenos (*padding*), dibujar bordes, cambiar fondos y agregar eventos de interacción (como clics) a un composable.

## Principios Fundamentales de Modificadores

### 1. Ausencia de `margin` en Compose

En Jetpack Compose **no existe la propiedad `margin`**. Todo el distanciamiento interno y externo se controla ordenando de forma estratégica las llamadas al método `padding()`.

### 2. Orden de Evaluación (De Abajo hacia Arriba)

Los modificadores encadenados se evalúan en el orden exacto en que se declaran. Aplicar un `background()` antes o después de un `padding()` alterará por completo el resultado visual:

```kotlin
// El padding se aplica ANTES del fondo -> Genera espacio interno (Padding tradicional)
Modifier
    .padding(16.dp)
    .background(Color.Blue)

// El fondo se aplica ANTES del padding -> Genera espacio externo (Efecto Margin)
Modifier
    .background(Color.Blue)
    .padding(16.dp)

```

---

## Patrón Oficial de Modificadores de Google

Google establece tres reglas de oro para garantizar la reutilización y flexibilidad de los componentes:

1. **Parámetro opcional por defecto:** Todo composable reutilizable debe aceptar un parámetro `modifier: Modifier = Modifier`.
2. **Uso en el contenedor externo:** El componente raíz interno de la función debe usar el parámetro recibido con **`m` minúscula** (`modifier = modifier`).
3. **Componentes internos con `M` mayúscula:** Todos los componentes hijos internos deben instanciar modificadores nuevos con **`M` mayúscula** (`Modifier.fillMaxWidth()`).

```kotlin
@Composable
fun BotonPersonalizado(
    texto: String,
    modifier: Modifier = Modifier // 1. Parámetro opcional
) {
    Button(
        onClick = { },
        modifier = modifier // 2. Pasa el parámetro recibido con 'm' minúscula
    ) {
        Text(
            text = texto,
            modifier = Modifier.padding(4.dp) // 3. Usa 'M' mayúscula para hijos
        )
    }
}

```

---

## Errores Comunes

* ⚠️ **Instanciar `Modifier` en el contenedor raíz:** Escribir `modifier = Modifier.fillMaxWidth()` en el contenedor externo de una función composables sobrescribirá los modificadores que el componente padre intente transmitirle.

## Buenas Prácticas

* Respetar siempre el patrón de modificadores propuesto por Google para que los composables sean altamente flexibles y adaptables.

## Relación con otros conceptos

* Aplica estilos sobre: [02 - Composables Previews y Unidades de Medida](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>) y [03 - Layouts Basicos Column Row Box y Recursos R](<03%20-%20Layouts%20Basicos%20Column%20Row%20Box%20y%20Recursos%20R.md>)
* Se integra en la estructura de: [09 - Estructura de Pantalla Scaffold TopAppBar y Animaciones de Estado](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué el orden en el que se encadenan los métodos dentro de un `Modifier` modifica el comportamiento visual en pantalla.
2. **Aplicación:** Escribe el encabezado de una función composables que cumpla con el estándar de modificadores recomendado por Google.

## Fuente

* **Clase:** Modificadores (Modifier) y Buenas Prácticas de Google
* **Timestamp:** ~45:00 - 01:10:00 hr

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
