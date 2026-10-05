---
tags:
  - angular
  - servicios
  - inyeccion-de-dependencias
aliases:
  - Servicios
  - Inyección de Dependencias
  - Singleton
clase: Servicios, Patrón Singleton e Inyección de Dependencias
timestamp: 01:30:00 - 01:45:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Servicios e Inyección de Dependencias

## Definición

Un **Servicio** es una clase decorada con `@Injectable` encargada de centralizar la lógica de negocio, la gestión del estado y la persistencia de datos. Se gestiona mediante el **Patrón Singleton** y se suministra a los componentes usando la **Inyección de Dependencias** mediante la función `inject()`.

## Patrón Singleton y Separación de Responsabilidades

- **Componentes:** Se limitan a controlar la vista y la interacción del usuario.
- **Servicios:** Almacenan y procesan los datos. Al estar configurados con `providedIn: 'root'`, existe **una única instancia global** compartida por todos los componentes de la aplicación.

```text
                         ┌─────────────────────────┐
                         │   StudentService TS     │
                         │ (Instancia Singleton)   │
                         └────────────┬────────────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               │ Inyección vía inject(StudentService)        │
               ▼                                             ▼
┌─────────────────────────────┐               ┌─────────────────────────────┐
│ StudentTablePageComponent   │               │   StudentDetailComponent    │
│  (Muestra lista global)     │               │   (Consulta estudiante :id) │
└─────────────────────────────┘               └─────────────────────────────┘
```

---

## Implementación (Código del profesor)

### 1. Creación del Servicio (`student.service.ts`):

```bash
ng g s services/student
```

```typescript
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root' // Define el alcance Singleton global
})
export class StudentService {
  private studentArray: Student[] = [
    { id: 1, name: 'María', age: 20, semester: 4, email: 'maria@test.com', gpa: 4.5, credits: 60 }
  ];

  getActiveStudents(): Student[] {
    return this.studentArray;
  }

  getStudentById(id: number): Student | undefined {
    return this.studentArray.find(s => s.id === id);
  }

  addStudent(student: Student) {
    this.studentArray.push(student);
  }
}
```

---

### 2. Consumo en un Componente usando `inject()` y `ngOnInit()`:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-table-page',
  templateUrl: './student-table-page.component.html'
})
export class StudentTablePageComponent implements OnInit {
  // Inyección limpia de dependencias (Angular Moderno)
  private studentService = inject(StudentService);
  students: Student[] = [];

  // Ciclo de vida: Se ejecuta al inicializar el componente
  ngOnInit() {
    this.students = this.studentService.getActiveStudents();
  }
}
```

---

## Contexto Adicional

- En proyectos reales de producción, la manipulación de arreglos locales en memoria se reemplaza por solicitudes HTTP asíncronas hacia servidores usando `HttpClient` y Observables (RxJS).

## Errores Comunes

- **Instanciar un servicio con `new StudentService()`:** Rompe el patrón Singleton de Angular; los datos no se compartirán entre componentes.
- **Cargar datos pesados en el constructor:** La inicialización de datos debe realizarse siempre dentro del hook del ciclo de vida `ngOnInit()`.

## Buenas Prácticas

- Usar la función `inject(Servicio)` en lugar de la inyección por constructor tradicional.
- Garantizar que los componentes no contengan lógica de almacenamiento de datos.

## Relación con otros conceptos

- Suministra datos a: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>)
- Gestiona modelos de: [TypeScript en Angular e Interfaces vs Clases](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>)
- Se integra con: [Lectura de Parametros y Navegacion Programatica](<12%20-%20Lectura%20de%20Parametros%20y%20Navegacion%20Programatica.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Qué problema resuelve el Patrón Singleton al compartir datos entre dos páginas independientes?
2. **Comparación:** ¿Qué ventaja ofrece la función `inject()` frente a la inyección tradicional dentro del constructor de la clase?
3. **Diagnóstico:** Si creas una variable en el Componente A y al cambiar a Componente B el valor se reinicia, ¿qué error cometiste en la arquitectura del servicio?

## Fuente

- **Clase:** Servicios, Patrón Singleton e Inyección de Dependencias
- **Timestamp:** 01:30:00 - 01:45:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
