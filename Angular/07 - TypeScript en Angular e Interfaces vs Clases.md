---
tags:
  - angular
  - typescript
  - interfaces
aliases:
  - Interface vs Class
  - Modelos de Datos
clase: Fundamentos de TypeScript, Tipado, Interfaces vs Clases
timestamp: 33:00 - 48:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# TypeScript en Angular e Interfaces vs Clases

## Definición

**TypeScript** es un superserie de JavaScript desarrollado por Microsoft que añade tipado estático fuertemente tipado. En Angular se utiliza para definir los modelos de datos de la aplicación mediante **Interfaces** o **Clases**.

## Tipado y el Peligro del Tipo `any`

TypeScript exige especificar o inferir el tipo de dato de las variables para prevenir errores durante la compilación.

```typescript
// Inferencia automática de tipo (string)
let username = 'Juan Angarita';

// Tipado explícito (Buena práctica)
let userAge: number = 25;

// ⚠️ MALA PRÁCTICA: Tipo any ("El comodín de los perezosos")
let data: any = 'Respuesta';
data = 100; // Anula las comprobaciones de TypeScript y genera fallos en producción
```

---

## Tabla Comparativa: Interface vs Class

| Criterio | Interface (`interface`) | Class (`class`) |
| --- | --- | --- |
| **Generación de código JS** | **No** (Peso 0 en el build final). | **Sí** (Permanece en el archivo compilado). |
| **Instanciación (`new`)** | No se puede instanciar con `new`. | Sí se instancia mediante `new ClassName()`. |
| **Uso en Angular** | **Recomendado para DTOs y modelos de datos.** | Recomendado cuando se requiere lógica interna o POO. |

---

## Implementación de Modelos (Código del profesor)

### Modelo basado en Interfaz (`src/app/models/student.model.ts`):

```typescript
export interface Student {
  id: number;
  name: string;
  age: number;
  semester: number;
  email: string;
  gpa: number;
  credits: number;
  photo?: string; // Atributo opcional
}
```

### Modelo basado en Clase equivalente (`src/app/models/student-class.model.ts`):

```typescript
export class StudentClass {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public semester: number,
    public email: string,
    public gpa: number,
    public credits: number,
    public photo?: string
  ) {}
}
```

---

## Errores Comunes

- **Abusar del tipo `any`:** Invalida el propósito de usar TypeScript y oculta errores de tipo hasta que la aplicación falla en tiempo de ejecución.
- **Intentar hacer `new Student()` sobre una interfaz:** Lanza un error syntax ya que las interfaces no existen en tiempo de ejecución de JavaScript.

## Buenas Prácticas

- Usar preferentemente `export interface` para definir las estructuras de datos que provienen de APIs o de la lógica de negocio.
- Tipar explícitamente los datos devueltos por funciones y componentes.

## Relación con otros conceptos

- Fundamento de: [Angular Framework](<01%20-%20Angular%20Framework.md>)
- Modela datos para: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>) y [Servicios e Inyeccion de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)
- Complementa: [Null Safety y Operador Opcional](<08%20-%20Null%20Safety%20y%20Operador%20Opcional.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué una interfaz en TypeScript tiene un costo de cero bytes en la compilación final?
2. **Comparación:** ¿Cuándo deberías definir una `interface` y cuándo una `class` para representar datos en Angular?
3. **Diagnóstico:** ¿Por qué el uso indiscriminado de `any` es considerado una deuda técnica grave en un proyecto frontend?

## Fuente

- **Clase:** Fundamentos de TypeScript, Tipado, Interfaces vs Clases
- **Timestamp:** 33:00 - 48:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
