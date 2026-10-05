---
tags:
  - rxjs
  - angular
  - servicios
  - arquitectura
aliases:
  - Arquitectura Limpia
  - SRP
  - Servicios con HttpClient
clase: Arquitectura Limpia y Separación de Responsabilidades
timestamp: 01:52:00 - 01:55:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Arquitectura Limpia con Servicios e Inyección de Dependencias

## Definición

La **Arquitectura Limpia con Servicios** en Angular se basa en el **Principio de Responsabilidad Única (SRP)**. Separa la lógica de presentación (gestionada por los [Componentes](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>)) de la lógica de negocio, persistencia y comunicación con APIs remotas (gestionada por los **Servicios** `@Injectable`).

## Separación de Responsabilidades

```text
┌─────────────────────────────────────────┐
│              Componente                 │
│ - Controla la plantilla HTML y SCSS.     │
│ - Captura las acciones del usuario.     │
│ - Se suscribe al flujo de los servicios.│
└────────────────────┬────────────────────┘
                     │
                     │ Inyección de Servicio vía inject()
                     ▼
┌─────────────────────────────────────────┐
│           Servicio (@Injectable)        │
│ - Realiza llamadas con HttpClient.      │
│ - Construye y retorna los Observables.  │
│ - NO realiza .subscribe() internamente. │
└─────────────────────────────────────────┘
```

---

## Implementación Técnica (Código del Profesor)

### 1. Servicio de Usuarios (`user.service.ts`):

El servicio construye y retorna los Observables fuertemente tipados **sin suscribirse a ellos**.

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root' // Instancia Singleton global
})
export class UserService {
  private http = inject(HttpClient);
  private readonly rootUrl = 'https://jsonplaceholder.typicode.com';

  searchUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.rootUrl}/users?username=${username}`);
  }
}
```

---

### 2. Servicio de Publicaciones (`post.service.ts`):

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private readonly rootUrl = 'https://jsonplaceholder.typicode.com';

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.rootUrl}/posts?userId=${userId}`);
  }
}
```

---

## Regla de Oro

**Un servicio NUNCA debe ejecutar `.subscribe()` sobre sus propios Observables HTTP.**
El servicio debe limitarse a aplicar las transformaciones necesarias en la tubería (`.pipe()`) y **retornar el Observable** para que sea el componente (o la plantilla HTML mediante el Pipe Async) quien administre la suscripción final.

---

## Errores Comunes

- **Suscribirse dentro del servicio:** Dificulta la reutilización del método, bloquea la transmisión de errores hacia la vista y destruye el flujo reactivo.
- **Acoplar llamadas HTTP dentro del archivo del componente:** Rompe el principio de responsabilidad única y complica las pruebas unitarias.

## Buenas Prácticas

- Crear servicios especializados por cada dominio o entidad de la aplicación (ej. `UserService`, `PostService`, `AuthService`).
- Inyectar los servicios usando la función nativa `inject(NombreServicio)` dentro de los componentes.

## Relación con otros conceptos

- Centraliza las llamadas de: [10 - Consumo de API REST con HttpClient en Angular 19](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>)
- Provee los flujos que resuelve: [11 - Condiciones de Carrera y Cancelacion Reactiva](<11%20-%20Condiciones%20de%20Carrera%20y%20Cancelacion%20Reactiva.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué un método dentro de un servicio de Angular debe retornar un Observable en lugar de ejecutar un `.subscribe()` dentro del propio servicio?
2. **Diseño:** ¿Cómo contribuye la separación en servicios dedicados (`UserService`, `PostService`) al mantenimiento de una aplicación a largo plazo?

## Fuente

- **Clase:** Arquitectura Limpia y Separación de Responsabilidades
- **Timestamp:** 01:52:00 - 01:55:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
