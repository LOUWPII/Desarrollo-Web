---
tags:
  - rxjs
  - operadores
  - switchMap
  - concurrencia
aliases:
  - Operadores XMap
  - switchMap
  - Antipatrón de Suscripciones Anidadas
clase: Operadores de Aplanamiento y Manejo de Concurrencia
timestamp: 55:00 - 01:21:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Operadores XMap y Antipatrón de Suscripciones Anidadas

## Definición

Los **Operadores XMap** (u *Operadores de Aplanamiento*) son operadores de transformación avanzada que toman una emisión de un Observable de origen y la mapean hacia un **nuevo Observable**, administrando internamente la suscripción para evitar el antipatrón de **Suscripciones Anidadas** (*Callback Hell* reactivo).

## El Antipatrón de Suscripciones Anidadas

Hacer un `.subscribe()` dentro de otro `.subscribe()` es una mala práctica grave en RxJS.

```javascript
// ❌ MALA PRÁCTICA: Suscripciones Anidadas (Antipatrón)
fromEvent(botonBuscar, 'click').subscribe(() => {
  userService.getUser('Pedro').subscribe((usuario) => {
    postService.getPosts(usuario.id).subscribe((posts) => {
      console.log(posts); // Difícil de mantener, propenso a fugas de memoria y race conditions
    });
  });
});
```

---

## Tipos de Operadores XMap

```text
                      ┌─────────────────────────────────────────┐
                      │    Emisión de un Nuevo Observable       │
                      └────────────────────┬────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
┌─────────────────┐               ┌─────────────────┐               ┌─────────────────┐
│   concatMap     │               │    mergeMap     │               │    switchMap    │
│(Cola Secuencial)│               │  (Concurrente)  │               │  (Cancelación)  │
└─────────────────┘               └─────────────────┘               └─────────────────┘
```

1. **`concatMap`:** Encola cada nuevo Observable generado y los procesa secuencialmente uno a uno conforme se completan.
2. **`mergeMap`:** Procesa todos los nuevos Observables en paralelo simultáneamente sin cancelar ninguno.
3. **`switchMap`:** **Cancela inmediatamente la suscripción del Observable anterior** si llega una nueva emisión del Observable origen. Es el operador predilecto para búsquedas y eventos de UI.
4. **`exhaustMap`:** Ignora todas las nuevas emisiones del origen hasta que el Observable actual se haya completado por completo (ideal para evitar doble clic en botones de pago).

---

## Solución Limpia con `switchMap` (Código del Profesor)

```javascript
// 05_xmap.js / script.js
const { fromEvent } = rxjs;
const { switchMap } = rxjs.operators;

// ✅ BUENA PRÁCTICA: Flujo aplanado limpio con una sola suscripción final
fromEvent(botonBuscar, 'click')
  .pipe(
    // Cancela búsquedas previas si el usuario vuelve a hacer clic
    switchMap(() => userService.getUser('Pedro')),
    switchMap((usuario) => postService.getPosts(usuario.id))
  )
  .subscribe({
    next: (posts) => console.log('Publicaciones obtenidas de forma segura:', posts),
    error: (err) => console.error('Error en el flujo:', err)
  });
```

---

## Errores Comunes

- **Usar `map` en lugar de `switchMap` para retornar Observables:** Usar `map(() => http.get(...))` retornará un Observable anidado (`Observable<Observable<T>>`) en lugar del dato final.
- **Usar `mergeMap` para operaciones que requieren la última versión:** Puede provocar que respuestas antiguas lentas sobrescriban datos más recientes en la pantalla.

## Buenas Prácticas

- Usar `switchMap` por defecto cuando se realicen peticiones HTTP desencadenadas por eventos de usuario o formularios.
- Mantener siempre **una única llamada a `.subscribe()`** al final de la cadena reactiva.

## Relación con otros conceptos

- Corrige el mal uso de: [04 - Anatomia del Observable y Suscriptor](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>)
- Soluciona problemas de concurrencia en: [11 - Condiciones de Carrera y Cancelacion Reactiva](<11%20-%20Condiciones%20de%20Carrera%20y%20Cancelacion%20Reactiva.md>)
- Se aplica en servicios de Angular con: [10 - Consumo de API REST con HttpClient en Angular 19](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué hacer `.subscribe()` dentro de otro `.subscribe()` se considera un antipatrón en RxJS?
2. **Comparación:** Explica la diferencia entre cómo procesa una nueva emisión el operador `switchMap` frente a `mergeMap`.
3. **Diagnóstico:** Si un usuario hace clic 3 veces seguidas en un botón para cargar datos usando `switchMap`, ¿cuántas respuestas HTTP se procesarán en el suscriptor final?

## Fuente

- **Clase:** Operadores de Aplanamiento y Manejo de Concurrencia
- **Timestamp:** 55:00 - 01:21:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
