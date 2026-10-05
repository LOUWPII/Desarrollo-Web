---
tags:
  - angular
  - plantillas
  - control-flow
aliases:
  - Control Flow
  - @if
  - @for
clase: TypeScript en Componentes, Interpolación y Control Flow
timestamp: 18:00 - 28:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Control Flow y Sintaxis de Plantillas

## Definición

El **Control Flow** (Flujo de Control) representa la sintaxis declarativa utilizada en las plantillas HTML de Angular para evaluar condiciones (`@if`, `@else`) e iterar sobre colecciones de datos (`@for`). Coexiste con la **Interpolación** (`{{ }}`), que permite renderizar valores dinámicos.

## Sintaxis y Uso

### 1. Interpolación `{{ }}`

Permite evaluar y renderizar expresiones legales de TypeScript dentro de la plantilla HTML.

```html
<!-- Código del profesor -->
<h2>Bienvenido {{ username }}</h2>
<p>Cálculo dinámico: {{ 1 + 2 + 3 + 4 }}</p>
```

---

### 2. Condicional `@if` / `@else`

Evalúa una condición lógica directamente en el DOM. Si la variable evalúa a un valor *falsy* (como una cadena vacía `''` o `null`), se renderiza el bloque `@else`.

```html
<!-- Código del profesor -->
@if (username) {
  <span>Bienvenido {{ username }}</span>
} @else {
  <button>Iniciar sesión</button>
}
```

---

### 3. Bucle `@for`

Itera sobre arreglos o colecciones. En Angular 19 es **estrictamente obligatorio** proporcionar la cláusula `track` para identificar cada elemento de forma única y optimizar el rendimiento del renderizado en el DOM.

```html
<!-- Código del profesor -->
@for (student of studentArray; track student.id) {
  <tr>
    <td>{{ student.name }}</td>
    <td>{{ student.age }}</td>
  </tr>
}
```

---

## Tablas Comparativas

| Estructura Antigua (Heredada < v17) | Sintaxis Moderna (Angular 17/19) | Ventajas Sintaxis Moderna |
| --- | --- | --- |
| `*ngIf="condicion"` | `@if (condicion) { }` | No requiere directivas ni contenedores extra (`<ng-container>`). |
| `*ngFor="let item of items"` | `@for (item of items; track item.id) { }` | Integrada en el compilador, más rápida y exige la clave `track`. |

---

## Errores Comunes

- **Olvidar la propiedad `track` en `@for`:** En sintaxis moderna provocará un error de compilación.
- **Mezclar sintaxis antigua (`*ngIf`) con la nueva (`@if`):** Genera confusión en el mantenimiento de la plantilla.

## Buenas Prácticas

- Utilizar valores id unicos e inmutables para la cláusula `track` en el `@for`.
- Evitar realizar operaciones lógicas complejas dentro de la interpolación `{{ }}`; es preferible delegar los cálculos a métodos en el archivo TypeScript.

## Relación con otros conceptos

- Utilizado en: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>)
- Procesa datos provenientes de: [TypeScript en Angular e Interfaces vs Clases](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>)

## Preguntas de repaso

1. **Aplicación:** Escribe el bloque de plantilla necesario para iterar una lista de productos mostrando su nombre y precio mediante sintaxis moderna.
2. **Comparación:** ¿Qué ventaja ofrece el uso obligatorio de `track` en los bucles `@for` frente al antiguo `*ngFor`?
3. **Diagnóstico:** Si la variable `username = ''`, ¿qué bloque del condicional `@if (username)` se mostrará en pantalla y por qué?

## Fuente

- **Clase:** TypeScript en Componentes, Interpolación y Control Flow
- **Timestamp:** 18:00 - 28:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
