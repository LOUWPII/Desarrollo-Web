---
tags:
  - compose
  - navegacion
  - android
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Navegación Compose
  - Índice Nav Compose
---

# Índice y Mapa de Conocimiento — Navegación en Jetpack Compose

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Librerías Gradle, Single Activity Architecture y Limpieza de MainActivity](<01%20-%20Librerias%20Gradle%20Single%20Activity%20Architecture%20y%20Limpieza%20de%20MainActivity.md>) | `navigation-compose`, `TwitterApp` y `MainActivity` limpia |
| 02 | [NavHostController, NavHost y State Hoisting de Eventos](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>) | `NavHost`, callbacks y anti-patrón `Prop Drilling` |
| 03 | [Gestión de la Pila de Navegación (Back Stack) y popUpTo](<03%20-%20Gestion%20de%20la%20Pila%20de%20Navegacion%20Back%20Stack%20y%20popUpTo.md>) | LIFO, `popUpTo(0)` e `inclusive = true` |
| 04 | [Rutas Parametrizadas, Extracción de Argumentos y Manejo Seguro de Nulos](<04%20-%20Rutas%20Parametrizadas%20Extraccion%20de%20Argumentos%20y%20Manejo%20Seguro%20de%20Nulos.md>) | `NavType`, `NavBackStackEntry` y cero `!!` |
| 05 | [Tipado Seguro de Rutas con Sealed Class (Screen)](<05%20-%20Tipado%20Seguro%20de%20Rutas%20con%20Sealed%20Class%20Screen.md>) | `data object` y `createRoute()` |
| 06 | [Barra de Navegación Inferior (BottomNavigationBar) e Íconos Dinámicos](<06%20-%20Barra%20de%20Navegacion%20Inferior%20BottomNavigationBar%20e%20Iconos%20Dinamicos.md>) | `currentBackStackEntryAsState()` y `launchSingleTop` |
| 07 | [Centralización de Reglas de Visibilidad de Barras con NavigationLogic](<07%20-%20Centralizacion%20de%20Reglas%20de%20Visibilidad%20de%20Barras%20con%20NavigationLogic.md>) | `Scaffold` central y objeto `NavigationLogic` |

---

## 2. Mapa de Conocimiento

```text
Ecosistema de Navegación en Jetpack Compose
├── Infraestructura y Estructura Base
│   ├── Configuración de Gradle y Single Activity (01)
│   ├── NavHostController, NavHost y State Hoisting (02)
│   └── Gestión de la Pila de Navegación y popUpTo (03)
│
├── Definición de Rutas y Paso de Parámetros
│   ├── Rutas Parametrizadas y Manejo Seguro de Nulos (04)
│   └── Tipado Seguro de Rutas con Sealed Class (05)
│
└── Estructura Global de UI y Control de Visibilidad
    ├── Barra Inferior e Íconos Dinámicos (06)
    └── Control de Visibilidad con NavigationLogic (07)

```

### Explicación de la Relación entre los Conceptos

La navegación se inicializa mediante la **Single Activity Architecture y Gradle** ([01](<01%20-%20Librerias%20Gradle%20Single%20Activity%20Architecture%20y%20Limpieza%20de%20MainActivity.md>)), vinculando el controlador en el **NavHostController y NavHost** ([02](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>)).

El flujo de pantallas controla su historial con **Back Stack y popUpTo** ([03](<03%20-%20Gestion%20de%20la%20Pila%20de%20Navegacion%20Back%20Stack%20y%20popUpTo.md>)), permitiendo el paso de argumentos con **Rutas Parametrizadas** ([04](<04%20-%20Rutas%20Parametrizadas%20Extraccion%20de%20Argumentos%20y%20Manejo%20Seguro%20de%20Nulos.md>)) y formalizando la estructura con **Tipado Seguro en Sealed Class (`Screen`)** ([05](<05%20-%20Tipado%20Seguro%20de%20Rutas%20con%20Sealed%20Class%20Screen.md>)).

Finalmente, la estructura de la app integra la **Barra de Navegación Inferior** ([06](<06%20-%20Barra%20de%20Navegacion%20Inferior%20BottomNavigationBar%20e%20Iconos%20Dinamicos.md>)), cuyas reglas de presencia se centralizan de forma limpia mediante el objeto **NavigationLogic** ([07](<07%20-%20Centralizacion%20de%20Reglas%20de%20Visibilidad%20de%20Barras%20con%20NavigationLogic.md>)).

---

## 3. Lo Esencial

1. **Single Activity Architecture:** Reemplaza el uso de múltiples `Activities` por un único contenedor `TwitterApp` con `NavHost`.
2. **State Hoisting de Eventos:** Prohíbe pasar `NavController` a composables de UI; las pantallas solo exponen callbacks de eventos (`onClick`).
3. **Limpieza con `popUpTo`:** Vacía la pila de pantallas al completar flujos de autenticación usando `popUpTo(0) { inclusive = true }`.
4. **Manejo Seguro de Nulos:** Prohíbe el uso del operador `!!` al buscar registros por parámetros extraídos de la ruta de navegación.
5. **Tipado Seguro con `Sealed Class`:** Centraliza las rutas en la clase sellada `Screen` usando `data object` y funciones creadoras de rutas.
6. **Desacoplamiento con `NavigationLogic`:** Encapsula en un objeto Singleton la lógica que decide qué pantallas despliegan la barra superior e inferior.

