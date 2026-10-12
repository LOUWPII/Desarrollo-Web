---
tags:
  - corrutinas
  - firebase
  - coil
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Firebase Corrutinas Coil
  - Índice Firebase y Multimedia
---

# Índice y Mapa de Conocimiento — Concurrencia, Firebase y Multimedia en Android

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Hilo Principal, Concurrencia y Fundamentos de Corrutinas en Kotlin](<01%20-%20Hilo%20Principal%20Concurrencia%20y%20Fundamentos%20de%20Corrutinas%20en%20Kotlin.md>) | `suspend`, `delay` y *UI Blocking* |
| 02 | [Corrutinas Avanzadas: launch, async/await y Manejo de Excepciones](<02%20-%20Corrutinas%20Avanzadas%20launch%20async%20await%20y%20Manejo%20de%20Excepciones.md>) | Builders, paralelismo y `coroutineScope` |
| 03 | [Ecosistema Firebase, Arquitectura Híbrida y Version Catalog](<03%20-%20Ecosistema%20Firebase%20Arquitectura%20Hibrida%20y%20Version%20Catalog.md>) | BaaS, `libs.versions.toml` y BoM |
| 04 | [Inyección de Dependencias con Dagger Hilt en Clean Architecture](<04%20-%20Inyeccion%20de%20Dependencias%20con%20Dagger%20Hilt%20en%20Clean%20Architecture.md>) | `@Module`, `@Provides` y `@Singleton` |
| 05 | [Data Sources, Repositorios y Autenticación con Firebase Auth](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>) | `.await()`, `currentUser` y Splash |
| 06 | [Carga de Imágenes Remotas con Coil (AsyncImage)](<06%20-%20Carga%20de%20Imagenes%20Remotas%20con%20Coil%20AsyncImage.md>) | `ImageRequest`, `crossfade` y `placeholder` |
| 07 | [Photo Picker (PickVisualMedia), Uri y Firebase Storage](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>) | `PickVisualMedia`, `putFile()` y `downloadUrl` |
| 08 | [Manejo Estructurado de Errores con el Patrón Result](<08%20-%20Manejo%20Estructurado%20de%20Errores%20con%20el%20Patron%20Result%20T.md>) | `Result<T>`, `onSuccess` y `onFailure` |
| 09 | [Navegación Lateral (ModalNavigationDrawer) y Componentes Reutilizables](<09%20-%20Navegacion%20Lateral%20ModalNavigationDrawer%20y%20Componentes%20Reutilizables.md>) | `DrawerState` y `rememberCoroutineScope` |

---

## 2. Mapa de Conocimiento

```text
Ecosistema de Concurrencia, Firebase y Media en Android
├── Concurrencia y Fundamentos de Red
│   ├── Hilo Principal y Corrutinas (01)
│   └── Corrutinas Avanzadas y Excepciones (02)
│
├── Infraestructura y Clean Architecture
│   ├── Ecosistema Firebase y Version Catalog (03)
│   ├── Inyección de Dependencias con Dagger Hilt (04)
│   └── Data Sources y Firebase Auth (05)
│
└── Multimedia, Errores e Interfaz
    ├── Carga de Imágenes Remotas con Coil (06)
    ├── PickVisualMedia y Firebase Storage (07)
    ├── Manejo de Errores con Result<T> (08)
    └── Navegación Lateral ModalNavigationDrawer (09)

```

### Explicación de la Relación entre los Conceptos

La aplicación gestiona su concurrencia mediante los **Fundamentos de Corrutinas** ([01](<01%20-%20Hilo%20Principal%20Concurrencia%20y%20Fundamentos%20de%20Corrutinas%20en%20Kotlin.md>)), optimizando tiempos con **`async/await`** ([02](<02%20-%20Corrutinas%20Avanzadas%20launch%20async%20await%20y%20Manejo%20de%20Excepciones.md>)).

La estructura se sostiene integrando el **Ecosistema Firebase** ([03](<03%20-%20Ecosistema%20Firebase%20Arquitectura%20Hibrida%20y%20Version%20Catalog.md>)), inyectando dependencias con **Dagger Hilt** ([04](<04%20-%20Inyeccion%20de%20Dependencias%20con%20Dagger%20Hilt%20en%20Clean%20Architecture.md>)) y estructurando la seguridad en **Data Sources y Auth** ([05](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>)).

Finalmente, la capa multimedia procesa imágenes remotas con **Coil** ([06](<06%20-%20Carga%20de%20Imagenes%20Remotas%20con%20Coil%20AsyncImage.md>)), selecciona subidas locales con **PickVisualMedia y Storage** ([07](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>)), desacopla los fallos mediante **Result** ([08](<08%20-%20Manejo%20Estructurado%20de%20Errores%20con%20el%20Patron%20Result%20T.md>)) y organiza el panel lateral con **ModalNavigationDrawer** ([09](<09%20-%20Navegacion%20Lateral%20ModalNavigationDrawer%20y%20Componentes%20Reutilizables.md>)).

> [!note] Enlace cruzado externo
> La nota [09 - Navegación Lateral (ModalNavigationDrawer)](<09%20-%20Navegacion%20Lateral%20ModalNavigationDrawer%20y%20Componentes%20Reutilizables.md>) se apoya en la nota [09 - Estructura de Pantalla, Scaffold, TopAppBar y Animaciones de Estado](<../COMPOSE/09%20-%20Estructura%20de%20Pantalla%20Scaffold%20TopAppBar%20y%20Animaciones%20de%20Estado.md>) del módulo de Jetpack Compose.

