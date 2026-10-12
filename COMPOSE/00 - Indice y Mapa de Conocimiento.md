---
tags:
  - compose
  - android
  - material-3
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Jetpack Compose
  - Índice Compose
---

# Índice y Mapa de Conocimiento — Jetpack Compose y Material Design 3

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Entorno Android Studio, Gradle y Dispositivos Virtuales](<01%20-%20Entorno%20Android%20Studio%20Gradle%20y%20Dispositivos%20Virtuales.md>) | Rutas limpias, AVDs, `Empty Activity` y SDK mínimo |
| 02 | [Composables, Previews y Unidades de Medida](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>) | `@Composable`, `@Preview` y `sp` vs `dp` |
| 03 | [Layouts Básicos (Column, Row, Box) y Recursos R](<03%20-%20Layouts%20Basicos%20Column%20Row%20Box%20y%20Recursos%20R.md>) | Contenedores V/H/Z, `painterResource` y `contentDescription` |
| 04 | [Reglas de Modificadores (Modifier) y Patrón Oficial de Google](<04%20-%20Reglas%20de%20Modificadores%20Modifier%20y%20Patron%20Oficial%20de%20Google.md>) | Orden de evaluación, `padding` vs `margin` y `m`/`M` |
| 05 | [Gestión de Estado, Recomposición y State Hoisting](<05%20-%20Gestion%20de%20Estado%20Recomposicion%20y%20State%20Hoisting.md>) | `mutableStateOf`, `remember` y componentes stateless |
| 06 | [Listas Eficientes (LazyColumn, LazyRow, LazyGrid) y Data Classes](<06%20-%20Listas%20Eficientes%20LazyColumn%20LazyRow%20LazyGrid%20y%20Data%20Classes.md>) | Reciclaje de vistas, `items()` y modelos `data class` |
| 07 | [Material Design 3, Sistema de Temas y Paleta de Colores](<07%20-%20Material%20Design%203%20Sistema%20de%20Temas%20y%20Paleta%20de%20Colores.md>) | `Theme.kt`, `Color.kt` y `dynamicColor` |
| 08 | [Tipografías Personalizadas e Integración de Fuentes Locales](<08%20-%20Tipografias%20Personalizadas%20e%20Integracion%20de%20Fuentes%20Locales.md>) | `res/font/`, reglas de nombrado y `FontFamily` |
| 09 | [Estructura de Pantalla con Scaffold, TopAppBar y Animaciones de Estado](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>) | `paddingValues` y `AnimatedVisibility` |

---

## 2. Mapa de Conocimiento

```text
Ecosistema Jetpack Compose & Material Design 3
├── Fundamentos de Entorno y Sintaxis
│   ├── Entorno, Gradle y AVDs (01)
│   ├── Composables, Previews y sp/dp (02)
│   └── Layouts Básicos y Recursos R (03)
│
├── Reglas de Estilizado y Estado
│   ├── Modificadores y Patrón de Google (04)
│   ├── Estado, Recomposición y State Hoisting (05)
│   └── Listas Eficientes y Data Classes (06)
│
└── Sistema de Diseño y Estructura M3
    ├── Material Design 3 y Temas (07)
    ├── Tipografías y Fuentes Locales (08)
    └── Scaffold, TopAppBar y Animaciones (09)

```

### Explicación de la Relación entre los Conceptos

La infraestructura de desarrollo se establece con **Android Studio, Gradle y AVDs** ([01](<01%20-%20Entorno%20Android%20Studio%20Gradle%20y%20Dispositivos%20Virtuales.md>)), la cual compila la sintaxis básica de **Composables, Previews y Unidades sp/dp** ([02](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>)).

Estos bloques se organizan mediante **Layouts Básicos y Recursos R** ([03](<03%20-%20Layouts%20Basicos%20Column%20Row%20Box%20y%20Recursos%20R.md>)), estilizándose bajo las **Reglas de Modificadores de Google** ([04](<04%20-%20Reglas%20de%20Modificadores%20Modifier%20y%20Patron%20Oficial%20de%20Google.md>)). La dinamización visual se logra con la **Gestión de Estado y State Hoisting** ([05](<05%20-%20Gestion%20de%20Estado%20Recomposicion%20y%20State%20Hoisting.md>)), permitiendo renderizar colecciones mediante **Listas Eficientes (`LazyColumn`)** ([06](<06%20-%20Listas%20Eficientes%20LazyColumn%20LazyRow%20LazyGrid%20y%20Data%20Classes.md>)).

Por último, la aplicación se viste con el sistema de **Material Design 3 y Temas** ([07](<07%20-%20Material%20Design%203%20Sistema%20de%20Temas%20y%20Paleta%20de%20Colores.md>)), integrando **Tipografías Locales** ([08](<08%20-%20Tipografias%20Personalizadas%20e%20Integracion%20de%20Fuentes%20Locales.md>)) y estructurándose mediante **Scaffold, TopAppBar y Animaciones** ([09](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>)).

---

## 3. Lo Esencial

1. **Arquitectura Declarativa:** La UI se construye mediante funciones `@Composable` que se ejecutan y recomponen automáticamente ante cambios en el estado.
2. **Diferenciación de Unidades (`sp` vs. `dp`):** Usar `sp` exclusivamente para tipografía (respetando accesibilidad) y `dp` para estructuras y espaciados.
3. **Patrón de Modificadores de Google:** Aceptar un parámetro `modifier: Modifier = Modifier` en los composables y aplicarlo con `m` minúscula en el contenedor raíz.
4. **State Hoisting:** Mover el estado hacia el componente padre convierte a los componentes hijos en piezas reutilizables y sin estado (*stateless*).
5. **Rendimiento con `LazyColumn`:** Carga únicamente los elementos visibles en pantalla, reciclando vistas para mantener bajo el consumo de memoria RAM.
6. **Desactivación de `dynamicColor`:** Asignar `dynamicColor = false` en `Theme.kt` para evitar que el fondo de pantalla del celular altere la paleta de colores corporativos de la app.

