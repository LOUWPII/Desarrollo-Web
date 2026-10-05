---
tags:
  - angular
  - formularios
  - validaciones
aliases:
  - Reactive Forms
  - FormGroup
  - FormControl
clase: Formularios Reactivos e Integración CRUD
timestamp: 01:55:00 - 02:22:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Formularios Reactivos y Validaciones

## Definición

El módulo **ReactiveFormsModule** proporciona un enfoque explícito, síncrono y fuertemente tipado para gestionar el estado, los valores y las validaciones de los formularios en Angular. Utiliza **FormGroup** para controlar grupos de campos y **FormControl** para gestionar controles individuales.

## Estructura de Formularios Reactivos

```text
                  ┌─────────────────────────────────┐
                  │            FormGroup            │
                  │   (Estado global: valid/invalid)│
                  └────────────────┬────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│ FormControl  │             │ FormControl  │             │ FormControl  │
│    (name)    │             │    (age)     │             │   (email)    │
└──────────────┘             └──────────────┘             └──────────────┘
```

---

## Implementación Técnica (Código del profesor)

### 1. Definición en TypeScript (`student-form.component.ts`):

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule], // Requisito obligatorio
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent {
  studentForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$') // Expresión regular: solo letras
    ]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(80)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });
}
```

---

### 2. Vinculación en la Plantilla HTML (`student-form.component.html`):

```html
<form [formGroup]="studentForm" (ngSubmit)="handleSubmit()">
  <div>
    <label for="name">Nombre Completo:</label>
    <input id="name" type="text" formControlName="name">

    <!-- Mensajes de retroalimentación de error -->
    @if (studentForm.get('name')?.touched && studentForm.get('name')?.invalid) {
      @if (studentForm.get('name')?.hasError('required')) {
        <small class="error">El nombre es obligatorio.</small>
      }
      @if (studentForm.get('name')?.hasError('minlength')) {
        <small class="error">Debe tener mínimo 3 caracteres.</small>
      }
      @if (studentForm.get('name')?.hasError('pattern')) {
        <small class="error">Solo se permiten letras.</small>
      }
    }
  </div>

  <!-- Deshabilitación del botón si el formulario es inválido -->
  <button type="submit" [disabled]="studentForm.invalid">Guardar</button>
</form>
```

---

## Estados de los Controles

- `touched`: El usuario hizo clic o interactuó con el campo y luego salió de él.
- `invalid`: El valor actual no cumple con alguna de las reglas impuestas en los `Validators`.
- `hasError('nombreValidador')`: Determina el tipo de error específico activado.

---

## Errores Comunes

- **Olvidar incluir `ReactiveFormsModule` en los imports del componente:** Lanza errores de procesamiento con la directiva `[formGroup]`.
- **Incompatibilidad de nombres:** Escribir un `formControlName` en HTML que no coincida exactamente con la clave declarada en el `FormGroup` dentro de TypeScript.

## Buenas Prácticas

- Validar el estado `touched` antes de mostrar errores visuales para no incomodar al usuario antes de que interactúe con los campos.
- Deshabilitar el botón de envío usando `[disabled]="studentForm.invalid"`.

## Relación con otros conceptos

- Estructura las vistas de: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>)
- Se procesa y reutiliza en: [Reutilizacion de Formularios (CRUD Create Update)](<14%20-%20Reutilizacion%20de%20Formularios%20(CRUD%20Create%20Update).md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué se debe verificar el estado `touched` antes de mostrar los mensajes de error en la pantalla?
2. **Aplicación:** Escribe la regla de validación requerida para que un campo de edad acepte números comprendidos únicamente entre 18 y 65.
3. **Diagnóstico:** Si el botón de envío no se habilita a pesar de llenar los campos, ¿cómo puedes depurar cuál validador específico está marcando el formulario como `invalid`?

## Fuente

- **Clase:** Formularios Reactivos e Integración CRUD
- **Timestamp:** 01:55:00 - 02:22:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
