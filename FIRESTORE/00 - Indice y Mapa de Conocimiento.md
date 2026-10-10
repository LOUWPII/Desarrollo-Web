---
tags:
  - firestore
  - nosql
  - android
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Firebase Firestore
  - Índice Firestore
---

# Índice y Mapa de Conocimiento — Conexión de Android a Google Cloud Firestore con Clean Architecture

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Paradigma NoSQL Firestore vs SQL Relacional](<01%20-%20Paradigma%20NoSQL%20Firestore%20vs%20SQL%20Relacional.md>) | Colecciones, documentos, reglas y sin JOINs |
| 02 | [Integración e Inyección de Firestore con Dagger Hilt](<02%20-%20Integracion%20e%20Inyeccion%20de%20Firestore%20con%20Dagger%20Hilt.md>) | `firebase-firestore-ktx` y `FirebaseHiltModule` |
| 03 | [Registro de Metadatos de Usuario y Corrección del Getter en Auth](<03%20-%20Registro%20de%20Metadatos%20de%20Usuario%20y%20Correccion%20del%20Getter%20en%20Auth.md>) | Getter dinámico, UID como Document ID y `.await()` |
| 04 | [Deserialización en Firestore y Constructor Vacío en DTOs](<04%20-%20Deserializacion%20en%20Firestore%20y%20Constructor%20Vacio%20en%20DTOs.md>) | `toObject()`, reflexión y constructor sin parámetros |
| 05 | [Desacoplamiento de Esquemas Heterogéneos con DTOs Polimórficos](<05%20-%20Desacoplamiento%20de%20Esquemas%20Heterogeneos%20con%20DTOs%20Polimorficos.md>) | `UserDtoGeneric` y `location` vs `país` |
| 06 | [Desnormalización de Datos, Incrustación y Trade-offs en NoSQL](<06%20-%20Desnormalizacion%20de%20Datos%20Incrustacion%20y%20Trade%20offs%20en%20NoSQL.md>) | Datos de autor incrustados e incoherencia histórica |
| 07 | [Mapeo Manual del Document ID y Consultas con Filtros](<07%20-%20Mapeo%20Manual%20del%20Document%20ID%20y%20Consultas%20con%20Filtros.md>) | `doc.id`, `.copy()` y `whereEqualTo` |
| 08 | [Borrado Recursivo en Cascada y Recarga Reactiva con LaunchedEffect](<08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>) | Recursión, `ON DELETE CASCADE` y `LaunchedEffect(Unit)` |
| 09 | [Navegación Condicional y Prop Drilling en Compose](<09%20-%20Navegacion%20Condicional%20y%20Prop%20Drilling%20en%20Compose.md>) | `showEdit`, rutas con `NavType.BoolType` y elevación |

---

## 2. Mapa de Conocimiento

```text
Ecosistema Firebase Firestore & Android
├── Fundamentos e Infraestructura
│   ├── Paradigma NoSQL vs SQL Relacional (01)
│   └── Integración e Inyección con Hilt (02)
│
├── Gestión de Usuarios y Modelado
│   ├── Registro de Metadatos y Getter Auth (03)
│   ├── Deserialización y Constructor Vacío (04)
│   └── Desacoplamiento Polimórfico DTOs (05)
│
└── Estrategias NoSQL y Capa de Presentación
    ├── Desnormalización de Datos e Incrustación (06)
    ├── Mapeo Manual de Document ID y Filtros (07)
    ├── Borrado Recursivo y Recarga con LaunchedEffect (08)
    └── Navegación Condicional y Prop Drilling (09)

```

### Explicación de la Relación entre los Conceptos

La arquitectura se fundamenta comprendiendo el **Paradigma NoSQL y Firestore** ([01](<01%20-%20Paradigma%20NoSQL%20Firestore%20vs%20SQL%20Relacional.md>)), inyectando el SDK en Android mediante **Dagger Hilt** ([02](<02%20-%20Integracion%20e%20Inyeccion%20de%20Firestore%20con%20Dagger%20Hilt.md>)).

La capa de datos conecta el **Registro de Usuarios y Auth** ([03](<03%20-%20Registro%20de%20Metadatos%20de%20Usuario%20y%20Correccion%20del%20Getter%20en%20Auth.md>)), resolviendo la conversión mediante la **Deserialización con Constructor Vacío** ([04](<04%20-%20Deserializacion%20en%20Firestore%20y%20Constructor%20Vacio%20en%20DTOs.md>)) y logrando la intercambiabilidad de backends mediante **DTOs Polimórficos** ([05](<05%20-%20Desacoplamiento%20de%20Esquemas%20Heterogeneos%20con%20DTOs%20Polimorficos.md>)).

Para optimizar las lecturas, se implementa la **Desnormalización de Datos** ([06](<06%20-%20Desnormalizacion%20de%20Datos%20Incrustacion%20y%20Trade%20offs%20en%20NoSQL.md>)), resolviendo la navegación inyectando el **Document ID** ([07](<07%20-%20Mapeo%20Manual%20del%20Document%20ID%20y%20Consultas%20con%20Filtros.md>)). La integridad referencial se sostiene mediante el **Borrado Recursivo en Cascada y LaunchedEffect** ([08](<08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>)), culminando la interfaz en la **Navegación Condicional** ([09](<09%20-%20Navegacion%20Condicional%20y%20Prop%20Drilling%20en%20Compose.md>)).

---

## 3. Lo Esencial

