---
tags:
  - rxjs
  - asincronismo
  - mergemap
  - angular
aliases:
  - mergeMap
  - concatMap
  - Operadores de Aplanamiento
clase: Repaso de Asincronismo, Patrón Push-Subscribe y Manejo de Concurrencia
timestamp: ~00:00 - 03:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Asincronismo RxJS y Manejo de Concurrencia con `mergeMap` y `concatMap`

## Definición

El **Patrón Push-Subscribe** de RxJS permite recibir flujos asíncronos de datos de forma reactiva. Sin embargo, anidar múltiples suscripciones (`.subscribe()` dentro de otro `.subscribe()`) es un **antipatrón** que genera problemas de latencia, condiciones de carrera (*Race Conditions*) y fugas de memoria. La solución profesional radica en utilizar **operadores de aplanamiento** (*Flattening Operators*) como `mergeMap` o `concatMap`.

## El Problema: Antipatrón de Suscripciones Anidadas y Latencia

Cuando se realizan peticiones HTTP dependientes o consecutivas, el orden de envío no garantiza el mismo orden de llegada debido a la latencia de red variable.

```text
 ❌ ANTIPATRÓN: Suscripciones Anidadas
 this.http.get('/user/1').subscribe(user => {
     // Si la respuesta del usuario tarda 500ms...
     this.http.get(`/posts?userId=${user.id}`).subscribe(posts => {
         // ...las respuestas pueden mezclarse o llegar fuera de orden.
     });
 });

 ⚠️ Riesgo: Si el usuario busca "Juan" y luego "Juance", la respuesta tardía de 
 "Juan" puede sobrescribir los datos de "Juance" en la interfaz.

```

---

## Solución con Operadores de Aplanamiento

Los operadores de aplanamiento toman un Observable emisor, mapean su valor hacia un nuevo Observable interno y gestionan la suscripción automáticamente de forma consistente.

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                      Operadores RxJS                        │
 ├──────────────────────────────┬──────────────────────────────┤
 │          `mergeMap`          │          `concatMap`         │
 ├──────────────────────────────┼──────────────────────────────┤
 │ Ejecuta las peticiones       │ Mantiene un orden secuencial │
 │ internas en paralelo a medida│ estricto; no inicia la      │
 │ que van llegando.            │ siguiente hasta completar la │
 │                              │ anterior.                    │
 └──────────────────────────────┴──────────────────────────────┘

```

---

## Importación e Implementación Básica

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-posts',
  template: `...`
})
export class UserPostsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Tubería asíncrona plana y limpia
    this.http.get<any>('https://jsonplaceholder.typicode.com/users/1').pipe(
      mergeMap(user => this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`))
    ).subscribe(posts => {
      console.log('Posts recibidos sin anidar subscribe:', posts);
    });
  }
}

```

---

## Errores Comunes

* ⚠️ **Anidar `.subscribe()` dentro del callback de otro `.subscribe()`:** Causa *Callback Hell*, dificulta la cancelación de peticiones, genera *Memory Leaks* y produce estados inconsistentes en la UI por respuestas fuera de orden.

## Buenas Prácticas

* Usar siempre la tubería `.pipe()` combinada con operadores de aplanamiento (`mergeMap`, `switchMap`, `concatMap`) para encadenar llamadas HTTP asíncronas.

## Relación con otros conceptos

* Es el fundamento técnico para resolver las consultas anidadas del frontend en: [11 - Consultas Asincronas Anidadas en Angular con el Operador mergeMap](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>)
* Se aplica al consumir la API desarrollada en: [07 - Construccion de Endpoints CRUD con RequestBody y PathVariable](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>)

## Preguntas de repaso

1. **Comprensión:** Explica técnicamente por qué el uso de `.subscribe()` anidados puede causar que los datos mostrados en la interfaz no correspondan a la última acción realizada por el usuario.
2. **Comparación:** ¿Cuál es la diferencia de comportamiento entre `mergeMap` y `concatMap` al procesar múltiples peticiones HTTP?

## Fuente

* **Clase:** Repaso de Asincronismo, Patrón Push-Subscribe y Manejo de Concurrencia
* **Timestamp:** ~00:00 - 03:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
