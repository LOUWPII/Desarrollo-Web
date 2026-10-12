---
tags:
  - compose
  - navegacion
  - navhost
  - state-hoisting
aliases:
  - NavHostController
  - NavHost
  - State Hoisting de Navegación
clase: Configuración del NavHostController, Rutas y Elevar Eventos (State Hoisting de Navegación)
timestamp: ~08:00 - 18:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# NavHostController, NavHost y State Hoisting de Eventos

## Definición

El **`NavHostController`** es el objeto central del motor de navegación encargado de gestionar la pila de pantallas y rastrear la ruta activa. El **`NavHost`** es el contenedor visual que asocia este controlador con un grafo de rutas. El **State Hoisting de Navegación** es el principio que prohíbe pasar el `NavController` como parámetro a los composables de la interfaz de usuario.

## Anti-patrón: *Prop Drilling* de `NavController`

❌ **Mala Práctica:** Pasar la instancia de `navController` hacia composables visuales (`StartScreen`, `HomeScreen`).

```kotlin
// ❌ INCORRECTO: Acupla la vista a la librería de navegación
@Composable
fun StartScreen(navController: NavHostController) {
    Button(onClick = { navController.navigate("register") }) {
        Text("Registrarse")
    }
}

```

**Desventajas:**

* Acopla la interfaz visual a una librería de infraestructura específica (`navigation-compose`).
* Impide la generación de previsualizaciones (`@Preview`) en tiempo de diseño.
* Complica las pruebas unitarias y destruye la reusabilidad del componente visual.

---

## Práctica Correcta: Elevación de Eventos mediante Lambdas

✅ **Buena Práctica:** Los composables visuales solo exponen parámetros de tipo función lambda (`onClick: () -> Unit`). Las llamadas a `navController.navigate()` se centralizan exclusivamente en la tabla de navegación (`AppNavigation.kt`).

```text
  AppNavigation (Conoce el NavController)
     │
     ├──> StartScreen(onRegisterButtonClick = { navController.navigate("register") })
     │      └──> Solo notifica que el botón fue presionado

```

```kotlin
// ✅ CORRECTO: Composable desacoplado y reutilizable
@Composable
fun StartScreen(
    onLoginButtonClick: () -> Unit,
    onRegisterButtonClick: () -> Unit
) {
    Button(onClick = onRegisterButtonClick) {
        Text("Registrarse")
    }
}

```

---

## Centralización del Grafo (`AppNavigation.kt`)

```kotlin
@Composable
fun AppNavigation(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    NavHost(
        navController = navController,
        startDestination = "start",
        modifier = modifier
    ) {
        composable("start") {
            StartScreen(
                onLoginButtonClick = { navController.navigate("login") },
                onRegisterButtonClick = { navController.navigate("register") }
            )
        }
        composable("register") {
            RegisterScreen(
                onRegisterSuccess = { navController.navigate("home") }
            )
        }
    }
}

```

---

## Errores Comunes

* ⚠️ **Pasar el `NavController` a vistas secundarias:** Impide reutilizar la pantalla o previsualizarla sin instanciar un motor de navegación completo.

## Buenas Prácticas

* Usar `rememberNavController()` en el composable contenedor raíz para preservar la instancia del controlador a través de las recomposiciones.

## Relación con otros conceptos

* Se configura dentro del contenedor creado en: [01 - Librerias Gradle Single Activity Architecture y Limpieza de MainActivity](<01%20-%20Librerias%20Gradle%20Single%20Activity%20Architecture%20y%20Limpieza%20de%20MainActivity.md>)
* Gestiona la pila procesada en: [03 - Gestion de la Pila de Navegacion Back Stack y popUpTo](<03%20-%20Gestion%20de%20la%20Pila%20de%20Navegacion%20Back%20Stack%20y%20popUpTo.md>)
* Evoluciona hacia tipado seguro con: [05 - Tipado Seguro de Rutas con Sealed Class Screen](<05%20-%20Tipado%20Seguro%20de%20Rutas%20con%20Sealed%20Class%20Screen.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué pasar la instancia de `NavController` directamente a un composables de pantalla se considera un anti-patrón de arquitectura.
2. **Aplicación:** Escribe la firma de un composables de pantalla de registro aplicando el patrón de State Hoisting de navegación.

## Fuente

* **Clase:** Configuración del NavHostController, Rutas y Elevar Eventos (State Hoisting de Navegación)
* **Timestamp:** ~08:00 - 18:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
