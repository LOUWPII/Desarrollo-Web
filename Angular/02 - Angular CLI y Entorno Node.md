---
tags:
  - angular
  - cli
  - node
  - herramientas
aliases:
  - Angular CLI
clase: Instalación de Node.js, npm y Angular CLI
timestamp: 03:30 - 06:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Angular CLI y Entorno Node

## Definición

**Angular CLI** (*Command Line Interface*) es la herramienta oficial de línea de comandos para inicializar, desarrollar, scaffolding (generar código) y mantener aplicaciones de Angular. Depende directamente del entorno de ejecución **Node.js** y su gestor de paquetes **npm**.

## Intuición

Es el asistente personal de automatización para el desarrollador. En lugar de crear archivos a mano, configurar compiladores e importar manualmente librerías, le ejecutas un comando en la consola y la CLI crea las estructuras listas para usar sin cometer errores sintácticos.

## ¿Para qué sirve?

- Crear la estructura inicial de proyectos con configuraciones listas para producción.
- Iniciar servidores de desarrollo locales con recarga en vivo (*Hot Reload*).
- Generar [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>), [Servicios e Inyeccion de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>) e [Interfaces](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>).

## Sintaxis / Comandos

```bash
# Instalación global de la CLI en una versión específica (Código del profesor)
npm install -g @angular/cli@19

# Verificación de la instalación
ng version
```

---

## Errores Comunes

- **Instalar paquetes sin especificar versión:** Ejecutar `npm install -g @angular/cli` puede instalar versiones en desarrollo (*rc* o *next*) inestables.
- **Ejecutar comandos `ng` sin Node.js:** La consola lanzará un error de comando no encontrado si Node.js no está instalado en el sistema operativo.

## Buenas Prácticas

- Fijar la versión exacta de Angular CLI coincidente con la versión deseada para el proyecto (`@19`).
- Utilizar la documentación oficial en `angular.dev` para verificar la compatibilidad de comandos.

## Relación con otros conceptos

- Prerequisito: [Angular Framework](<01%20-%20Angular%20Framework.md>)
- Genera: [Arquitectura y Anatomia de un Proyecto Angular](<03%20-%20Arquitectura%20y%20Anatomia%20de%20un%20Proyecto%20Angular.md>)
- Ejecuta: [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>) y [Servicios e Inyeccion de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)

## Preguntas de repaso

1. **Aplicación:** ¿Qué comando debes ejecutar para instalar de forma global la CLI de Angular fijada en la versión 19?
2. **Diagnóstico:** Intentas ejecutar `ng new` pero la consola indica `ng: command not found`. ¿Cuáles son las dos causas probables de este fallo?

## Fuente

- **Clase:** Instalación de Node.js, npm y Angular CLI
- **Timestamp:** 03:30 - 06:00
---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