1. **NoSQL Orientado a Documentos:** Firestore organiza datos en Colecciones y Documentos JSON sin tablas, esquemas rígidos ni JOINs relacionales.
2. **Constructor Vacío Obligatorio:** Las clases DTO deben tener un constructor sin parámetros (`constructor() : this(...)`) para permitir la deserialización dinámica por reflexión con `.toObject()`.
3. **DTOs Polimórficos:** Abstraer los contratos en clases abstractas (`UserDtoGeneric`) permite alternar entre PostgreSQL/Express y Firestore cambiando solo el DataSource inyectado.
4. **Desnormalización de Datos:** Se incrusta la información del autor dentro del documento del tweet para garantizar lecturas rápidas en una sola consulta de red.
5. **Inyección Manual del Document ID:** La clave primaria del documento (`doc.id`) debe mapearse manualmente a la propiedad `id` del DTO usando `.copy(id = doc.id)`.
6. **Borrado Recursivo:** La falta de `CASCADE` en NoSQL obliga a implementar un algoritmo recursivo en Kotlin para eliminar un documento padre y todas sus respuestas hijas.

---

## 4. Debo Saber Hacer

- [ ] Proveer la instancia Singleton de `FirebaseFirestore` en un módulo de Dagger Hilt (`FirebaseHiltModule`). → [02](<02%20-%20Integracion%20e%20Inyeccion%20de%20Firestore%20con%20Dagger%20Hilt.md>)
- [ ] Guardar metadatos de usuario en Firestore usando el `uid` de Firebase Auth como clave primaria del documento (`.document(userId).set(...)`). → [03](<03%20-%20Registro%20de%20Metadatos%20de%20Usuario%20y%20Correccion%20del%20Getter%20en%20Auth.md>)
- [ ] Implementar constructores secundarios sin parámetros en clases DTO para evitar errores de reflexión al deserializar. → [04](<04%20-%20Deserializacion%20en%20Firestore%20y%20Constructor%20Vacio%20en%20DTOs.md>)
- [ ] Construir DTOs polimórficos (`UserDtoGeneric`) para soportar diferencias en los nombres de campos entre SQL y NoSQL. → [05](<05%20-%20Desacoplamiento%20de%20Esquemas%20Heterogeneos%20con%20DTOs%20Polimorficos.md>)
- [ ] Mapear la clave primaria de un documento de Firestore a la propiedad `id` de un DTO usando `.mapNotNull { doc -> doc.toObject(...)?.copy(id = doc.id) }`. → [07](<07%20-%20Mapeo%20Manual%20del%20Document%20ID%20y%20Consultas%20con%20Filtros.md>)
- [ ] Implementar un algoritmo de borrado recursivo para eliminar un documento y sus respuestas asociadas filtradas por `whereEqualTo`. → [08](<08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>)
- [ ] Utilizar `LaunchedEffect(Unit)` en composables para re-ejecutar la consulta de datos al regresar en la pila de navegación. → [08](<08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>)
- [ ] Configurar argumentos booleanos de ruta en Jetpack Navigation para alternar permisos visuales de edición en la UI. → [09](<09%20-%20Navegacion%20Condicional%20y%20Prop%20Drilling%20en%20Compose.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Guardar contraseñas en Firestore** | Almacenar datos de autenticación sensibles dentro de los documentos de la BD | [03](<03%20-%20Registro%20de%20Metadatos%20de%20Usuario%20y%20Correccion%20del%20Getter%20en%20Auth.md>) |
| **Omitir el constructor sin parámetros en DTOs** | Excepciones *runtime* de reflexión al ejecutar `snapshot.toObject()` | [04](<04%20-%20Deserializacion%20en%20Firestore%20y%20Constructor%20Vacio%20en%20DTOs.md>) |
| **Omitir el `.await()`** | Ejecutar operaciones asíncronas sin pausar la corrutina hasta la confirmación del servidor | [03](<03%20-%20Registro%20de%20Metadatos%20de%20Usuario%20y%20Correccion%20del%20Getter%20en%20Auth.md>) |
| **Olvidar el mapeo del Document ID** | Dejar la propiedad `id` nula en las clases DTO, rompiendo la navegación | [07](<07%20-%20Mapeo%20Manual%20del%20Document%20ID%20y%20Consultas%20con%20Filtros.md>) |
| **Dejar documentos huérfanos** | Eliminar un documento padre sin borrar recursivamente sus hijos en NoSQL | [08](<08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>) |
| **Cargar datos solo en el `init` del ViewModel** | No actualizar la lista visual al regresar mediante `popBackStack()` | [08](<08%20-%20Borrado%20Recursivo%20en%20Cascada%20y%20Recarga%20Reactiva%20con%20LaunchedEffect.md>) |
| **Buscar JOINs relacionales** | Cuellos de botella y exceso de llamadas de red en NoSQL | [01](<01%20-%20Paradigma%20NoSQL%20Firestore%20vs%20SQL%20Relacional.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / NoSQL)** Explica por qué NoSQL promueve la desnormalización de datos y qué problemas de inconsistencia histórica puede causar.
2. **(Diagnóstico / Firebase)** Si tu aplicación colapsa al intentar deserializar un objeto con `snapshot.toObject(MyDto::class.java)`, ¿cuál es la primera estructura de código que debes revisar en la `data class`?
3. **(Arquitectura / Clean Architecture)** ¿Cómo soluciona la clase abstracta `UserDtoGeneric` el conflicto entre un campo `location` proveniente de PostgreSQL y un campo `país` proveniente de Firestore?
4. **(Aplicación / Firestore)** Escribe el código necesario para recuperar una lista de documentos inyectándoles explícitamente su `doc.id` en la propiedad `id` del DTO.
5. **(Algoritmos / NoSQL)** Escribe la estructura de la función recursiva necesaria para eliminar un documento de tweet y todas sus respuestas hijas en Firestore.
6. **(UI / Compose)** ¿Por qué se debe usar `LaunchedEffect(Unit)` en lugar de confiar únicamente en el bloque `init` del ViewModel para actualizar el listado al regresar de una pantalla secundaria?