---
tags:
  - angular
  - componentes
  - ui
aliases:
  - Componente
  - @Component
clase: Ejecución del Servidor Local y Primer "Hola Mundo" / Arquitectura Basada en Componentes
timestamp: 14:00 - 18:00 / 48:00 - 01:03:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Componentes en Angular

## Definición

Un **Componente** es el bloque de construcción fundamental de la interfaz de usuario en Angular. Es una clase de TypeScript decorada con `@Component` que asocia una vista (plantilla HTML), unos estilos visuales (CSS/SCSS) y una lógica de negocio.

## Estructura de un Componente

Un componente bien estructurado se compone de tres archivos principales:

1. `nombre.component.html`: Estructura HTML semántica.
2. `nombre.component.scss`: Estilos locales aislados.
3. `nombre.component.ts`: Propiedades, metadatos y métodos.

```text
          ┌────────────────────────────────────────┐
          │         Decorador @Component           │
          │  (Metadatos: selector, template, styles)│
          └──────────────────┬─────────────────────┘
                             │
       ┌─────────────────────┼─────────────────────┐
       ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Archivo TS  │      │ Archivo HTML │      │ Archivo SCSS │
│   (Lógica)   │      │   (Vista)    │      │  (Estilos)   │
└──────────────┘      └──────────────┘      └──────────────┘
```

---

## Explicación en Capas

### 1. Intuición

Piensa en los componentes como fichas de Lego o piezas modulares. La interfaz de una red social se divide en la barra de navegación superior, la barra lateral, la lista de noticias y las tarjetas de publicaciones. Cada una es una pieza independiente que se puede armar, reutilizar y mantener sin afectar a las demás.

### 2. Concepto Técnico

Un componente es una clase JavaScript que utiliza el patrón decorador (`@Component`). Incluye el principio de **Encapsulamiento de Estilos**: los estilos definidos dentro del archivo SCSS del componente solo aplican a su propio HTML sin "filtrarse" ni romper los estilos globales de la aplicación.

### 3. Implementación (Código del profesor)

```bash
# Comando CLI para generar un componente
ng g c components/navbar
```

Configuración del decorador y la clase en `app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent], // Se deben importar los componentes hijos a utilizar
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestion-estudiantes';
}
```

Uso del selector en el archivo `app.component.html`:

```html
<!-- HTML semántico y componente incrustado -->
<header>
  <app-navbar></app-navbar>
</header>

<main>
  <h1>Sistema de gestión de estudiantes</h1>
</main>

<footer></footer>
```

---

## Contexto Adicional

- Para evitar la proliferación de archivos de pruebas en proyectos educativos o de prototipado rápido, se puede configurar en `angular.json` la propiedad `"skipTests": true` dentro de los esquemáticos de componentes.

## Errores Comunes

- **Olvidar importar el componente hijo:** Si usas `<app-navbar>` en la plantilla HTML pero no incluyes `NavbarComponent` dentro del arreglo `imports` del decorador en el archivo `.ts`, Angular lanzará un error indicando que no reconoce el elemento.
- **Ejecutar `ng serve` fuera de la raíz del proyecto:** Causa errores de contexto al no encontrar el espacio de trabajo.

## Buenas Prácticas

- Mantener la maquetación HTML dentro de las etiquetas semánticas de HTML5 (`<header>`, `<main>`, `<footer>`, `<nav>`).
- Crear componentes pequeños y orientados a una sola responsabilidad.

## Relación con otros conceptos

- Pertenece a: [Angular Framework](<01%20-%20Angular%20Framework.md>)
- Utiliza: [Control Flow y Sintaxis de Plantillas](<05%20-%20Control%20Flow%20y%20Sintaxis%20de%20Plantillas.md>) y [Binding de Propiedades y Recursos Staticos](<06%20-%20Binding%20de%20Propiedades%20y%20Recursos%20Staticos.md>)
- Se comunica mediante: [Comunicacion entre Componentes (Inputs y Outputs)](<09%20-%20Comunicacion%20entre%20Componentes%20(Inputs%20y%20Outputs).md>)

## Preguntas de repaso

1. **Comprensión:** ¿En qué consiste el encapsulamiento de estilos en los componentes de Angular?
2. **Diagnóstico:** Colocas la etiqueta `<app-student-card></app-student-card>` en tu plantilla pero el compilador lanza un error de "Unknown element". ¿Cómo lo solucionas?
3. **Diseño:** Si vas a maquetar la interfaz de un panel de administración, ¿en qué componentes independientes dividirías la pantalla?

## Fuente

- **Clase:** Ejecución del Servidor Local y Primer "Hola Mundo" / Arquitectura Basada en Componentes
- **Timestamp:** 14:00 - 18:00 / 48:00 - 01:03:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
