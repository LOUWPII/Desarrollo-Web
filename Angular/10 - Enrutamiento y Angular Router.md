---
tags:
  - angular
  - routing
  - spa
aliases:
  - Angular Router
  - Enrutamiento
clase: Enrutamiento (Routing) y Organización de Proyecto
timestamp: 01:18:00 - 01:30:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Enrutamiento y Angular Router

## Definición

**Angular Router** es la librería oficial que permite implementar la navegación entre vistas en una Aplicación de Página Única (SPA). Asocia direcciones URL con [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>) específicos y los renderiza de forma dinámica en la plantilla a través de la directiva `<router-outlet>`.

## Organización Profesional de Carpetas

Para evitar la dispersión de archivos, la aplicación se estructura dividiendo las pantallas globales de las piezas visuales reusables:

```text
src/app/
├── models/                   # Interfaces y modelos
├── services/                 # Lógica de negocio y persistencia
├── shared/                   # Componentes globales (ej. Navbar)
└── pages/                    # Vistas completas asociadas a Rutas
    ├── student-table-page/
    ├── student-detail/
    └── student-form/
```

---

## Configuración de Rutas (`app.routes.ts`)

```typescript
// Código del profesor
import { Routes } from '@angular/router';
import { StudentTablePageComponent } from './pages/student-table-page/student-table-page.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentFormComponent } from './pages/student-form/student-form.component';

export const routes: Routes = [
  { path: '', component: StudentTablePageComponent },
  { path: 'student/new', component: StudentFormComponent },
  { path: 'student/update/:id', component: StudentFormComponent }, // Ruta con parámetro
  { path: 'student/:id', component: StudentDetailComponent }
];
```

---

## Directiva `<router-outlet>`

Se ubica en la plantilla raíz (`app.component.html`) actuando como el marcador de posición donde se montarán los componentes navegados.

```html
<app-navbar></app-navbar>

<main>
  <!-- Espacio dinámico administrado por el enrutador -->
  <router-outlet></router-outlet>
</main>

<footer></footer>
```

---

## Regla Crítica: El Orden de las Rutas

El enrutador de Angular evalúa el arreglo de rutas **de forma descendente (de arriba a abajo)** utilizando una estrategia de primera coincidencia.

⚠️ **Advertencia del Profesor:**
Si colocas la ruta parametrizada `student/:id` por **encima** de `student/new`, al navegar a `/student/new` Angular interpretará la cadena `"new"` como un parámetro `:id` numérico y cargará erróneamente el componente `StudentDetailComponent`.

---

## Errores Comunes

- **Ubicar rutas específicas debajo de rutas parametrizadas:** Causa la carga de componentes incorrectos.
- **No colocar `<router-outlet>` en la plantilla principal:** La aplicación cambiará la URL pero no renderizará ninguna página.

## Buenas Prácticas

- Declarar siempre las rutas más específicas primero y las genéricas o parametrizadas después.
- Organizar las pantallas en una carpeta dedicada `pages/`.

## Relación con otros conceptos

- Renderiza componentes de tipo: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>)
- Transfiere parámetros a: [Lectura de Parametros y Navegacion Programatica](<12%20-%20Lectura%20de%20Parametros%20y%20Navegacion%20Programatica.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Cuál es la función específica de la etiqueta `<router-outlet>` en la plantilla principal de la aplicación?
2. **Diagnóstico:** Si al escribir en el navegador `/student/new` se abre la pantalla de detalle de un estudiante en lugar del formulario de creación, ¿cuál es el fallo en la configuración de `app.routes.ts`?

## Fuente

- **Clase:** Enrutamiento (Routing) y Organización de Proyecto
- **Timestamp:** 01:18:00 - 01:30:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
