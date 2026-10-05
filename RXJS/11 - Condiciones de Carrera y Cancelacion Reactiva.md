---
tags:
  - rxjs
  - angular
  - concurrencia
aliases:
  - Condiciones de Carrera
  - Race Condition
  - Cancelación Reactiva
clase: Detección y Solución de Condiciones de Carrera
timestamp: 01:40:00 - 01:52:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Condiciones de Carrera y Cancelación Reactiva

## Definición

Una **Condición de Carrera** (*Race Condition*) en el desarrollo web es un fallo de concurrencia que ocurre cuando el orden de llegada de las respuestas asíncronas de red no coincide con el orden cronológico en que fueron solicitadas por el usuario, provocando que datos desactualizados sobrescriban la interfaz de usuario.

## Ejemplo del Problema (Inconsistencia en UI)

```text
Tiempo 0ms: Usuario busca "Bret"     ───► (Petición 1 lanzada - Red lenta)
Tiempo 200ms: Usuario busca "Karen"  ───► (Petición 2 lanzada - Red rápida)

Tiempo 400ms: Llega Respuesta "Karen" ───► UI muestra datos de KAREN (Correcto)
Tiempo 800ms: Llega Respuesta "Bret"  ───► UI sobrescribe y muestra datos de BRET (❌ ERROR)
```

---

## Solución Reactiva con `userForm.events` y `switchMap`

Para solucionar este problema en Angular 19, se escuchan los eventos del formulario reactivo y se encadenan con `switchMap`. Si el usuario envía un nuevo formulario mientras la petición anterior sigue en vuelo, `switchMap` **cancela automáticamente la petición HTTP previa**.

### Implementación Técnica (Código del Profesor)

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormSubmittedEvent } from '@angular/forms';
import { filter, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-user-post',
  imports: [ReactiveFormsModule],
  templateUrl: './user-post.component.html'
})
export class UserPostComponent {
  private userService = inject(UserService);
  private postService = inject(PostService);

  userForm = new FormGroup({
    username: new FormControl('')
  });

  posts: Post[] = [];

  constructor() {
    // Escucha continua de eventos del formulario
    this.userForm.events
      .pipe(
        // 1. Filtrar únicamente cuando el evento sea de envío de formulario
        filter((event) => event instanceof FormSubmittedEvent),

        // 2. Cancelar la búsqueda de usuario anterior si se envía una nueva
        switchMap(() => {
          const username = this.userForm.value.username ?? '';
          return this.userService.searchUser(username);
        }),

        // 3. Cancelar la búsqueda de posts anterior y encadenar con los posts del usuario
        switchMap((users) => {
          const userId = users[0]?.id;
          return this.postService.getPostsByUserId(userId);
        })
      )
      .subscribe({
        next: (posts) => {
          // Resultado garantizado: siempre corresponde al último evento de envío
          this.posts = posts;
        }
      });
  }
}
```

---

## Errores Comunes

- **Manejar peticiones asíncronas dependientes con `mergeMap`:** Provoca condiciones de carrera cuando las peticiones anteriores tardan más en responder que las nuevas.
- **No filtrar los eventos del formulario:** `userForm.events` emite ante múltiples acciones (foco, cambios de valor, envíos); se debe usar `filter(e => e instanceof FormSubmittedEvent)` para responder únicamente al submit.

## Buenas Prácticas

- Usar siempre `switchMap` en flujos de búsqueda o filtrado de interfaces donde solo importe el resultado de la acción más reciente.

## Relación con otros conceptos

- Resuelve problemas expuestos en: [02 - Casos de Uso de RxJS en el Desarrollo Web](<02%20-%20Casos%20de%20Uso%20de%20RxJS%20en%20el%20Desarrollo%20Web.md>)
- Utiliza la mecánica de: [09 - Operadores XMap y Antipatron de Suscripciones Anidadas](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>)
- Consume servicios de: [12 - Arquitectura Limpia con Servicios e Inyeccion de Dependencias](<12%20-%20Arquitectura%20Limpia%20con%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

## Preguntas de repaso

1. **Comprensión:** Explica cómo ocurre una condición de carrera (*race condition*) en una aplicación web y cuáles son sus consecuencias en la pantalla.
2. **Aplicación:** Escribe el bloque de código con `switchMap` que garantice la cancelación de una petición HTTP previa al presionar un botón.

## Fuente

- **Clase:** Detección y Solución de Condiciones de Carrera
- **Timestamp:** 01:40:00 - 01:52:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
