---
tags:
  - angular
  - arquitectura
  - estructura
aliases:
  - Anatomía del Proyecto
clase: Creación y Estructura de Proyecto en Angular 19
timestamp: 06:00 - 14:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Arquitectura y Anatomía de un Proyecto Angular

## Definición

Es la organización física de archivos y carpetas generada por [Angular CLI y Entorno Node](<02%20-%20Angular%20CLI%20y%20Entorno%20Node.md>) al inicializar un proyecto, junto con los archivos de configuración globales que rigen la compilación de TypeScript a JavaScript y el empaquetado de la aplicación.

## Estrategia de Creación

```bash
# Comando ejecutado por el profesor
ng new gestion-estudiantes
```

Opciones seleccionadas en la consola:

- ¿Preprocesador de estilos?: `SCSS`.
- ¿Server-Side Rendering (SSR)?: `No` (N).

---

## Anatomía del Proyecto

| Directorio / Archivo | Propósito y Función |
| --- | --- |
| `node_modules/` | Paquetes y librerías externas instaladas por npm. **Nunca** debe modificarse ni subirse a Git. |
| `public/` | Recursos estáticos (imágenes, favicons, fuentes). Reemplaza a la antigua carpeta `assets/`. |
| `src/` | Carpeta de código fuente principal. Contiene la lógica, vistas y estilos de la aplicación. |
| `src/index.html` | Archivo HTML raíz. Contiene la etiqueta contenedora principal `<app-root>`. |
| `src/main.ts` | Punto de entrada técnico que inicializa la aplicación Angular. |
| `angular.json` | Configuración global del workspace (rutas de estilos, prefijos de componentes, scripts). |
| `tsconfig.json` | Reglas de compilación del transpilador de TypeScript a JavaScript. |
| `package.json` | Lista de dependencias, versiones del proyecto y comandos de ejecucion (`scripts`). |
| `.gitignore` | Excluye archivos pesados o sensibles (como `node_modules/`) del control de versiones. |

---

## Errores Comunes

- **Modificar directamente archivos dentro de `node_modules/`:** Cualquier cambio se sobrescribirá al ejecutar `npm install` o al desplegar la aplicación.
- **Subir `node_modules/` a GitHub:** Provoca repositorios extremadamente pesados e ineficientes. Debe estar garantizado dentro del `.gitignore`.
- **Alterar `package-lock.json` manualmente:** Puede romper la resolución de versiones del proyecto.

## Buenas Prácticas

- Seleccionar preprocesadores de CSS avanzados como SCSS desde el inicio del proyecto.
- Mantener carpetas pesadas fuera del control de versiones asegurando un `.gitignore` correcto.

## Relación con otros conceptos

- Creado por: [Angular CLI y Entorno Node](<02%20-%20Angular%20CLI%20y%20Entorno%20Node.md>)
- Aloja: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>), [Binding de Propiedades y Recursos Staticos](<06%20-%20Binding%20de%20Propiedades%20y%20Recursos%20Staticos.md>) y [Servicios e Inyeccion de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué la carpeta `node_modules/` no debe incluirse en los repositorios de Git?
2. **Comparación:** En Angular 19, ¿cuál es la diferencia entre la carpeta `public/` y la antigua carpeta `assets/` de versiones previas?
3. **Diagnóstico:** Si la compilación de TypeScript no reconoce ciertas reglas de sintaxis, ¿cuál es el archivo de configuración que debe ser inspeccionado?

## Fuente

- **Clase:** Creación y Estructura de Proyecto en Angular 19
- **Timestamp:** 06:00 - 14:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
