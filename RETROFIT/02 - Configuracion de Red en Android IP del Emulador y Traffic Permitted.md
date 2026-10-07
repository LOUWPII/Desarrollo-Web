---
tags:
  - retrofit
  - android
  - red
aliases:
  - Configuración de Red en Android
  - IP del Emulador
  - Cleartext Traffic
  - 10.0.2.2
clase: Configuración de Red en Android, Redirección de IP del Emulador y Network Security Config
timestamp: ~05:00 - 10:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Configuración de Red en Android, IP del Emulador y Traffic Permitted

## Definición

Es el conjunto de declaraciones en manifiestos y políticas de seguridad XML necesarias para habilitar las comunicaciones HTTP/HTTPS en Android, considerando las restricciones de bucle local del emulador oficial de Android Studio.

## IP de Bucle Local del Emulador (`10.0.2.2`)

Cuando un servidor backend (como Express con Node.js) se ejecuta localmente en la máquina anfitriona (*host*) escuchando en `http://localhost:3000`:

- **Postman / Navegador Desktop:** Accede vía `http://localhost:3000`.
- **Emulador de Android:** `localhost` o `127.0.0.1` dentro del emulador hace referencia al propio dispositivo virtualizado. Para acceder al `localhost` de la máquina anfitriona, se debe usar estrictamente **[`http://10.0.2.2:3000`](http://10.0.2.2:3000)**.

---

## Exención de Tráfico Claro (*Cleartext Traffic Permitted*)

A partir de Android 9.0 (API Level 28), todo el tráfico HTTP no cifrado (`http://`) está bloqueado por defecto por la política de seguridad del sistema operativo. Para permitir comunicaciones de prueba en desarrollo local con `10.0.2.2`, se debe definir una exención explícita.

### 1. Archivo de Seguridad (`res/xml/network_security_config.xml`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
    </domain-config>
</network-security-config>

```

### 2. Registro en el Manifiesto (`AndroidManifest.xml`):

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Permiso obligatorio para acceder a la red -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:networkSecurityConfig="@xml/network_security_config"
        android:allowBackup="true"
        ...>
    </application>
</manifest>

```

---

## Errores Comunes

- ⚠️ **`UnknownServiceException`:** Omitir el archivo `network_security_config.xml` al intentar conectar a [`http://10.0.2.2:3000`](http://10.0.2.2:3000) provocará el error: `java.net.UnknownServiceException: CLEARTEXT communication to 10.0.2.2 not permitted by network security policy`.
- **Servidor apagado:** Intentar probar el cliente móvil con el backend de Node.js detenido provocará excepciones de conexión rehusada (*Connection Refused*).

## Buenas Prácticas

- Probar la conectividad previa abriendo el navegador Chrome interno del emulador y navegando hacia [`http://10.0.2.2:3000/tweets`](http://10.0.2.2:3000/tweets) antes de escribir código en Kotlin.

## Relación con otros conceptos

- Es el prerequisito para la instanciación de: [03 - Inyeccion de Retrofit con Dagger Hilt y AppModule](<03%20-%20Inyeccion%20de%20Retrofit%20con%20Dagger%20Hilt%20y%20AppModule.md>)
- Permite la ejecución de peticiones en: [05 - Servicios Retrofit Anotaciones HTTP e Implementacion de DataSources](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>)

## Preguntas de repaso

1. **Diagnóstico:** Si configuras Retrofit apuntando a `http://localhost:3000` en el emulador de Android, ¿por qué la petición falla inmediatamente?
2. **Aplicación:** Escribe la línea de permiso que debe agregarse a `AndroidManifest.xml` para permitir que la aplicación realice solicitudes HTTP.

## Fuente

- **Clase:** Configuración de Red en Android, Redirección de IP del Emulador y Network Security Config
- **Timestamp:** ~05:00 - 10:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
