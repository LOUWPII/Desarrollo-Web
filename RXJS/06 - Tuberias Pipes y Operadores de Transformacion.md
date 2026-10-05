---
tags:
  - rxjs
  - pipes
  - transformacion
aliases:
  - Tuberías (Pipes)
  - Operadores de Transformación
clase: Tuberías (Pipes) y Operadores de Transformación
timestamp: 34:00 - 41:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Tuberías (Pipes) y Operadores de Transformación

## Definición

Una **Tubería** (`.pipe()`) es un método de los Observables en RxJS que permite encadenar y ejecutar operadores de transformación, filtrado y modificación sobre el flujo de datos **antes** de que los valores lleguen al suscriptor final.

## Funcionamiento del Flujo en Tubería

```text
Entrada: [1.5, 2, -3, 2, 2, 5]
           │
           ▼
 ┌──────────────────┐
 │ filter(val > 0)  │  ➔ Elimina el -3
 └─────────┬────────┘
           ▼
 ┌──────────────────┐
 │distinctUntil...()│  ➔ Elimina el segundo y tercer '2' consecutivos
 └─────────┬────────┘
           ▼
 ┌──────────────────┐
 │ map(val + 273)   │  ➔ Convierte cada valor a Kelvin
 └─────────┬────────┘
           ▼
Salida al Suscriptor: 274.65, 275.15, 278.15
```

---

## Principales Operadores de Transformación

- `map(fn)`: Transforma cada valor emitido aplicando la función proporcionada.
- `filter(condicion)`: Permite el paso únicamente de los valores que evalúan como verdaderos (`true`).
- `distinctUntilChanged()`: Descarta emisiones consecutivas que sean exactamente iguales a la emisión inmediatamente anterior.

---

## Implementación en Código (Código del Profesor)

```javascript
// 03.pipes.js
const { from } = require('rxjs');
const { map, filter, distinctUntilChanged } = require('rxjs/operators');

// Flujo de temperaturas enviadas por un sensor
const temperaturaSensor$ = from([1.5, 2, -3, 2, 2, 2, 5]);

temperaturaSensor$
  .pipe(
    // 1. Filtrar solo temperaturas positivas
    filter((val) => val > 0),
    // 2. Omitir lecturas repetidas de forma consecutiva
    distinctUntilChanged(),
    // 3. Transformar de grados Celsius a Kelvin
    map((val) => val + 273.15)
  )
  .subscribe((kelvin) => console.log('Temperatura procesada (Kelvin):', kelvin));
```

---

## Ventajas de Rendimiento

A diferencia de los métodos de arreglos de JavaScript nativo (`.filter().map()`), que crean arreglos intermedios completos en memoria por cada paso, la tubería de RxJS procesa cada elemento **"al vuelo" de forma individual** a medida que es emitido, optimizando el uso de memoria RAM y el procesamiento.

---

## Errores Comunes

- **Error de importación:** Intentar importar los operadores directamente desde `'rxjs'` en lugar de `'rxjs/operators'` (en versiones de RxJS 6) o no verificar la compatibilidad de rutas de importación.
- **Alterar el orden de los operadores:** Colocar un `map()` antes de un `filter()` procesará y transformará datos que luego van a ser descartados, desperdiciando procesamiento.

## Buenas Prácticas

- Colocar los operadores de filtrado (como `filter` o `distinctUntilChanged`) al inicio de la tubería para descartar datos innecesarios lo antes posible.

## Relación con otros conceptos

- Se conecta a: [04 - Anatomia del Observable y Suscriptor](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>)
- Es la base de: [07 - Buscador Optimizado Tipo Google con RxJS](<07%20-%20Buscador%20Optimizado%20Tipo%20Google%20con%20RxJS.md>)
- Se combina con operadores avanzados en: [09 - Operadores XMap y Antipatron de Suscripciones Anidadas](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué es más eficiente procesar datos mediante `.pipe()` en RxJS que encadenar `.filter()` y `.map()` de los arreglos nativos de JavaScript?
2. **Aplicación:** Dado un flujo de números `from([1, 1, 2, 2, 1])`, ¿cuáles son los valores emitidos si aplican el operador `distinctUntilChanged()`?
3. **Diagnóstico:** Si colocas un `map()` costoso antes de un `filter()`, ¿qué problema de rendimiento estás introduciendo?

## Fuente

- **Clase:** Tuberías (Pipes) y Operadores de Transformación
- **Timestamp:** 34:00 - 41:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
