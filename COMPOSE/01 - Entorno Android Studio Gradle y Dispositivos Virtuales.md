---
tags:
  - compose
  - android
  - gradle
  - entorno
aliases:
  - Android Studio
  - Gradle
  - Device Manager
clase: Configuración del Proyecto y Entorno en Android Studio / Gestión de Emuladores / Estructura del Proyecto
timestamp: ~00:00 - 15:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Entorno Android Studio, Gradle y Dispositivos Virtuales

## Definición

Es el conjunto de herramientas, configuraciones e infraestructura requeridas para crear, compilar y ejecutar aplicaciones de Android basadas en Jetpack Compose. Incluye el Entorno de Desarrollo Integrado (**Android Studio**), el sistema de automatización de construcción (**Gradle**) y la gestión de dispositivos de prueba (**Device Manager / AVDs**).

## Reglas Críticas de Configuración de Proyecto

1. **Rutas y Nombres de Archivos:** Las rutas de carpetas y los nombres de proyectos no deben contener **espacios ni tildes/caracteres especiales**. Las carpetas sincronizadas en servicios en la nube (como OneDrive o Google Drive) causan fallos de compilación en Gradle debido a los caracteres en sus rutas.
2. **Plantilla de Proyecto:** Para proyectos modernos en Compose se selecciona **Empty Activity**, descartando plantillas legacy basadas en archivos XML.
3. **SDK Mínimo (*Minimum SDK*):** Se recomienda la **API 26 (Android 8.0 Oreo)**, la cual asegura una cobertura superior al 97% de los dispositivos activos a nivel global.

---

## Gestión Eficiente del Device Manager (AVD)

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                      Device Manager                         │
 ├─────────────────────────────────────────────────────────────┤
 │ - Preferir dispositivos de gama media/baja (ej. Pixel 6a).  │
 │ - Evitar modelos insignia (Pixel 9 Pro XL) en desarrollo.   │
 │ - Liberación de RAM: Apagar explícitamente con la acción    │
 │   'Stop' en lugar de solo cerrar la ventana flotante.       │
 └─────────────────────────────────────────────────────────────┘

```

---

## Vistas del Proyecto en el Panel Lateral

* **Vista Android:** Filtra y organiza únicamente los archivos fuente relevantes (`manifests`, `java/kotlin`, `res`). Es la vista recomendada durante el desarrollo.
* **Vista Project:** Muestra la jerarquía física real de archivos tal como está almacenada en el disco duro.

---

## Errores Comunes

* ⚠️ **Sintaxis de Gradle desactualizada:** Copiar scripts de Gradle generados por IAs o foros antiguos sin verificar la versión del proyecto puede romper la sincronización del build.
* **Congelamiento de RAM por múltiples AVDs:** Mantener múltiples emuladores encendidos agota la memoria del equipo anfitrión.

## Buenas Prácticas

* Guardar los proyectos siempre en la raíz del disco (ejemplo: `C:/Desarrollo/Android/TwitterFalso`) para garantizar rutas limpias sin espacios.

## Relación con otros conceptos

* Crea la infraestructura para compilar: [02 - Composables Previews y Unidades de Medida](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>)
* Administra los recursos guardados en: [03 - Layouts Basicos Column Row Box y Recursos R](<03%20-%20Layouts%20Basicos%20Column%20Row%20Box%20y%20Recursos%20R.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué guardar un proyecto en una ruta con espacios o tildes puede interrumpir el proceso de construcción de Gradle?
2. **Aplicación:** ¿Qué acción debes realizar en el Device Manager para asegurar que la memoria RAM ocupada por un emulador sea liberada en tu computadora?

## Fuente

* **Clase:** Configuración del Proyecto y Entorno en Android Studio / Gestión de Emuladores / Estructura del Proyecto
* **Timestamp:** ~00:00 - 15:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
