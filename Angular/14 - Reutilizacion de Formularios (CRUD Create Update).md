---
tags:
  - angular
  - formularios
  - crud
aliases:
  - Reutilización de Formularios
  - patchValue
  - Create Update
clase: Reutilización de Formularios para Creación y Edición
timestamp: 02:22:00 - 02:43:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Reutilización de Formularios (CRUD Create / Update)

## Definición

La **Reutilización de Formularios** es un patrón de diseño que permite emplear un único [Componente](<04%20-%20Componentes%20en%20Angular.md>) y su plantilla de [Formulario Reactivo](<13%20-%20Formularios%20Reactivos%20y%20Validaciones.md>) para llevar a cabo dos operaciones del CRUD: la creación de un nuevo registro (*Create*) y la modificación de un registro existente (*Update*).

## Lógica Dual (Create / Update)

El comportamiento de la pantalla se determina al inicializar el componente evaluando la presencia de un parámetro de URL:

1. **Modo Creación:** Se accede por `/student/new`. No existe parámetro `:id`.
2. **Modo Edición:** Se accede por `/student/update/:id`. Existe un parámetro `:id` que carga los datos mediante el método `patchValue()`.

---

## Implementación Dual (Código del profesor)

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

export class StudentFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studentService = inject(StudentService);

  userId?: number;
  isEdit: boolean = false;

  ngOnInit() {
    // Detección de parámetro de ruta para determinar el modo
    const idParam = this.route.snapshot.params['id'];

    if (idParam) {
      this.userId = Number(idParam);
      this.isEdit = true;

      // Carga de datos existentes desde el servicio
      const existingStudent = this.studentService.getStudentById(this.userId);
      if (existingStudent) {
        // Asignación parcial/total de los valores al formulario
        this.studentForm.patchValue({
          name: existingStudent.name,
          age: existingStudent.age,
          email: existingStudent.email
        });
      }
    }
  }

  handleSubmit() {
    if (this.studentForm.invalid) return;

    const formVal = this.studentForm.value;
    const studentData: Student = {
      id: this.userId ?? 0,
      name: formVal.name ?? '',
      age: Number(formVal.age),
      email: formVal.email ?? '',
      semester: 1,
      gpa: 0,
      credits: 0
    };

    if (this.isEdit && this.userId) {
      // Actualización en el servicio
      this.studentService.updateStudent(this.userId, studentData);
    } else {
      // Creación en el servicio
      this.studentService.addStudent(studentData);
    }

    // Redirección al listado
    this.router.navigate(['/']);
  }
}
```

---

## Tabla Comparativa: `patchValue()` vs `setValue()`

| Método | Comportamiento | Casos de Uso |
| --- | --- | --- |
| `patchValue({...})` | Actualiza **únicamente** las propiedades enviadas. Ignora campos ausentes. | **Recomendado:** Ideal para rellenar objetos parciales sin fallar. |
| `setValue({...})` | Exige estrictamente **todas** las propiedades definidas en el `FormGroup`. | Solo cuando se garantiza la coincidencia exacta de toda la estructura. |

---

## Errores Comunes

- **No castear entradas a tipo numérico:** Los campos HTML de tipo `<input type="number">` suelen retornar valores de tipo `string`. No convertirlos antes de enviarlos al servicio rompe el tipado de los modelos.
- **Usar `setValue()` con objetos parciales:** Provocará una excepción en tiempo de ejecución al omitir propiedades.

## Buenas Prácticas

- Preferir el uso de `patchValue()` para evitar colapsos por falta de coincidencia en todos los campos del objeto.
- Redirigir al usuario al listado principal una vez completada con éxito la operación.

## Relación con otros conceptos

- Extiende: [Formularios Reactivos y Validaciones](<13%20-%20Formularios%20Reactivos%20y%20Validaciones.md>)
- Lee parámetros de: [Lectura de Parametros y Navegacion Programatica](<12%20-%20Lectura%20de%20Parametros%20y%20Navegacion%20Programatica.md>)
- Persiste datos mediante: [Servicios e Inyeccion de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

## Preguntas de repaso

1. **Comparación:** ¿Qué ventaja ofrece la función `patchValue()` frente a `setValue()` al cargar datos en un formulario de edición?
2. **Aplicación:** ¿Cómo determina la función `ngOnInit()` si la pantalla debe comportarse en modo Creación o modo Edición?

## Fuente

- **Clase:** Reutilización de Formularios para Creación y Edición
- **Timestamp:** 02:22:00 - 02:43:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
