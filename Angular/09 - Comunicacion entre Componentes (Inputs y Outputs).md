---
tags:
  - angular
  - componentes
  - comunicacion
aliases:
  - Inputs y Outputs
  - input()
  - output()
clase: Comunicación entre Componentes (Inputs, Outputs y Eventos)
timestamp: 01:03:00 - 01:18:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Comunicación entre Componentes (Inputs y Outputs)

## Definición

Es el mecanismo estandarizado por Angular para transmitir información y reaccionar a eventos entre un componente contenedor (**Padre**) y sus subcomponentes visuales (**Hijos**). Se basa en el patrón de flujo de datos unidireccional.

## Regla de Comunicación

- **Padre ➔ Hijo:** Se realiza mediante **Inputs** (`input()`) usando Property Binding (`[...]`).
- **Hijo ➔ Padre:** Se realiza mediante **Outputs** (`output()`) emitiendo eventos interceptados con Event Binding (`(...)`).

```text
                    ┌────────────────────────┐
                    │    Componente Padre    │
                    └───┬────────────────┬───┘
                        │                ▲
      1. Envía datos    │                │  2. Emite eventos
   vía Input [prop]=""  │                │   vía Output (event)=""
                        ▼                │
                    ┌────────────────────┴───┐
                    │    Componente Hijo     │
                    └────────────────────────┘
```

---

## Implementación en Angular 19 (Sintaxis Funcional)

### Componente Hijo (`student-table.component.ts`):

```typescript
import { Component, input, output } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html'
})
export class StudentTableComponent {
  // Entradas de datos (Inputs)
  studentArray = input<Student[]>();
  studentsActive = input<boolean>(true);

  // Salida de eventos (Output)
  studentSelected = output<Student>();

  onDeactivate(student: Student) {
    // Emite el objeto seleccionado al componente padre
    this.studentSelected.emit(student);
  }
}
```

### Plantilla HTML del Hijo (`student-table.component.html`):

```html
<button (click)="onDeactivate(student)">Desactivar</button>
```

---

### Plantilla HTML del Padre (`student-table-page.component.html`):

```html
<app-student-table
  [studentArray]="activeStudents"
  [studentsActive]="true"
  (studentSelected)="desactivarEstudiante($event)">
</app-student-table>
```

### Clase del Padre (`student-table-page.component.ts`):

```typescript
export class StudentTablePageComponent {
  activeStudents: Student[] = [];

  desactivarEstudiante(student: Student) {
    // Captura el objeto emitido desde el hijo mediante $event
    console.log('Estudiante recibido para desactivar:', student);
  }
}
```

---

## Tablas Comparativas

| Tipo de Comunicación | Dirección | Sintaxis Angular 19 | Evento de Captura |
| --- | --- | --- | --- |
| **Input** | Padre ➔ Hijo | `prop = input<Tipo>()` | `[prop]="valorPadre"` |
| **Output** | Hijo ➔ Padre | `evento = output<Tipo>()` | `(evento)="metodoPadre($event)"` |

---

## Errores Comunes

- **Olvidar incluir `$event` en el padre:** Si en la plantilla del padre escribes `(studentSelected)="desactivarEstudiante()"`, no recibirás el objeto transmitido por el hijo.
- **Intentar modificar directamente un Input en el hijo:** Violación del principio de flujo de datos unidireccional. El hijo debe notificar al padre mediante un Output para que sea el padre quien altere el estado.

## Buenas Prácticas

- Usar las funciones nativas de Angular 19 (`input()`, `output()`) en lugar de los decoradores heredados (`@Input()`, `@Output()`).
- Mantener los componentes hijos como componentes "tontos" o de presentación (*presentational components*) que solo reciben datos y emiten eventos.

## Relación con otros conceptos

- Estructura la jerarquía de: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>)
- Utiliza la seguridad de: [TypeScript en Angular e Interfaces vs Clases](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué la transmisión de datos desde el hijo hacia el padre requiere el paso explícito de la variable `$event`?
2. **Aplicación:** Escribe el código de un componente hijo con un Output que notifique al padre cuando se presione el botón "Eliminar".
3. **Diagnóstico:** Si cambias la propiedad de un `input()` dentro del componente hijo, ¿por qué constituye una mala práctica de diseño?

## Fuente

- **Clase:** Comunicación entre Componentes (Inputs, Outputs y Eventos)
- **Timestamp:** 01:03:00 - 01:18:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