---

## 4. Debo Saber Hacer

- [ ] Crear un proyecto en Android Studio usando la plantilla Empty Activity sin espacios ni tildes en la ruta. → [01](<01%20-%20Entorno%20Android%20Studio%20Gradle%20y%20Dispositivos%20Virtuales.md>)
- [ ] Definir funciones `@Composable` con la primera letra en mayúscula y crear sus `@Preview` correspondientes. → [02](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>)
- [ ] Usar `Column`, `Row` y `Box` para posicionar componentes en los ejes vertical, horizontal y Z. → [03](<03%20-%20Layouts%20Basicos%20Column%20Row%20Box%20y%20Recursos%20R.md>)
- [ ] Implementar el patrón de modificadores recomendado por Google en componentes reutilizables. → [04](<04%20-%20Reglas%20de%20Modificadores%20Modifier%20y%20Patron%20Oficial%20de%20Google.md>)
- [ ] Declarar estados observables usando `var state by remember { mutableStateOf(...) }`. → [05](<05%20-%20Gestion%20de%20Estado%20Recomposicion%20y%20State%20Hoisting.md>)
- [ ] Implementar el patrón de State Hoisting pasando valores y funciones lambda de actualización hacia componentes hijos. → [05](<05%20-%20Gestion%20de%20Estado%20Recomposicion%20y%20State%20Hoisting.md>)
- [ ] Construir listas optimizadas con `LazyColumn` utilizando colecciones modeladas con `data class`. → [06](<06%20-%20Listas%20Eficientes%20LazyColumn%20LazyRow%20LazyGrid%20y%20Data%20Classes.md>)
- [ ] Configurar tipografías personalizadas desde archivos `.ttf` locales en la carpeta `res/font/`. → [08](<08%20-%20Tipografias%20Personalizadas%20e%20Integracion%20de%20Fuentes%20Locales.md>)
- [ ] Estructurar la pantalla principal con `Scaffold`, `CenterAlignedTopAppBar` y aplicar `paddingValues`. → [09](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Guardar proyectos en rutas con espacios o tildes** | Errores de construcción intermitentes en Gradle | [01](<01%20-%20Entorno%20Android%20Studio%20Gradle%20y%20Dispositivos%20Virtuales.md>) |
| **Usar `dp` para tamaños de fuente** | Destruye la accesibilidad del usuario en el sistema operativo | [02](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>) |
| **Importar `android.R` en lugar de la clase R propia** | Referencias erróneas a recursos del sistema | [03](<03%20-%20Layouts%20Basicos%20Column%20Row%20Box%20y%20Recursos%20R.md>) |
| **Instanciar `Modifier` en el contenedor raíz** | Sobrescribe los modificadores transmitidos por el padre | [04](<04%20-%20Reglas%20de%20Modificadores%20Modifier%20y%20Patron%20Oficial%20de%20Google.md>) |
| **Omitir `remember` al crear estados** | La variable se reinicia a su valor por defecto en cada recomposición | [05](<05%20-%20Gestion%20de%20Estado%20Recomposicion%20y%20State%20Hoisting.md>) |
| **Anidar `LazyColumn` dentro de `LazyColumn`** | Error de cálculo de dimensiones infinitas (*IllegalStateException*) | [06](<06%20-%20Listas%20Eficientes%20LazyColumn%20LazyRow%20LazyGrid%20y%20Data%20Classes.md>) |
| **Dejar `dynamicColor = true` en apps corporativas** | El fondo de pantalla del usuario altera la paleta de la app | [07](<07%20-%20Material%20Design%203%20Sistema%20de%20Temas%20y%20Paleta%20de%20Colores.md>) |
| **Usar mayúsculas o guiones en `res/font/`** | Rompe la compilación de recursos en Android Studio | [08](<08%20-%20Tipografias%20Personalizadas%20e%20Integracion%20de%20Fuentes%20Locales.md>) |
| **Ignorar el `paddingValues` de `Scaffold`** | La barra superior tapa los primeros elementos de la pantalla | [09](<09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Entorno)** ¿Por qué se debe evitar guardar un proyecto de Android Studio dentro de una carpeta sincronizada en la nube que contenga tildes o espacios?
2. **(Diagnóstico / Unidades)** Un usuario con visión reducida aumenta el tamaño de fuente en la configuración de Android, pero el texto de tu aplicación no cambia de tamaño. ¿Qué unidad de medida usaste incorrectamente?
3. **(Diseño / Modificadores)** Explica la regla de lectura de los modificadores en Compose y por qué alterar el orden entre `padding()` y `background()` cambia el resultado visual.
4. **(Aplicación / Estado)** Escribe el código necesario para crear un estado observable que recuerde un texto ingresado por el usuario usando la sintaxis del delegado `by`.
5. **(Comparación / Rendimiento)** Explica la diferencia de comportamiento técnico entre renderizar 100 elementos con `Column` versus hacerlo con `LazyColumn`.
6. **(Arquitectura / M3)** ¿Por qué es necesario establecer `dynamicColor = false` en `Theme.kt` cuando desarrollas una aplicación para una marca comercial?