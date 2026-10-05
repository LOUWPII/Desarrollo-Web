---
tags:
  - rxjs
  - angular
  - http
aliases:
  - HttpClient
  - Consumo de API REST
  - provideHttpClient
clase: Aplicación Real en Angular 19: Consumo de API REST
timestamp: 01:21:00 - 01:40:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Consumo de API REST con HttpClient en Angular 19

## Definición

El servicio **HttpClient** es el módulo oficial de Angular para realizar solicitudes HTTP (GET, POST, PUT, DELETE). Todas sus funciones retornan **Observables de RxJS**, permitiendo gestionar las respuestas asíncronas de servidores y APIs REST mediante el flujo reactivo.

## Configuración en Angular 19 (Sintaxis Moderna)

A partir de Angular 19, la configuración global se realiza en `app.config.ts` habilitando las herramientas de cliente mediante funciones.

### 1. Configuración Global (`app.config.ts`):

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // Provee la infraestructura de HttpClient para toda la aplicación
  providers: [provideHttpClient()]
};
```

---

### 2. Definición de Modelos e Interfaces (`user.model.ts`):

Las llamadas a `HttpClient` deben tiparse fuertemente mediante interfaces de TypeScript para garantizar autocompletado y seguridad contra errores.

```typescript
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

---

### 3. Inyección y Solicitud HTTP en Componente (`user-post.component.ts`):

En Angular 19 se utiliza la función `inject()` para consumir servicios de forma limpia sin recurrir al constructor.

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html'
})
export class UserPostComponent {
  // Inyección limpia de dependencias
  private http = inject(HttpClient);
  private readonly rootUrl = 'https://jsonplaceholder.typicode.com';

  // Retorna un Observable fuertemente tipado
  getUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.rootUrl}/users?username=${username}`);
  }
}
```

---

## Errores Comunes

- **Olvidar incluir `provideHttpClient()` en `app.config.ts`:** Provocará un error de inyección de dependencias al intentar usar `HttpClient` (`NullInjectorError`).
- **No tipar las respuestas HTTP:** Dejar `http.get(...)` sin genérico devolverá el tipo `any` / `Object`, perdiendo los beneficios de comprobación de TypeScript.

## Buenas Prácticas

- Tipar siempre las solicitudes `http.get<Modelo[]>(url)` con interfaces explícitas.
- Mantener la URL base en una variable constante o en archivos de entorno (`environment.ts`).

## Relación con otros conceptos

- Genera flujos analizados en: [04 - Anatomia del Observable y Suscriptor](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>)
- Se procesa mediante: [09 - Operadores XMap y Antipatron de Suscripciones Anidadas](<09%20-%20Operadores%20XMap%20y%20Antipatron%20de%20Suscripciones%20Anidadas.md>)
- Debe estructurarse en: [12 - Arquitectura Limpia con Servicios e Inyeccion de Dependencias](<12%20-%20Arquitectura%20Limpia%20con%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

## Preguntas de repaso

1. **Aplicación:** Escribe el código necesario para configurar `HttpClient` en `app.config.ts` en un proyecto de Angular 19.
2. **Comprensión:** ¿Por qué los métodos de `HttpClient` retornan Observables en lugar de `Promises` nativas?

## Fuente

- **Clase:** Aplicación Real en Angular 19: Consumo de API REST
- **Timestamp:** 01:21:00 - 01:40:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
