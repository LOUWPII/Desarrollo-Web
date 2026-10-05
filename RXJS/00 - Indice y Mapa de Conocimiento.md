---
tags:
  - rxjs
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC RxJS
  - Índice RxJS
---

# Índice y Mapa de Conocimiento — RxJS, Programación Reactiva y Angular 19

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Programación Reactiva y Patrón Observer](<01%20-%20Programacion%20Reactiva%20y%20Patron%20Observer.md>) | Paradigma, patrón Observer y posicionamiento del ecosistema |
| 02 | [Casos de Uso de RxJS en el Desarrollo Web](<02%20-%20Casos%20de%20Uso%20de%20RxJS%20en%20el%20Desarrollo%20Web.md>) | HTTP, eventos UI, autocompletado y comunicación no emparentada |
| 03 | [Entorno de Desarrollo Local para RxJS](<03%20-%20Entorno%20de%20Desarrollo%20Local%20para%20RxJS.md>) | Node.js, npm y ejecución de scripts en consola |
| 04 | [Anatomía del Observable y Suscriptor](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>) | `next` / `error` / `complete` y ejecución perezosa |
| 05 | [Operadores de Creación de Observables](<05%20-%20Operadores%20de%20Creacion%20de%20Observables.md>) | `of`, `from`, `range` e `interval` |
| 06 | [Tuberías (Pipes) y Operadores de Transformación](<06%20-%20Tuberias%20Pipes%20y%20Operadores%20de%20Transformacion.md>) | `map`, `filter`, `distinctUntilChanged` y rendimiento |
| 07 | [Buscador Optimizado Tipo Google con RxJS](<07%20-%20Buscador%20Optimizado%20Tipo%20Google%20con%20RxJS.md>) | `fromEvent` + `debounceTime` sobre el DOM |
| 08 | [Operadores de Combinación Concat y Merge](<08%20-%20Operadores%20de%20Combinacion%20Concat%20y%20Merge.md>) | Ejecución secuencial vs paralela |
| 09 | [Operadores XMap y Antipatrón de Suscripciones Anidadas](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>) | `switchMap`, `mergeMap`, `concatMap`, `exhaustMap` |
| 10 | [Consumo de API REST con HttpClient en Angular 19](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>) | `provideHttpClient()`, `inject()` y tipado de respuestas |
| 11 | [Condiciones de Carrera y Cancelación Reactiva](<11%20-%20Condiciones%20de%20Carrera%20y%20Cancelacion%20Reactiva.md>) | `userForm.events` + `switchMap` |
| 12 | [Arquitectura Limpia con Servicios e Inyección de Dependencias](<12%20-%20Arquitectura%20Limpia%20con%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>) | SRP, servicios `@Injectable` y la regla de oro |

---

## 2. Mapa de Conocimiento

```text
Ecosistema RxJS & Angular 19
├── Fundamentos de Programación Reactiva
│   ├── Paradigma y Patrón Observer (01)
│   ├── Casos de Uso en Desarrollo Web (02)
│   └── Entorno de Consola con Node.js (03)
│
├── Anatomía y Creación de Flujos
│   ├── Observables y Suscriptores (04)
│   └── Operadores de Creación (05)
│
├── Procesamiento y Transformación
│   ├── Tuberías (.pipe()) y Transformación (06)
│   ├── Caso Práctico: Buscador de Google (07)
│   └── Combinación de Flujos (08)
│
└── Control de Concurrencia e Integración en Angular
    ├── Operadores XMap y Anti-patrones (09)
    ├── Consumo HTTP en Angular 19 (10)
    ├── Condiciones de Carrera y Cancelación (11)
    └── Arquitectura Limpia con Servicios (12)
```

### Explicación de la Relación entre los Conceptos

La arquitectura reactiva se sostiene sobre el **Patrón Observer** ([01](<01%20-%20Programacion%20Reactiva%20y%20Patron%20Observer.md>)), el cual define cómo responder ante **Casos de Uso** asíncronos ([02](<02%20-%20Casos%20de%20Uso%20de%20RxJS%20en%20el%20Desarrollo%20Web.md>)) probados localmente con **Node.js** ([03](<03%20-%20Entorno%20de%20Desarrollo%20Local%20para%20RxJS.md>)).

El flujo de información se emite mediante **Observables y Suscriptores** ([04](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>)), los cuales pueden construirse mediante **Operadores de Creación** ([05](<05%20-%20Operadores%20de%20Creacion%20de%20Observables.md>)). Estos flujos son procesados a través de **Tuberías `.pipe()`** ([06](<06%20-%20Tuberias%20Pipes%20y%20Operadores%20de%20Transformacion.md>)) para filtrar y transformar datos al vuelo, lo que permite implementar aplicaciones prácticas como el **Buscador tipo Google** ([07](<07%20-%20Buscador%20Optimizado%20Tipo%20Google%20con%20RxJS.md>)) o combinar fuentes independientes con **Concat y Merge** ([08](<08%20-%20Operadores%20de%20Combinacion%20Concat%20y%20Merge.md>)).

Para evitar el descontrol de ejecución asíncrona, se aplican los **Operadores XMap** ([09](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>)), eliminando las suscripciones anidadas. Esta base se traslada a **Angular 19** para realizar solicitudes mediante **HttpClient** ([10](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>)), resolviendo **Condiciones de Carrera** mediante cancelación reactiva con `switchMap` ([11](<11%20-%20Condiciones%20de%20Carrera%20y%20Cancelacion%20Reactiva.md>)) y organizando el código bajo una **Arquitectura Limpia** donde los **Servicios** administran las fuentes de datos ([12](<12%20-%20Arquitectura%20Limpia%20con%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)).

---

## 3. Lo Esencial

