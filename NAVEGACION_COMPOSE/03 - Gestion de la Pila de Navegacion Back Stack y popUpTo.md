---
tags:
  - compose
  - navegacion
  - back-stack
  - popupto
aliases:
  - Back Stack
  - Pila de Navegación
  - popUpTo
clase: Pila de Navegación (Back Stack) y Limpieza con popUpTo
timestamp: ~18:00 - 22:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Gestión de la Pila de Navegación (Back Stack) y `popUpTo`

## Definición

La **Pila de Navegación** (*Back Stack*) es una estructura de datos LIFO (*Last In, First Out*) donde Android almacena cada pantalla visitada. El método **`popUpTo`** permite remover un conjunto de pantallas de la pila al realizar una transición para evitar que el usuario pueda regresar a flujos finalizados (como autenticación o registro) al presionar el botón "Atrás".

## El Problema del Botón "Atrás" en Flujos de Autenticación

```text
  Navegación sin Limpieza:
  [ StartScreen ] ──► [ RegisterScreen ] ──► [ HomeScreen ]
                                                  │
                                   Presionar "Atrás"
                                                  ▼
                                         [ RegisterScreen ] ❌ (Error de UX)

```

Si el usuario completa el registro e ingresa a la pantalla principal (`HomeScreen`), presionar el botón físico o de gesto "Atrás" no debe devolverlo al formulario de registro. La pila debe limpiarse para que `HomeScreen` se convierta en la raíz de la aplicación.

---

## Uso de `popUpTo` e `inclusive = true`

Para destruir la pila previa durante una navegación:

```kotlin
// Transición a Home destruyendo todo el historial anterior
navController.navigate("home") {
    popUpTo(0) { // Apunta a la raíz de la pila
        inclusive = true // Remueve incluso el destino especificado
    }
}

```

```text
  Navegación con popUpTo(0) { inclusive = true }:
  [ StartScreen ] ──► [ RegisterScreen ] ──► (Se vacía la pila) ──► [ HomeScreen ]
                                                                        │
                                                         Presionar "Atrás"
                                                                        ▼
                                                             Sale de la App ✅

```

---

## Errores Comunes

* ⚠️ **Acumular instancias infinitas en la pila:** Navegar repetidamente entre pantallas sin limpiar el historial consume memoria RAM de forma innecesaria y genera un comportamiento errático de navegación.

## Buenas Prácticas

* Aplicar siempre la limpieza de pila (`popUpTo`) al finalizar flujos de sesión, registro o cierre de sesión (*logout*).

## Relación con otros conceptos

* Modifica el comportamiento de navegación expuesto en: [02 - NavHostController NavHost y State Hoisting de Eventos](<02%20-%20NavHostController%20NavHost%20y%20State%20Hoisting%20de%20Eventos.md>)
* Se integra en la barra inferior en: [06 - Barra de Navegacion Inferior BottomNavigationBar e Iconos Dinamicos](<06%20-%20Barra%20de%20Navegacion%20Inferior%20BottomNavigationBar%20e%20Iconos%20Dinamicos.md>)

## Preguntas de repaso

1. **Comprensión:** ¿En qué consiste el parámetro `inclusive = true` dentro del bloque de configuración de `popUpTo`?
2. **Aplicación:** Escribe el bloque de código necesario para navegar a la pantalla "home" eliminando todo el historial de navegación previo.

## Fuente

* **Clase:** Pila de Navegación (Back Stack) y Limpieza con popUpTo
* **Timestamp:** ~18:00 - 22:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