---

## 3. Lo Esencial

1. **Prevención de Bloqueo de UI:** Las corrutinas permiten ejecutar tareas asíncronas en hilos de segundo plano sin congelar el hilo principal (*Main Thread*).
2. **`launch` vs. `async`:** Utilizar `launch` para tareas sin retorno e `async/await` para consultas en paralelo cuyo resultado deba combinarse.
3. **Arquitectura Híbrida:** Usar Firebase para Autenticación y Notificaciones, pero un backend propio (SQL/REST) para reducir costos masivos de lectura/escritura.
4. **Inyección con Hilt:** Suministrar dependencias de Firebase globalmente con `@Module`, `@Provides` y `@Singleton`.
5. **Carga Eficiente de Imágenes:** Renderizar URLs remotas mediante `AsyncImage` de Coil aplicando `crossfade`, `placeholder` y `error`.
6. **Selección Segura Multimedia:** Usar `PickVisualMedia` para obtener objetos `Uri` de la galería sin solicitar permisos peligrosos de almacenamiento.
7. **Patrón `Result<T>`:** Abstraer las excepciones del SDK retornando tipos sellados de éxito o fallo hacia el ViewModel.

---

## 4. Debo Saber Hacer

- [ ] Crear funciones de suspensión con `suspend` e invocar pausas asíncronas con `delay`. → [01](<01%20-%20Hilo%20Principal%20Concurrencia%20y%20Fundamentos%20de%20Corrutinas%20en%20Kotlin.md>)
- [ ] Ejecutar llamadas en paralelo usando `async { ... }` y consolidar resultados con `.await()`. → [02](<02%20-%20Corrutinas%20Avanzadas%20launch%20async%20await%20y%20Manejo%20de%20Excepciones.md>)
- [ ] Centralizar librerías y versiones dentro del archivo `gradle/libs.versions.toml`. → [03](<03%20-%20Ecosistema%20Firebase%20Arquitectura%20Hibrida%20y%20Version%20Catalog.md>)
- [ ] Configurar un módulo de Dagger Hilt para proveer `FirebaseAuth` y `FirebaseStorage`. → [04](<04%20-%20Inyeccion%20de%20Dependencias%20con%20Dagger%20Hilt%20en%20Clean%20Architecture.md>)
- [ ] Implementar un `AuthRemoteDataSource` usando `.await()` en llamadas del SDK de Firebase. → [05](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>)
- [ ] Implementar el componente `AsyncImage` de Coil con recortado circular (`CircleShape`). → [06](<06%20-%20Carga%20de%20Imagenes%20Remotas%20con%20Coil%20AsyncImage.md>)
- [ ] Registrar el lanzador `PickVisualMedia` para obtener la `Uri` de una imagen local. → [07](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>)
- [ ] Subir archivos locales a Firebase Storage con `putFile()` y extraer su `downloadUrl`. → [07](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>)
- [ ] Implementar un `ModalNavigationDrawer` controlado asíncronamente mediante `rememberCoroutineScope`. → [09](<09%20-%20Navegacion%20Lateral%20ModalNavigationDrawer%20y%20Componentes%20Reutilizables.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Ejecutar tareas de red en el Main Thread** | Genera `NetworkOnMainThreadException` o congela la UI (ANR) | [01](<01%20-%20Hilo%20Principal%20Concurrencia%20y%20Fundamentos%20de%20Corrutinas%20en%20Kotlin.md>) |
| **Omitir `.await()` en Firebase Tasks** | La función continúa sin esperar la confirmación asíncrona de la nube | [05](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>) |
| **Omitir `google-services.json` en `app/`** | Detiene el proceso de compilación de Gradle | [03](<03%20-%20Ecosistema%20Firebase%20Arquitectura%20Hibrida%20y%20Version%20Catalog.md>) |
| **Solicitar permisos de almacenamiento obsoletos** | Usar `READ_EXTERNAL_STORAGE` en Android moderno en lugar de `PickVisualMedia` | [07](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>) |
| **Propagar excepciones de Firebase a la UI** | Acopla las pantallas visuales a clases internas del SDK | [08](<08%20-%20Manejo%20Estructurado%20de%20Errores%20con%20el%20Patron%20Result%20T.md>) |
| **Llamar a `drawerState.open()` fuera de corrutinas** | Intenta ejecutar animaciones de UI sin usar `rememberCoroutineScope` | [09](<09%20-%20Navegacion%20Lateral%20ModalNavigationDrawer%20y%20Componentes%20Reutilizables.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Concurrencia)** Explica la diferencia de comportamiento entre las funciones de suspensión y el bloqueo tradicional de hilos.
2. **(Comparación / Corrutinas)** ¿En qué escenario del desarrollo móvil es preferible usar `async` en lugar de `launch`?
3. **(Arquitectura / Firebase)** ¿Cuáles son los riesgos financieros de construir una aplicación de alto tráfico basando el 100% de la persistencia de datos en Firestore?
4. **(Aplicación / Hilt)** Escribe el código de un módulo de Dagger Hilt que entregue una instancia Singleton de `FirebaseStorage`.
5. **(Diagnóstico / Firebase Auth)** Si la función de autenticación finaliza al instante pero el usuario no queda registrado, ¿qué extensión de corrutina olvidaste agregar a la llamada del SDK?
6. **(Diseño / Multimedia)** Explica cómo la combinación de `PickVisualMedia`, Firebase Storage y Coil permite seleccionar, subir y visualizar una foto de perfil en Android.