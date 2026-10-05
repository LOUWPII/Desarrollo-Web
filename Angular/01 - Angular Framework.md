---
tags:
  - angular
  - fundamentos
  - framework
aliases:
  - Angular
  - Angular Framework
clase: Introducción y Conceptos Básicos de Angular
timestamp: 00:00 - 03:30
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Angular Framework

## Definición

**Angular** es un Framework de desarrollo web frontend de código abierto, mantenido y desarrollado por Google. Proporciona una solución completa para la construcción de Aplicaciones de Página Única (SPA - *Single Page Applications*), integrando herramientas nativas para enrutamiento, gestión del estado, formularios e inyección de dependencias.

## Intuición

Imagina que estás construyendo una casa. Una librería como React te entrega solo los ladrillos; tú debes buscar por tu cuenta la mezcla, las tuberías y el sistema eléctrico de distintos proveedores. Angular, en cambio, es una estructura prefabricada completa con planos, fontanería y cableado preinstalados: te impone una forma de construir, pero te garantiza que todas las piezas encajan perfectamente sin tener que configurar herramientas externas.

## ¿Para qué sirve?

- Construcción de aplicaciones web complejas a gran escala con arquitecturas estandarizadas.
- Creación de interfaces dinámicas y modulares mantenibles por equipos grandes.
- Desarrollo de aplicaciones donde la consistencia estructural y el tipado fuerte son prioritarios.

## ¿Cómo funciona?

Angular opera en el navegador del cliente (Frontend). Traduce código escrito en TypeScript a JavaScript estándar mediante compilación. Modifica el DOM (Document Object Model) de forma dinámica sin recargar la página completa, interactuando con servidores o bases de datos mediante arquitecturas de API REST (el navegador **nunca** se conecta directamente a la base de datos por razones de seguridad).

---

## Evolución Histórica

| Período / Versión | Nombre | Características Clave |
| --- | --- | --- |
| **2010** | **AngularJS (v1)** | Basado en JavaScript, arquitectura MVC, uso de `$scope`. Hoy totalmente obsoleto. |
| **2016** | **Angular 2+** | Reescritura total orientada a componentes y TypeScript. Rompió compatibilidad con v1. |
| **2023+ (v16/v17)** | **Angular Moderno** | Introducción de Signals, nuevo [Control Flow y Sintaxis de Plantillas](<05%20-%20Control%20Flow%20y%20Sintaxis%20de%20Plantillas.md>) y compilador optimizado. |
| **v19** | **Angular 19 (Clase)** | Sintaxis declarativa moderna, [Comunicacion entre Componentes (Inputs y Outputs)](<09%20-%20Comunicacion%20entre%20Componentes%20(Inputs%20y%20Outputs).md>) y [Formularios Reactivos y Validaciones](<13%20-%20Formularios%20Reactivos%20y%20Validaciones.md>). |

---

## Errores Comunes

- **Confundir AngularJS con Angular:** AngularJS (v1) está extinto. Usar sintaxis de 2010 en un proyecto moderno causará incompatibilidad absoluta.
- **Juzgar Angular por sus versiones antiguas:** Las versiones 2 a 14 requerían mucho código repetitivo (*boilerplate*); Angular 16+ redujo significativamente la complejidad.

## Buenas Prácticas

- Mantener el framework actualizado periódicamente.
- Respetar la separación entre la capa visual (Frontend) y la capa de persistencia (Backend).

## Relación con otros conceptos

- Depende de: TypeScript
- Es la base de: [Arquitectura y Anatomia de un Proyecto Angular](<03%20-%20Arquitectura%20y%20Anatomia%20de%20un%20Proyecto%20Angular.md>)
- Se organiza mediante: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>) y [Servicios e Inyeccion de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué un navegador web no debe conectarse directamente a una base de datos relacional desde el código Frontend?
2. **Comparación:** ¿En qué se diferencia el enfoque de desarrollo de un *Framework* como Angular frente al de una *Librería*?
3. **Diagnóstico:** Si encuentras un tutorial que utiliza `$scope` o directivas `ng-repeat`, ¿a qué versión de Angular pertenece y por qué no deberías usarlo?

## Fuente

- **Clase:** Introducción y Conceptos Básicos de Angular
- **Timestamp:** 00:00 - 03:30
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
