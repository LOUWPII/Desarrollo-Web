---
tags:
  - angular
  - httpclient
  - typescript
  - interfaces
aliases:
  - HttpClient
  - HttpClientModule
  - Interfaces TypeScript
clase: Integración y Consumo en Angular mediante HttpClient
timestamp: ~39:00 - 48:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Integración de HttpClient, Módulos e Interfaces TypeScript en Angular

## Definición

**`HttpClient`** es el servicio integrado de Angular (`@angular/common/http`) utilizado para realizar solicitudes HTTP asíncronas hacia APIs RESTful, retornando Observables de RxJS. Requiere la importación del módulo **`HttpClientModule`** y la definición de **interfaces TypeScript** estrictamente alineadas con los atributos de las entidades Java del backend.

## Arquitectura de Integración Frontend-Backend

```text
 Backend Java (Spring Boot)                Frontend TypeScript (Angular)
┌──────────────────────────┐              ┌──────────────────────────┐
│ Entity: Student          │              │ Interface: Student       │
│ - Long id;               │ ◄──────────► │ - id?: number;           │
│ - String nombre;         │   Alineación │ - nombre: string;        │
│ - String correo;         │   Estricta   │ - correo: string;        │
│ - List<Homework> tareas; │              │ - tareas?: Homework[];   │
└──────────────────────────┘              └──────────────────────────┘

```

---

## Configuración e Implementación Técnica

### 1. Importación del Módulo (`app.module.ts`):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule // Habilita los proveedores globales de HttpClient
  ]
})
export class AppModule { }

```

### 2. Servicio Consumidor (`student.service.ts`):

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly url = 'http://localhost:8090/student';

  constructor(private http: HttpClient) {}

  // Retorna un Observable con la lista de estudiantes
  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/all`);
  }

  // Operación de adición enviando el objeto en el Body del POST
  addStudent(student: Student): void {
    this.http.post(`${this.url}/add`, student).subscribe();
  }

  // Operación de eliminación por ID
  deleteById(id: number): void {
    this.http.delete(`${this.url}/delete/${id}`).subscribe();
  }
}

```

---

## Errores Comunes

* ⚠️ **Desalineación de nombres de atributos entre Java y TypeScript:** Si Java expone `correo` y la interfaz de TypeScript define `email`, la información llegará como `undefined` o `null` sin lanzar ningún error en la consola.

## Buenas Prácticas

* Mapear las claves primarias u objetos de relación como opcionales (`id?: number`) en las interfaces TypeScript, ya que no siempre están presentes al crear un nuevo objeto.

## Relación con otros conceptos

* Se conecta con los controladores REST definidos en: [05 - Configuracion de Controladores REST y CORS con RestController y CrossOrigin](<05%20-%20Configuracion%20de%20Controladores%20REST%20y%20CORS%20con%20RestController%20y%20CrossOrigin.md>) y [07 - Construccion de Endpoints CRUD con RequestBody y PathVariable](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>)
* Suministra los Observables consumidos en: [11 - Consultas Asincronas Anidadas en Angular con el Operador mergeMap](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>)

## Preguntas de repaso

1. **Comprensión:** Explica qué sucede en la interfaz de Angular si el atributo de una entidad Java se llama `semestre` pero en la interfaz de TypeScript se escribe `semester`.
2. **Aplicación:** Escribe el método de un servicio Angular que elimine un recurso por su ID utilizando `HttpClient`.

## Fuente

* **Clase:** Integración y Consumo en Angular mediante HttpClient
* **Timestamp:** ~39:00 - 48:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
