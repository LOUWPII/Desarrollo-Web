---
tags:
  - rxjs
  - observable
  - suscriptor
aliases:
  - Observable
  - Suscriptor
  - Observer
clase: Anatomía del Patrón Observable: Subject y Subscriptor
timestamp: 21:00 - 30:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Anatomía del Observable y Suscriptor

## Definición

Un **Observable** es la entidad emisora dentro de RxJS que encapsula un flujo de datos asíncrono o síncrono. Un **Suscriptor** (o *Observer*) es el objeto receptor que define los tres métodos fundamentales para reaccionar ante los datos emitidos (`next`), los errores ocurridos (`error`) y la finalización del flujo (`complete`).

## Estructura Técnica

```text
                       ┌───────────────────────────────────┐
                       │     new Observable(subscriber)    │
                       └─────────────────┬─────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        │ subscriber.next(val)           │ subscriber.error(err)          │ subscriber.complete()
        ▼                                ▼                                ▼
┌──────────────┐                 ┌──────────────┐                 ┌──────────────┐
│  Método next │                 │ Método error │                 │Método complete│
│ (Procesa dato)│                 │ (Maneja fallo)│                 │(Cierra flujo)│
└──────────────┘                 └──────────────┘                 └──────────────┘
```

---

## Convención de Nomenclatura

Todas las variables que almacenen un Observable deben incluir el **sufijo de signo de pesos (`$`)** al final de su nombre (ejemplo: `tienda$`, `usuario$`).

---

## Implementación en Código (Código del Profesor)

```javascript
// Importación desde Node.js (01.index.js)
const { Observable } = require('rxjs');

// 1. Creación del Observable (Sujeto Emisor)
const tienda$ = new Observable((subscriber) => {
  console.log('Un cliente está observando la tienda...');
  subscriber.next('Televisor');
  subscriber.next('Celular');
  subscriber.next('Laptop');

  // Finaliza definitivamente el flujo de datos
  subscriber.complete();
});

// 2. Estructura Completa del Suscriptor (Observer)
const suscriptor1 = {
  next: (value) => console.log(`Reacción 1: Voy a comprar un ${value}`),
  error: (err) => console.error(`Error detectado: ${err}`),
  complete: () => console.log('Suscripción finalizada correctamente')
};

// 3. Activación de la Suscripción
tienda$.subscribe(suscriptor1);

// Sintaxis Reducida: Paso de callback directo (asume implícitamente el método 'next')
tienda$.subscribe((value) => console.log(`Reacción 2 implícita: ${value}`));
```

---

## Reglas del Flujo

1. **Invocación perezosa (*Lazy*):** Si no se ejecuta el método `.subscribe()`, el código interno de la función constructora del Observable **nunca se ejecutará**.
2. **Múltiples Suscripciones:** Un mismo Observable puede tener múltiples suscriptores independientes. Cada suscripción desencadena la ejecución de su propio flujo.
3. **Cierre de Transmisión:** Después de que un Observable ejecuta `subscriber.complete()` o `subscriber.error()`, no emitirá ningún dato adicional mediante `subscriber.next()`.

---

## Errores Comunes

- **Crear un Observable y no suscribirse:** Pensar que el código se está ejecutando en segundo plano cuando no existe ningún `.subscribe()` activo.
- **Intentar emitir datos después de un `complete()`:** Esos valores serán ignorados silenciosamente por RxJS.

## Buenas Prácticas

- Usar la convención del sufijo `$` para distinguir variables reactivas de variables estáticas.
- Manejar siempre el callback `error` en entornos donde la red o los datos puedan fallar.

## Relación con otros conceptos

- Implementa: [01 - Programacion Reactiva y Patron Observer](<01%20-%20Programacion%20Reactiva%20y%20Patron%20Observer.md>)
- Es alimentado por: [05 - Operadores de Creacion de Observables](<05%20-%20Operadores%20de%20Creacion%20de%20Observables.md>)
- Se procesa mediante: [06 - Tuberias Pipes y Operadores de Transformacion](<06%20-%20Tuberias%20Pipes%20y%20Operadores%20de%20Transformacion.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué el código dentro de `new Observable(...)` no se ejecuta hasta que se llama al método `.subscribe()`?
2. **Diagnóstico:** Si ejecutas `subscriber.complete()` y en la siguiente línea escribes `subscriber.next('Tablet')`, ¿qué verá el suscriptor en consola y por qué?
3. **Aplicación:** Escribe la estructura de un suscriptor que procese números recibidos en `next` y muestre un mensaje de alerta en `error`.

## Fuente

- **Clase:** Anatomía del Patrón Observable: Subject y Subscriptor
- **Timestamp:** 21:00 - 30:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
