---
tags:
  - angular
  - routing
  - parametros
aliases:
  - ActivatedRoute
  - routerLink
  - Navegación Programática
clase: Lectura de Parámetros de Ruta y Navegación
timestamp: 01:45:00 - 01:55:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Lectura de Parámetros y Navegación Programática

## Definición

Es el conjunto de técnicas que permiten extraer variables enviadas dentro de la URL (parámetros de ruta) mediante el servicio `ActivatedRoute`, así como realizar redirecciones entre páginas desde el código de TypeScript utilizando el servicio `Router` o desde la plantilla con `[routerLink]`.

## Implementación y Métodos

### 1. Lectura de Parámetros (`ActivatedRoute`)

Los parámetros extraídos mediante `snapshot.params` se obtienen **siempre en formato de texto (`string`)**. Si se requiere consultar una entidad por un ID numérico, es obligatorio realizar el casteo a `number`.

```typescript
// Código del profesor en StudentDetailComponent
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';

export class StudentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);

  studentId!: number;

  ngOnInit() {
    // Extracción y casteo explícito con Number()
    this.studentId = Number(this.route.snapshot.params['id']);
  }
}
```

---

### 2. Navegación Programática en TypeScript (`Router`)

```typescript
import { Router } from '@angular/router';

export class AnyComponent {
  private router = inject(Router);

  goToHome() {
    // Redirecciona programáticamente al listado
    this.router.navigate(['/']);
  }
}
```

---

### 3. Navegación desde la Plantilla HTML (`routerLink`)

```typescript
// Requiere importar RouterLink dentro del arreglo 'imports' del componente .ts
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink]
})
export class StudentTableComponent {}
```

```html
<!-- Plantilla HTML -->
<a [routerLink]="['/student', student.id]">Ver Detalle</a>
```

---

## Errores Comunes

- **Comparar cadenas con números sin castear:** Intentar buscar en el servicio un estudiante con `s.id === params['id']` devolverá `undefined` porque el tipo de dato no coincide (`number` vs `string`).
- **Olvidar importar `RouterLink` en el `.ts`:** La directiva `[routerLink]` en el HTML será ignorada sin lanzar alertas visibles inmediatas.

## Buenas Prácticas

- Convertir explícitamente a número los parámetros de ruta usando `Number()` o `+`.
- Usar navegación programática tras operaciones de modificación de datos (como crear o editar un registro).

## Relación con otros conceptos

- Lee rutas configuradas en: [Enrutamiento y Angular Router](<10%20-%20Enrutamiento%20y%20Angular%20Router.md>)
- Inyecta servicios mediante: [Servicios e Inyeccion de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

## Preguntas de repaso

1. **Diagnóstico:** Consultas la URL `/student/5` y ejecutas `this.route.snapshot.params['id']`. ¿De qué tipo de dato es la variable obtenida y qué transformación debes aplicarle antes de buscarla en tu servicio?
2. **Aplicación:** Escribe el método TypeScript necesario para redirigir al usuario a la ruta `/student/update/10` tras presionar un botón.

## Fuente

- **Clase:** Lectura de Parámetros de Ruta y Navegación
- **Timestamp:** 01:45:00 - 01:55:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