---

## 4. Debo Saber Hacer

- [ ] Agregar las dependencias de `navigation-compose` y `material-icons-extended` en `build.gradle.kts`. → [01](<01%20-%20Librerias%20Gradle%20Single%20Activity%20Architecture%20y%20Limpieza%20de%20MainActivity.md>)
- [ ] Mantener `MainActivity` limpia invocando únicamente al composable contenedor raíz. → [01](<01%20-%20Librerias%20Gradle%20Single%20Activity%20Architecture%20y%20Limpieza%20de%20MainActivity.md>)
- [ ] Implementar el patrón de State Hoisting de navegación pasando callbacks de eventos desde las pantallas. → [02](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>)
- [ ] Limpiar la pila de navegación con `popUpTo` para evitar regresos no deseados a pantallas de registro o login. → [03](<03%20-%20Gestion%20de%20la%20Pila%20de%20Navegacion%20Back%20Stack%20y%20popUpTo.md>)
- [ ] Extraer argumentos de ruta usando `NavType` y la entidad `NavBackStackEntry`. → [04](<04%20-%20Rutas%20Parametrizadas%20Extraccion%20de%20Argumentos%20y%20Manejo%20Seguro%20de%20Nulos.md>)
- [ ] Crear una `Sealed Class` (`Screen`) para definir las rutas tipadas de la aplicación. → [05](<05%20-%20Tipado%20Seguro%20de%20Rutas%20con%20Sealed%20Class%20Screen.md>)
- [ ] Observar la ruta activa con `currentBackStackEntryAsState()` para cambiar íconos entre versiones `Filled` y `Outlined`. → [06](<06%20-%20Barra%20de%20Navegacion%20Inferior%20BottomNavigationBar%20e%20Iconos%20Dinamicos.md>)
- [ ] Construir el objeto `NavigationLogic` para controlar condicionalmente la presencia de barras de navegación en el `Scaffold`. → [07](<07%20-%20Centralizacion%20de%20Reglas%20de%20Visibilidad%20de%20Barras%20con%20NavigationLogic.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Acumular maquetación en `MainActivity`** | Mezcla lógica de interfaz con la clase principal de Android | [01](<01%20-%20Librerias%20Gradle%20Single%20Activity%20Architecture%20y%20Limpieza%20de%20MainActivity.md>) |
| **Prop Drilling de `NavController`** | Acopla la vista a `navigation-compose` y rompe las `@Preview` | [02](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>) |
| **Usar cadenas de texto plano (*Hardcoded Strings*)** | Errores tipográficos silenciosos que fallan en *runtime* | [05](<05%20-%20Tipado%20Seguro%20de%20Rutas%20con%20Sealed%20Class%20Screen.md>) |
| **Usar el operador `!!` en argumentos** | `NullPointerException` si la entidad no existe | [04](<04%20-%20Rutas%20Parametrizadas%20Extraccion%20de%20Argumentos%20y%20Manejo%20Seguro%20de%20Nulos.md>) |
| **Duplicar el `Scaffold` en cada pantalla** | Obliga a propagar el `NavController` a todas las pantallas | [07](<07%20-%20Centralizacion%20de%20Reglas%20de%20Visibilidad%20de%20Barras%20con%20NavigationLogic.md>) |
| **No validar la ruta activa en la barra inferior** | Instancias duplicadas de la misma pantalla en la pila | [06](<06%20-%20Barra%20de%20Navegacion%20Inferior%20BottomNavigationBar%20e%20Iconos%20Dinamicos.md>) |
| **No limpiar la pila tras autenticación** | El botón "Atrás" regresa a pantallas de login/registro | [03](<03%20-%20Gestion%20de%20la%20Pila%20de%20Navegacion%20Back%20Stack%20y%20popUpTo.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Arquitectura)** Explica por qué el patrón *Single Activity Architecture* simplifica la gestión del ciclo de vida global de la aplicación comparado con el modelo tradicional.
2. **(Diseño / State Hoisting)** ¿Por qué se considera un anti-patrón pasar el objeto `NavController` como parámetro a composables de interfaz de usuario como `HomeScreen`?
3. **(Aplicación / Back Stack)** Escribe la instrucción necesaria para navegar a la pantalla principal eliminando todas las vistas de login o registro almacenadas previamente en la pila.
4. **(Comparación / Tipado)** ¿Cuáles son las ventajas técnicas de utilizar una `Sealed Class` frente a una `Enum Class` para definir las rutas de una aplicación móvil?
5. **(Diagnóstico / Nulos)** Si extraes un ID de la ruta de navegación pero la consulta a la base de datos retorna `null`, ¿cuál es la forma limpia de manejar esta situación en el `NavHost` sin usar `!!`?
6. **(Clean Code / UI)** Explica cómo el objeto Singleton `NavigationLogic` evita duplicar la estructura de `Scaffold` en las diferentes pantallas de la aplicación.