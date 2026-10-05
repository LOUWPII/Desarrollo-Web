---
tags:
  - rxjs
  - operadores
  - creacion
aliases:
  - Operadores de Creación
  - of
  - from
  - interval
clase: Operadores de Creación de Observables
timestamp: 30:00 - 34:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Operadores de Creación de Observables

## Definición

Los **Operadores de Creación** son funciones integradas de RxJS que permiten instanciar y generar Observables directamente a partir de tipos de datos comunes (valores individuales, arreglos, rangos, temporizadores) sin necesidad de escribir la sintaxis manual de `new Observable()`.

## Principales Operadores de Creación

| Operador | Descripción de Emisión | Ejemplo de Uso |
| --- | --- | --- |
| `of(...)` | Emite los argumentos entregados separados por comas, uno tras otro, y se completa. | `of(1, 2, 3, 4)` |
| `from(...)` | Toma una estructura iterable (como un arreglo) y emite cada elemento por separado. | `from([1, 2, 3, 4])` |
| `range(inicio, cantidad)` | Emite una secuencia numérica finita comenzando en `inicio` con la `cantidad` dada. | `range(1, 5)` (emite 1,2,3,4,5) |
| `interval(ms)` | Emite una secuencia numérica incremental (0, 1, 2...) periódica cada `ms` milisegundos. | `interval(1000)` (infinito) |

---

## Implementación en Código (Código del Profesor)

```javascript
// 02.observables.js
const { of, from, range, interval } = require('rxjs');

// 1. Operador of: Emisión individual por coma
const numerosOf$ = of(1, 2, 3, 4, 5);
numerosOf$.subscribe((val) => console.log('of:', val));

// 2. Operador from: Descomposición de arreglos
const numerosFrom$ = from([10, 20, 30]);
numerosFrom$.subscribe((val) => console.log('from:', val));

// 3. Operador range: Secuencia finita (Inicio: 1, Cantidad: 5)
const numerosRange$ = range(1, 5);
numerosRange$.subscribe((val) => console.log('range:', val));

// 4. Operador interval: Emisión continua e infinita basada en tiempo
const numerosInterval$ = interval(1000);
// const sub = numerosInterval$.subscribe((val) => console.log('interval:', val));
```

---

## Aplicación en Pruebas (*Testing*)

En aplicaciones reales de Angular, los datos suelen ser generados por servicios como `HttpClient`. Sin embargo, los operadores de creación como `of()` y `from()` son fundamentales durante la fase de **Testing Unitario** para simular respuestas *mock* de servidores o bases de datos sin realizar conexiones de red reales.

---

## Errores Comunes

- **Confundir `of([1,2,3])` con `from([1,2,3])`:** `of` emitirá el arreglo completo como **un único objeto** de emisión; `from` emitirá los **tres elementos de forma individual**.
- **Dejar un `interval()` ejecutándose indefinidamente:** Si no se desubscribe, causará fugas de memoria (*memory leaks*).

## Buenas Prácticas

- Usar `of()` para retornar datos simulados síncronos en pruebas unitarias.
- Usar `from()` para convertir colecciones nativas de JavaScript o Promesas en flujos reactivos.

## Relación con otros conceptos

- Simplifican la creación de: [04 - Anatomia del Observable y Suscriptor](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>)
- Se procesan a través de: [06 - Tuberias Pipes y Operadores de Transformacion](<06%20-%20Tuberias%20Pipes%20y%20Operadores%20de%20Transformacion.md>)

## Preguntas de repaso

1. **Comparación:** ¿Cuál es la diferencia exacta de emisión entre ejecutar `of([1, 2, 3])` y `from([1, 2, 3])`?
2. **Aplicación:** ¿En qué escenario del desarrollo de software es útil el operador `of()`?
3. **Diagnóstico:** Si ejecutas `range(5, 3)`, ¿cuáles son los números exactos que se emitirán en el flujo?

## Fuente

- **Clase:** Operadores de Creación de Observables
- **Timestamp:** 30:00 - 34:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
