---
tags:
  - rxjs
  - node
  - entorno
aliases:
  - Entorno de Desarrollo Local para RxJS
clase: Configuración del Entorno de Desarrollo Local
timestamp: 18:00 - 21:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Entorno de Desarrollo Local para RxJS

## Definición

Es la configuración básica del entorno de desarrollo que permite ejecutar y probar scripts de [RxJS](<01%20-%20Programacion%20Reactiva%20y%20Patron%20Observer.md>) fuera del navegador web, utilizando el motor de ejecución **Node.js** y el gestor de paquetes **npm**.

## Instalación y Comandos

```bash
# Verificación de la instalación de Node.js (Código del profesor)
node --version

# Inicialización de un proyecto Node (genera el archivo package.json)
npm init -y

# Instalación de la biblioteca RxJS en el proyecto
npm install rxjs

# Ejecución de un script de JavaScript directamente en la consola
node 01.index.js
```

---

## Anatomía de Archivos

- `package.json`: Archivo de configuración que declara las dependencias instaladas (como `rxjs`) y los scripts de ejecución.
- `node_modules/`: Carpeta que contiene el código fuente físico de la librería RxJS descargada por npm.

---

## Errores Comunes

- **Intentar ejecutar `npm` sin instalar Node.js:** La consola lanzará un error indicando que el comando no existe.
- **Ejecutar `node` fuera de la carpeta del proyecto:** Provocará un error de importación al no encontrar el directorio `node_modules`.

## Buenas Prácticas

- Probar operadores y flujos complejos en archivos aislados de Node.js antes de integrarlos en aplicaciones pesadas de Angular.

## Relación con otros conceptos

- Entorno para ejecutar: [04 - Anatomia del Observable y Suscriptor](<04%20-%20Anatomia%20del%20Observable%20y%20Suscriptor.md>) y [05 - Operadores de Creacion de Observables](<05%20-%20Operadores%20de%20Creacion%20de%20Observables.md>)

## Preguntas de repaso

1. **Aplicación:** Escribe la secuencia de comandos de terminal necesaria para crear un proyecto ejecutable con Node.js e instalar la librería RxJS.

## Fuente

- **Clase:** Configuración del Entorno de Desarrollo Local
- **Timestamp:** 18:00 - 21:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
