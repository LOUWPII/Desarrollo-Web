---
tags:
  - angular
  - binding
  - assets
aliases:
  - Property Binding
  - Recursos Estáticos
clase: Property Binding e Imágenes Estáticas
timestamp: 28:00 - 33:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Binding de Propiedades y Recursos Estáticos

## Definición

El **Property Binding** (Vinculación de Propiedades) es el mecanismo mediante el cual se enlaza el valor de una propiedad en el archivo TypeScript con un atributo de un elemento HTML mediante el uso de corchetes cuadrados `[...]`. La gestión de **Recursos Estáticos** se refiere al almacenamiento e inclusión de archivos locales (imágenes, fuentes) en la aplicación.

## Regla Mnemotécnica de Vinculación

- `[atributo]="variableTS"` ➔ **Corchetes cuadrados = Entrada de Datos (Property Binding)**.
- `atributo="texto_literal"` ➔ **Sin corchetes = Cadena estática**.

---

## Implementación de Property Binding

### En TypeScript (`app.component.ts`):

```typescript
// Código del profesor
export class AppComponent {
  ancho = 100;
  alto = 100;
}
```

### En Plantilla HTML (`app.component.html`):

```html
<!-- Property binding dinámico (evalúa variables de TS) -->
<img [src]="student.photo" [width]="ancho" [height]="alto" alt="Foto del estudiante">

<!-- Atributo literal de HTML (texto fijo) -->
<img src="/images/logo.png" height="50" alt="Logo de la institución">
```

---

## Manejo de Recursos Estáticos (Carpeta `public/`)

En Angular 19, todos los archivos estáticos se almacenan dentro de la carpeta raíz `/public`.

- **Ubicación en disco:** `public/images/logo.png`
- **Ruta de consumo en HTML:** `/images/logo.png` (No utilizar rutas relativas complejas como `../../public/`).

---

## Errores Comunes

- **Confundir evaluación de variables:** Escribir `<img src="student.photo">` sin corchetes hará que la imagen intente cargar literalmente la URL textual `"student.photo"`.
- **Usar la carpeta `src/assets/` en proyectos modernos:** Angular 19 estandarizó el uso directo de la carpeta `public/`.

## Buenas Prácticas

- Usar Property Binding siempre que los atributos HTML dependan de estados dinámicos del componente.
- Organizar los activos visuales dentro de subcarpetas temáticas dentro de `public/` (ej. `public/images/`, `public/icons/`).

## Relación con otros conceptos

- Modifica atributos de: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>)
- Ubicación de archivos: [Arquitectura y Anatomia de un Proyecto Angular](<03%20-%20Arquitectura%20y%20Anatomia%20de%20un%20Proyecto%20Angular.md>)

## Preguntas de repaso

1. **Comparación:** ¿Qué diferencia existe entre `<img src="foto">` e `<img [src]="foto">`?
2. **Aplicación:** ¿Cómo se debe hacer referencia a una imagen guardada en `public/images/avatar.png` desde una plantilla HTML?

## Fuente

- **Clase:** Property Binding e Imágenes Estáticas
- **Timestamp:** 28:00 - 33:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
