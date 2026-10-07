---
tags:
  - retrofit
  - android
  - compose
  - ui
aliases:
  - Reorganización de UI
  - Migración de IDs a String
clase: Contexto de la Clase, Reorganización del Proyecto y Migración de IDs a String
timestamp: ~00:00 - 05:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Reorganización de UI y Migración de Identificadores a String

## Definición

Es el proceso de refactorización de la capa de presentación y del modelo de datos de una aplicación móvil para estructurar la UI en subcarpetas (`screens/`, `utils/`) y migrar el tipo de dato de las claves primarias (`id`) de enteros (`Int`) a cadenas de texto (`String`).

## Intuición

Imagina que estás construyendo los cimientos de una casa pensando en usar ladrillos tradicionales de arcilla (IDs numéricos de bases de datos relacionales como PostgreSQL). De repente, decides que en el futuro agregarás un segundo piso prefabricado con módulos importados (bases de datos NoSQL como Google Cloud Firestore). Si no cambias la especificación de los cimientos a un estándar flexible (cadenas `String` / UUIDs), cuando intentes conectar ambos sistemas, la estructura colapsará.

## Justificación Técnica de la Migración

1. **Compatibilidad con Firestore / NoSQL:** En bases relacionales como PostgreSQL, los IDs son numéricos autoincrementables (`1, 2, 3`). En sistemas NoSQL basados en documentos, los IDs son cadenas alfanuméricas aleatorias generadas en el cliente o servidor (ej. `"k9X2mLp81a"`).
2. **Navegación en Jetpack Compose:** La extracción de argumentos de ruta en Compose Navigation mediante `NavType.StringType` permite gestionar mejor valores nulos o vacíos sin riesgo de excepciones por conversión estricta.

---

## Parámetros de Navegación Condicional

En la pantalla de creación/edición de tweets, la intención del usuario se determina mediante la presencia o ausencia de parámetros de ruta:

| `tweetId` | `responseTweetId` | Intención de la UI |
| --- | --- | --- |
| `null` / `""` | `null` / `""` | Creación de un tweet original desde cero. |
| `null` / `""` | `!= null` | El usuario está respondiendo a un tweet existente. |
| `!= null` | Irrelevante | El usuario está editando/modificando un tweet propio publicado. |

---

## Implementación Técnica

```kotlin
// Extracción de argumentos de tipo String en AppNavigation
val tweetId = backStackEntry.arguments?.getString("tweetId") ?: ""
val responseTweetId = backStackEntry.arguments?.getString("responseTweetId") ?: ""

```

---

## Errores Comunes

- ⚠️ **Refactorización incompleta:** Cambiar el tipo de `id` en el modelo visual pero olvidar actualizar los argumentos de `NavType` en la tabla de navegación (`AppNavigation`), provocando errores de compilación masivos en cascada.

## Buenas Prácticas

- Realizar la migración de tipos de identificadores a `String` en etapas tempranas del proyecto para evitar refactorizaciones costosas de más de 2 horas en fases avanzadas.

## Relación con otros conceptos

- Prepara la arquitectura para: [04 - Patron DTO Mapeo y Desacoplamiento de Capas](<04%20-%20Patron%20DTO%20Mapeo%20y%20Desacoplamiento%20de%20Capas.md>)
- Impacta las llamadas a endpoints en: [05 - Servicios Retrofit Anotaciones HTTP e Implementacion de DataSources](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué las bases de datos NoSQL como Firestore utilizan cadenas de texto para las claves primarias en lugar de enteros autoincrementables?
2. **Aplicación:** Escribe la lógica condicional que determina si la pantalla de redacción de tweets debe comportarse en modo respuesta o en modo edición según los parámetros de ruta.

## Fuente

- **Clase:** Contexto de la Clase, Reorganización del Proyecto y Migración de IDs a String
- **Timestamp:** ~00:00 - 05:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
