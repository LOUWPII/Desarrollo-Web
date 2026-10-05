---
tags:
  - rxjs
  - casos-de-uso
  - web
aliases:
  - Casos de Uso de RxJS
clase: Casos de Uso Principales de RxJS en Angular y la Web
timestamp: 3:30 - 18:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Casos de Uso de RxJS en el Desarrollo Web

## Definición

Los **casos de uso de RxJS** abarcan todos los escenarios en el desarrollo frontend y backend donde la entrada de datos es asíncrona, continua, interactiva o potencialmente desordenada. Permite orquestar y controlar flujos de información complejos que las herramientas nativas de JavaScript (`Promises` o `addEventListener`) gestionan con dificultad.

## Casos de Uso Principales

| Caso de Uso | Problema Tradicional | Solución con RxJS |
| --- | --- | --- |
| **Peticiones HTTP** | Una Promesa no se puede cancelar una vez emitida. | Los Observables son cancelables en cualquier momento (*lazy*). |
| **Eventos de UI / DOM** | `addEventListener` procesa dos clics accidentales seguidos. | Se pueden filtrar o pausar emisiones dobles (evita cobros duplicados). |
| **Autocompletado / Búsqueda** | Teclear "hola" lanza 4 peticiones HTTP individuales a la API. | Con `debounceTime` se espera a que el usuario termine de escribir. |
| **Formularios Reactivos** | La validación requiere eventos manuales paso a paso. | Se escucha el flujo continuo de cambios campo a campo en tiempo real. |
| **Comunicación no Emparentada** | Transmitir datos entre componentes hermanos requiere pasar props por múltiples niveles. | Se utiliza un servicio compartido con un flujo de datos reactivo central. |

---

## Ejemplos Prácticos

### 1. Botón de Compra Seguro

En una pasarela de pago, si un usuario hace doble clic por error sobre el botón "Pagar", `addEventListener` ejecutará la función dos veces. Con RxJS, el flujo se puede filtrar o aplanar para ignorar la segunda emisión si la primera está en proceso.

### 2. Autocompletado Tipo Google

Cuando el usuario escribe en una barra de búsqueda, no se debe saturar el backend enviando la petición por cada letra. RxJS permite introducir un tiempo de espera (ej. 500 ms de inactividad) para realizar una única petición con el texto completo.

---

## Errores Comunes

- **Abusar de `addEventListener` nativo para flujos complejos:** Causa ejecuciones múltiples no deseadas, funciones anidadas inaccesibles y dificultades para limpiar los escuchadores.

## Buenas Prácticas

- Usar RxJS cuando se requiera cancelar operaciones en vuelo, combinar múltiples fuentes de datos o pausar eventos por tiempo.

## Relación con otros conceptos

- Aplica los conceptos de: [01 - Programacion Reactiva y Patron Observer](<01%20-%20Programacion%20Reactiva%20y%20Patron%20Observer.md>)
- Implementa soluciones técnicas en: [07 - Buscador Optimizado Tipo Google con RxJS](<07%20-%20Buscador%20Optimizado%20Tipo%20Google%20con%20RxJS.md>) y [11 - Condiciones de Carrera y Cancelacion Reactiva](<11%20-%20Condiciones%20de%20Carrera%20y%20Cancelacion%20Reactiva.md>)

## Preguntas de repaso

1. **Aplicación:** Describe cómo evitarías que un formulario envíe dos solicitudes de registro si el usuario hace clic repetidamente en el botón de envío.
2. **Comparación:** ¿Por qué un Observable de RxJS es más adecuado para gestionar una conexión por WebSockets que una `Promise` nativa de JavaScript?

## Fuente

- **Clase:** Casos de Uso Principales de RxJS en Angular y la Web
- **Timestamp:** 3:30 - 18:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
