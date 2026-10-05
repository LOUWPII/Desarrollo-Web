---
tags:
  - angular
  - typescript
  - null-safety
aliases:
  - Null Safety
  - Operador Opcional
  - Navegación Segura
clase: Fundamentos de TypeScript, Tipado y Null Safety
timestamp: 33:00 - 48:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Null Safety y Operador Opcional

## Definición

**Null Safety** (Seguridad contra Nulos) es el conjunto de mecanismos que ofrece TypeScript y la sintaxis de plantillas de Angular para evitar excepciones por referencias nulas en tiempo de ejecución (*NullPointerException* o *Cannot read properties of undefined*).

## Operadores Clave

### 1. Atributo Opcional (`?`)

Se utiliza dentro de las [Interfaces](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>) o clases para indicar que un campo no es estrictamente obligatorio.

```typescript
export interface Student {
  id: number;
  name: string;
  photo?: string; // Campo opcional: puede ser string o undefined
}
```

---

### 2. Operador de Navegación Segura (`?.`)

Evalúa la expresión del lado izquierdo. Si el valor es `null` o `undefined`, **detiene inmediatamente la evaluación** y retorna `null` sin detener la ejecución de la aplicación.

```html
<!-- Evita colapsos de la vista si student.photo es undefined -->
<span>Longitud de la URL: {{ student.photo?.length }}</span>
```

---

### 3. Renderizado Condicional Preventivo

Combina el [Control Flow y Sintaxis de Plantillas](<05%20-%20Control%20Flow%20y%20Sintaxis%20de%20Plantillas.md>) (`@if`) con el operador opcional para evitar mostrar componentes vacíos o con imágenes rotas.

```html
<!-- Código del profesor -->
@if (student.photo) {
  <img [src]="student.photo" alt="Foto de estudiante">
} @else {
  <span>No hay foto disponible</span>
}
```

---

## Errores Comunes

- **Acceder a propiedades anidadas de variables no inicializadas:** Intentar leer `student.photo.length` cuando `photo` es indefinido romperá la aplicación en la consola del navegador.

## Buenas Prácticas

- Proteger el acceso a propiedades opcionales usando `?.` en las plantillas HTML.
- Proveer valores por defecto o bloques `@else` cuando la información sea opcional.

## Relación con otros conceptos

- Protege las plantillas en: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>)
- Se aplica sobre: [TypeScript en Angular e Interfaces vs Clases](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>)

## Preguntas de repaso

1. **Diagnóstico:** Dado el código `{{ user.address.street }}`, si `address` es nulo, ¿qué ocurre en la consola y cómo se soluciona usando el operador de navegación segura?
2. **Aplicación:** Escribe una interfaz de TypeScript para un Producto donde la descripción sea un campo opcional.

## Fuente

- **Clase:** Fundamentos de TypeScript, Tipado y Null Safety
- **Timestamp:** 33:00 - 48:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
