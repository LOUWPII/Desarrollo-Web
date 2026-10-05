---
tags:
  - rxjs
  - programacion-reactiva
  - fundamentos
aliases:
  - Programación Reactiva
  - Patrón Observer
clase: Introducción a RxJS, Programación Reactiva y Patrón Observer
timestamp: 0:00 - 3:30
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Programación Reactiva y Patrón Observer

## Definición

La **Programación Reactiva** es un paradigma de programación orientado al manejo de flujos de datos asíncronos y a la propagación del cambio. Se apoya en el **Patrón Observer**, un patrón de diseño de software que establece una relación de uno a muchos entre un sujeto (*Sujeto Pasivo* o *Observable*) y sus dependientes (*Observadores* o *Suscriptores*), garantizando que cuando el sujeto cambia de estado, todos sus dependientes son notificados y actualizados de forma automática.

## Intuición

Imagina que quieres comprar un teléfono de edición limitada que está agotado.

- **Enfoque de Polling (Tradicional):** Vas todos los días a la tienda a preguntar si ya llegó. Gastas tiempo, energía y recursos preguntando repetidamente aunque la respuesta sea "no".
- **Enfoque Reactivo (Patrón Observer):** Le dejas tu número telefónico a la tienda (te *suscribes*). Continúas con tu vida diaria sin gastar recursos adicionales. Cuando el producto llega, la tienda te envía una notificación directamente (*emisión*).

## ¿Para qué sirve?

- Evitar el procesamiento ineficiente por consulta recurrente (*polling*).
- Gestionar eventos asíncronos desacoplados en tiempo real (tecleo del usuario, respuestas de red, sensores IoT, sockets).
- Responder automáticamente a cambios de estado en interfaces de usuario complejas.

## ¿Cómo funciona?

1. **Sujeto (Observable):** Mantiene una lista de suscriptores y emite eventos cuando ocurren cambios de estado o llegan datos.
2. **Suscriptor (Observer):** Registra su interés ejecutando una suscripción y permanece pasivo en memoria a la espera de recibir datos.
3. **Notificación:** El sujeto transmite los datos de forma push hacia todos los suscriptores activos.

---

## Ecosistema y Posicionamiento

```text
                 ┌──────────────────────────────────────┐
                 │          Librería RxJS               │
                 │   (JavaScript / TypeScript / Node)   │
                 └──────────────────┬───────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│      Ecosistema Angular          │        │    Otros Entornos y Frameworks   │
│ - Manejo HTTP (HttpClient)       │        │ - Backend en Node.js             │
│ - Eventos de Formularios         │        │ - React / Vue / Vanilla JS       │
│ - Convivencia con Signals (v16+) │        │ - Aplicaciones IoT y Sockets     │
└──────────────────────────────────┘        └──────────────────────────────────┘
```

---

## Errores Comunes

- **Confundir RxJS con Angular:** RxJS es una biblioteca independiente de JavaScript. Angular la incluye por defecto, pero puede ejecutarse en Node.js, React o Vanilla JS.
- **Notificar masivamente a no suscriptores:** Emitir eventos a componentes que no han solicitado la información rompe el principio de desacoplamiento del patrón.

## Buenas Prácticas

- Suscribirse únicamente a las fuentes de datos estrictamente necesarias.
- Mantener la lógica del observador como una función receptora pasiva pura.

## Relación con otros conceptos

- Es la base de: [04 - Anatomia del Observable y Suscriptor](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>)
- Se aplica en: [02 - Casos de Uso de RxJS en el Desarrollo Web](<02%20-%20Casos%20de%20Uso%20de%20RxJS%20en%20el%20Desarrollo%20Web.md>)
- Se integra en Angular mediante: [10 - Consumo de API REST con HttpClient en Angular 19](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué la programación reactiva mediante el patrón Observer ahorra recursos en comparación con la técnica de *polling*?
2. **Comparación:** ¿Qué relación existe entre RxJS y Angular desde las versiones modernas (v16+)?
3. **Diagnóstico:** Si un componente necesita actualizarse cuando cambien los datos en el servidor, ¿qué problema ocurre si implementas un bucle `setInterval` que realice peticiones cada 2 segundos en lugar de suscribirte a un flujo?

## Fuente

- **Clase:** Introducción a RxJS, Programación Reactiva y Patrón Observer
- **Timestamp:** 0:00 - 3:30

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
