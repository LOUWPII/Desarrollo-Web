---
tags:
  - angular
  - rxjs
  - mergemap
  - consultas-anidadas
aliases:
  - Consultas Asíncronas Anidadas
  - mergeMap en Angular
  - student-detail
clase: Consultas Anidadas en Angular con mergeMap
timestamp: ~48:00 - 58:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Consultas Asíncronas Anidadas en Angular con el Operador `mergeMap`

## Definición

Es el patrón utilizado en componentes de Angular para encadenar peticiones HTTP dependientes (donde el resultado de la primera petición es necesario para disparar la segunda) utilizando el operador **`mergeMap`** de RxJS, manteniendo una única suscripción y respetando la separación de datos impuesta por `@JsonIgnore` en el backend.

## Flujo de Carga de Consultas Concatenadas

```text
 1. http.get('/student/1') ──────► Devuelve: studentInfo
                                           │
                                           ▼
 2. pipe(mergeMap(...))   ──────► Invoca: http.get('/homework/student/1')
                                           │
                                           ▼
 3. .subscribe(...)       ──────► Asigna las tareas recibidas a student.tareas

```

---

## Implementación Técnica (`student-detail.component.ts`)

```typescript
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { HomeworkService } from '../../services/homework.service';
import { Student } from '../../models/student';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html'
})
export class StudentDetailComponent implements OnInit {
  student!: Student;

  constructor(
    private studentService: StudentService,
    private homeworkService: HomeworkService
  ) {}

  ngOnInit(): void {
    const studentId = 1; // ID obtenido dinámicamente de la ruta

    // Encadenamiento limpio mediante la tubería pipe y mergeMap
    this.studentService.findById(studentId).pipe(
      mergeMap((studentInfo) => {
        this.student = studentInfo; // Guarda la información básica del estudiante
        // Retorna el Observable de la segunda petición (Tareas)
        return this.homeworkService.findByStudentId(this.student.id!);
      })
    ).subscribe((tareasRecibidas) => {
      // Asigna el arreglo de tareas al objeto local
      this.student.tareas = tareasRecibidas;
    });
  }
}

```

---

## Justificación Arquitectónica

Esta solución directa resuelve la omisión de las listas de tareas provocado por `@JsonIgnore` en el servidor, permitiendo mantener un backend liviano y recuperando la información relacionada únicamente cuando el usuario navega a la vista de detalle.

---

## Errores Comunes

* ⚠️ **Omitir el `return` del segundo Observable dentro de `mergeMap`:** Provoca que la cadena reactiva no reciba la segunda petición y el bloque `.subscribe()` nunca sea notificado con el resultado secundario.

## Buenas Prácticas

* Garantizar que las funciones dentro del operador `mergeMap` retornen explícitamente el nuevo Observable a subscribir.

## Relación con otros conceptos

* Aplica las bases teóricas revisadas en: [01 - Asincronismo RxJS y Manejo de Concurrencia con mergeMap y concatMap](<01%20-%20Asincronismo%20RxJS%20y%20Manejo%20de%20Concurrencia%20con%20mergeMap%20y%20concatMap.md>)
* Consume el endpoint expuesto en: [08 - Consultas Derivadas en Spring Data JPA y Modulo Homework](<08%20-%20Consultas%20Derivadas%20en%20Spring%20Data%20JPA%20y%20Modulo%20Homework.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la razón por la cual es necesario utilizar `mergeMap` en la pantalla de detalle de un estudiante para mostrar sus tareas asociadas.
2. **Aplicación:** Escribe el bloque dentro de `.pipe(...)` que capture un objeto `User` y devuelva la petición HTTP para traer los pedidos de dicho usuario.

## Fuente

* **Clase:** Consultas Anidadas en Angular con mergeMap
* **Timestamp:** ~48:00 - 58:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
