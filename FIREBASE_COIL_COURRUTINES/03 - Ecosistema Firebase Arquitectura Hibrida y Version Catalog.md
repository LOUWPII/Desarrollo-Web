---
tags:
  - firebase
  - gradle
  - version-catalog
  - arquitectura
aliases:
  - Firebase BaaS
  - Arquitectura Híbrida
  - Version Catalog
clase: Ecosistema Firebase, Arquitectura Híbrida / Configuración de Gradle y Version Catalog
timestamp: ~33:00 - 50:00 min (Parte 1)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Ecosistema Firebase, Arquitectura Híbrida y Version Catalog

## Definición

**Firebase** es una plataforma de infraestructura en la nube (*Backend-as-a-Service / BaaS*) administrada por Google. Para proyectos en producción se recomienda un enfoque de **Arquitectura Híbrida**, utilizando Firebase exclusivamente para servicios complejos (Autenticación, Notificaciones) y un backend propio para el CRUD masivo de datos.

## Justificación de la Arquitectura Híbrida

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                     Arquitectura Híbrida                    │
 ├──────────────────────────────┬──────────────────────────────┤
 │  Servicios Firebase (BaaS)   │  Backend Propio (API REST)   │
 ├──────────────────────────────┼──────────────────────────────┤
 │ - Firebase Auth (Seguridad)  │ - Almacenamiento PostgreSQL  │
 │ - Firebase Cloud Messaging   │ - CRUD masivo de bajo costo  │
 └──────────────────────────────┴──────────────────────────────┘

```

* **Riesgo de Escalabilidad en Firebase:** Los servicios de base de datos de Firebase (Firestore) cobran por volumen de lecturas y escrituras. En aplicaciones con alto tráfico de usuarios, los costos pueden escalar exponencialmente.
* **Ventaja de la Arquitectura Híbrida:** Garantiza la seguridad y rapidez del registro de usuarios mediante Firebase Auth, reduciendo drásticamente los costos operativos al servir las consultas principales desde un backend relacional (SQL / Node.js / Python).

---

## Centralización de Dependencias con Version Catalog (`libs.versions.toml`)

El **Version Catalog** es el estándar de Gradle para administrar bibliotecas, versiones y plugins en un único archivo estructurado:

```toml
# gradle/libs.versions.toml
[versions]
googleServices = "4.4.2"
firebaseBom = "33.0.2"
hilt = "2.51.1"

[libraries]
# Firebase Bill of Materials (BoM) centraliza las versiones compatibles
firebase-bom = { group = "com.google.firebase", name = "firebase-bom", version.ref = "firebaseBom" }
firebase-auth = { group = "com.google.firebase", name = "firebase-auth-ktx" }

[plugins]
google-services = { id = "com.google.gms.google-services", version.ref = "googleServices" }

```

---

## Configuración del Archivo `google-services.json`

El archivo `google-services.json` descargado desde Firebase Console contiene las claves de API e identificadores de proyecto. **Debe ubicarse estrictamente dentro del directorio `app/**` del proyecto de Android Studio (cambiando la vista del explorador a *Project*).

---

## Errores Comunes

* ⚠️ **Error de compilación por falta de `google-services.json`:** Omitir copiar el archivo en la carpeta `app/` provocará que el plugin de Google Services detenga la compilación de Gradle.

## Buenas Prácticas

* Utilizar siempre el Firebase BoM (*Bill of Materials*) para evitar declarar versiones individuales por cada módulo de Firebase y prevenir conflictos de librerías.

## Relación con otros conceptos

* Suministra la configuración requerida para inyectar servicios en: [04 - Inyeccion de Dependencias con Dagger Hilt en Clean Architecture](<04%20-%20Inyeccion%20de%20Dependencias%20con%20Dagger%20Hilt%20en%20Clean%20Architecture.md>)
* Provee la infraestructura utilizada en: [05 - Data Sources Repositorios y Autenticacion con Firebase Auth](<05%20-%20Data%20Sources%20Repositorios%20y%20Autenticacion%20con%20Firebase%20Auth.md>) y [07 - Photo Picker PickVisualMedia Uri y Firebase Storage](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué es recomendable implementar una Arquitectura Híbrida en lugar de basar la persistencia masiva de datos únicamente en Firestore.
2. **Aplicación:** ¿En qué ruta del proyecto de Android Studio se debe copiar el archivo `google-services.json`?

## Fuente

* **Clase:** Ecosistema Firebase, Arquitectura Híbrida / Configuración de Gradle y Version Catalog
* **Timestamp:** ~33:00 - 50:00 min (Parte 1)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
