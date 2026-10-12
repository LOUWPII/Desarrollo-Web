---
tags:
  - mvvm
  - arquitectura
  - udf
  - compose
aliases:
  - MVVM
  - Flujo Unidireccional de Datos
  - UDF
clase: Fundamentos de la Arquitectura MVVM (Model-View-ViewModel) y Separación de Responsabilidades
timestamp: ~02:00 - 05:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Arquitectura MVVM y Flujo Unidireccional de Datos en Compose

## Definición

**MVVM (Model-View-ViewModel)** es un patrón de arquitectura de presentación que separa la interfaz gráfica (**View**), la lógica de negocio y gestión de estado (**ViewModel**) y las estructuras de datos o fuentes de persistencia (**Model**), estableciendo un **Flujo Unidireccional de Datos** (*Unidirectional Data Flow - UDF*).

## Componentes del Patrón MVVM

```text
       ┌────────────────────────────────────────────────────────┐
       │                   VISTA (View)                         │
       │ - Renderiza componentes Compose (TextField, Button).   │
       │ - Captura eventos del usuario (onClick, onValueChange).│
       └──────────────┬──────────────────────────▲──────────────┘
                      │                          │
        1. Emite      │                          │ 4. Recomposición
           Eventos    │                          │    por Estado
                      ▼                          │
       ┌─────────────────────────────────────────┴──────────────┐
       │                  VIEWMODEL                             │
       │ - Mantiene y encapsula el estado reactivo.             │
       │ - Procesa reglas de negocio y validaciones.            │
       └──────────────┬──────────────────────────▲──────────────┘
                      │                          │
        2. Modifica   │                          │ 3. Notifica
           Datos      │                          │    Cambios
                      ▼                          │
       ┌─────────────────────────────────────────┴──────────────┐
       │                   MODELO (Model)                       │
       │ - Entidades de datos (Data Classes, DTOs).             │
       │ - Repositorios o Fuentes de Datos.                     │
       └────────────────────────────────────────────────────────┘

```

---

## Diagnóstico de Código no Estructurado (Antipatrón)

Colocar validaciones (ej. `if (password.length < 6)`), estados locales (`remember { mutableStateOf("") }`) y componentes visuales en la misma función Composable viola la separación de responsabilidades, impidiendo la reutilización y la automatización de pruebas unitarias.

---

## Errores Comunes

* ⚠️ **Lógica de negocio en Composables:** Escribir condicionales de validación dentro del código de maquetación de la UI.

## Buenas Prácticas

* Asegurar que la Vista solo notifique eventos al ViewModel y renderice el estado emitido por este, sin tomar decisiones de lógica de negocio.

## Relación con otros conceptos

* Define el rol de la clase implementada en: [03 - Estructuracion de Proyecto por Features y Clase ViewModel](<03%20-%20Estructuracion%20de%20Proyecto%20por%20Features%20y%20Clase%20ViewModel.md>)
* Orienta la delegación de eventos detallada en: [07 - Traslado de Reglas de Negocio Validaciones de Eventos al ViewModel](<07%20-%20Traslado%20de%20Reglas%20de%20Negocio%20Validaciones%20de%20Eventos%20al%20ViewModel.md>)

## Preguntas de repaso

1. **Comprensión:** Describe el ciclo completo del Flujo Unidireccional de Datos desde que el usuario interactúa con la pantalla hasta que esta se recompone.
2. **Diagnóstico:** ¿Qué regla de Clean Architecture se viola si se evalúa la validez de un correo electrónico directamente dentro del evento `onClick` de un botón en un Composable?

## Fuente

* **Clase:** Fundamentos de la Arquitectura MVVM (Model-View-ViewModel) y Separación de Responsabilidades
* **Timestamp:** ~02:00 - 05:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