1. **Patrón Observer:** Separa al sujeto emisor del suscriptor pasivo, evitando el consumo innecesario de recursos mediante respuestas tipo *push*.
2. **Ejecución Perezosa (*Lazy*):** Un Observable de RxJS no emitirá datos ni ejecutará lógica alguna hasta que un suscriptor invoque explícitamente el método `.subscribe()`.
3. **Procesamiento "Al Vuelo":** El método `.pipe()` permite encadenar operadores (`map`, `filter`, `distinctUntilChanged`) que procesan cada valor emitido individualmente sin cargar arreglos pesados en memoria.
4. **Prohibición de Suscripciones Anidadas:** Hacer `.subscribe()` dentro de otro `.subscribe()` es un antipatrón. Se deben utilizar operadores de aplanamiento XMap (como `switchMap`).
5. **Cancelación Automática con `switchMap`:** Ante eventos continuos (como búsquedas o tecleo), `switchMap` cancela la suscripción y petición HTTP anterior en curso, previniendo condiciones de carrera (*race conditions*).
6. **Separación de Responsabilidades:** En Angular 19, los servicios `@Injectable` construyen y retornan los Observables sin suscribirse a ellos; el componente es el responsable final de la suscripción.

---

## 4. Debo Saber Hacer

- [ ] Instalar RxJS en un entorno local de Node.js con npm y ejecutar scripts de prueba en consola. → [03](<03%20-%20Entorno%20de%20Desarrollo%20Local%20para%20RxJS.md>)
- [ ] Crear un Observable nativo mediante `new Observable()` manejando las notificaciones `next`, `error` y `complete`. → [04](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>)
- [ ] Instanciar Observables rápidos usando operadores de creación (`of`, `from`, `range`, `interval`). → [05](<05%20-%20Operadores%20de%20Creacion%20de%20Observables.md>)
- [ ] Construir una tubería `.pipe()` para filtrar y transformar flujos utilizando `map`, `filter` y `distinctUntilChanged`. → [06](<06%20-%20Tuberias%20Pipes%20y%20Operadores%20de%20Transformacion.md>)
- [ ] Capturar eventos del DOM con `fromEvent` e implementar un temporizador de pausa con `debounceTime`. → [07](<07%20-%20Buscador%20Optimizado%20Tipo%20Google%20con%20RxJS.md>)
- [ ] Combinar múltiples fuentes de datos distinguiendo cuándo usar `concat` (secuencial) y `merge` (paralelo). → [08](<08%20-%20Operadores%20de%20Combinacion%20Concat%20y%20Merge.md>)
- [ ] Reemplazar suscripciones anidadas refactorizando el flujo con el operador `switchMap`. → [09](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>)
- [ ] Configurar `provideHttpClient()` en `app.config.ts` para consumir APIs REST en Angular 19 usando `inject()`. → [10](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>)
- [ ] Detectar y resolver una condición de carrera escudriñando eventos de un formulario reactivo con `userForm.events`. → [11](<11%20-%20Condiciones%20de%20Carrera%20y%20Cancelacion%20Reactiva.md>)
- [ ] Encapsular llamadas HTTP dentro de clases de servicios `@Injectable` tipadas con interfaces de TypeScript. → [12](<12%20-%20Arquitectura%20Limpia%20con%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Usar Polling Recurrente** (`setInterval` consultando un servidor) | Consume recursos sin necesidad y no escala | [01](<01%20-%20Programacion%20Reactiva%20y%20Patron%20Observer.md>) |
| **Crear Observables sin Suscriptor** | El flujo nunca emite datos (nada se ejecuta) | [04](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>) |
| **Incurrir en Suscripciones Anidadas** | *Callback Hell*, condiciones de carrera y fugas de memoria | [09](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>) |
| **Confundir `of()` con `from()`** | Se emite la colección completa en un solo bloque | [05](<05%20-%20Operadores%20de%20Creacion%20de%20Observables.md>) |
| **Suscribirse dentro de un Servicio** | Destruye el flujo reactivo y bloquea el manejo de errores | [12](<12%20-%20Arquitectura%20Limpia%20con%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>) |
| **Usar `mergeMap` para Búsquedas en Vivo** | Respuestas antiguas lentas sobrescriben datos más recientes | [11](<11%20-%20Condiciones%20de%20Carrera%20y%20Cancelacion%20Reactiva.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Paradigmas)** Explica la diferencia fundamental de consumo de recursos entre la técnica de *Polling* tradicional y el *Patrón Observer* de la programación reactiva.
2. **(Diagnóstico / Operadores)** Tienes la instrucción `const flujo$ = of([1, 2, 3])`. Si te suscribes a `flujo$`, ¿cuántas emisiones recibirá el método `next` y cuál será el tipo de dato recibido?
3. **(Diseño / Performance)** En una barra de búsqueda que consulta a un backend, ¿qué operadores de RxJS debes combinar dentro del `.pipe()` para evitar enviar peticiones por cada letra tecleada y prevenir que una búsqueda anterior lenta sobrescriba la búsqueda actual?
4. **(Comparación / Concurrencia)** ¿En qué caso de uso real seleccionarías el operador `mergeMap` en lugar de `switchMap` y qué riesgo asumirías al hacerlo?
5. **(Aplicación / Angular)** Escribe la estructura completa de un método dentro de un servicio de Angular 19 que utilice `HttpClient` para retornar las publicaciones de un usuario mediante una interfaz `Post[]`.
6. **(Diagnóstico / Concurrentes)** Un usuario busca "Madrid" en tu aplicación y medio segundo después busca "Barcelona". Por problemas de red, la respuesta de "Madrid" llega después de la de "Barcelona". Si no utilizaste `switchMap`, ¿qué datos mostrará la pantalla y por qué?
