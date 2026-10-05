---
tags:
  - rxjs
  - operadores
  - combinacion
aliases:
  - Operadores de Combinación
  - concat
  - merge
clase: Operadores de Combinación de Observables
timestamp: 52:00 - 55:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Operadores de Combinación Concat y Merge

## Definición

Los **Operadores de Combinación** son funciones de RxJS que permiten suscribirse a múltiples Observables simultáneamente y consolidar sus transmisiones dentro de un único flujo de datos de salida.

## Comparativa: `concat` vs `merge`

| Operador | Tipo de Ejecución | Orden de Procesamiento | Caso de Uso Recomendado |
| --- | --- | --- | --- |
| **`concat`** | Secuencial | Espera a que el primer Observable **complete** para iniciar el segundo. | Peticiones dependientes donde el orden estricto es obligatorio. |
| **`merge`** | Paralela | Ejecuta todos los Observables simultáneamente y emite según lleguen. | Peticiones independientes que deben resolverse en el menor tiempo total. |

---

## Implementación Técnica (Código del Profesor)

```javascript
// 04_concat_merge.js
const { of, concat, merge } = require('rxjs');
const { delay } = require('rxjs/operators');

// Simulación de peticiones con retardo de red (2 segundos cada una)
const buscarUsuarios$ = of('Usuario 1', 'Usuario 2').pipe(delay(2000));
const buscarProductos$ = of('Producto A', 'Producto B').pipe(delay(2000));

// 1. Concat: Ejecución secuencial (Tiempo total: ~4 segundos)
console.time('Tiempo Concat');
concat(buscarUsuarios$, buscarProductos$).subscribe({
  next: (val) => console.log('Concat:', val),
  complete: () => console.timeEnd('Tiempo Concat')
});

// 2. Merge: Ejecución en paralelo (Tiempo total: ~2 segundos)
console.time('Tiempo Merge');
merge(buscarUsuarios$, buscarProductos$).subscribe({
  next: (val) => console.log('Merge:', val),
  complete: () => console.timeEnd('Tiempo Merge')
});
```

---

## Errores Comunes

- **Usar `concat` con Observables infinitos:** Si el primer Observable de un `concat` nunca ejecuta `.complete()` (como un `interval()`), el segundo Observable nunca llegará a ejecutarse.
- **Usar `merge` para datos dependientes:** Si la segunda petición requiere el ID generado por la primera, `merge` fallará porque ambas se inician al mismo tiempo.

## Buenas Prácticas

- Usar `merge` para cargar paneles independientes en un panel de control para optimizar la velocidad de carga.
- Asegurarse de que los Observables pasados a `concat` sean finitos y ejecuten `complete()`.

## Relación con otros conceptos

- Trabaja con flujos creados por: [05 - Operadores de Creacion de Observables](<05%20-%20Operadores%20de%20Creacion%20de%20Observables.md>)
- Introduce los conceptos para: [09 - Operadores XMap y Antipatron de Suscripciones Anidadas](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>)

## Preguntas de repaso

1. **Comparación:** Si tienes dos peticiones HTTP que tardan 3 segundos cada una, ¿cuánto tiempo total tardará en completarse un `concat` versus un `merge`?
2. **Diagnóstico:** Intentas usar `concat` combinando un `interval(1000)` y un `of('Hola')`. ¿Por qué nunca se imprime el valor `'Hola'`?

## Fuente

- **Clase:** Operadores de Combinación de Observables
- **Timestamp:** 52:00 - 55:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
