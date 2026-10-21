---
tags:
  - fcm
  - notificaciones
  - android
  - permisos
aliases:
  - POST_NOTIFICATIONS
  - FCM Token
  - Permisos API 33
clase: Envío de Notificaciones Push con Firebase Cloud Messaging (FCM)
timestamp: ~83:00 - 101:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Configuración de FCM, Permisos en API 33+ y Captura de Token

## Definición

**Firebase Cloud Messaging (FCM)** es el servicio para enviar notificaciones *push* a dispositivos móviles. En Android 13+ (API 33), requiere solicitar dinámicamente el permiso **`POST_NOTIFICATIONS`** en tiempo de ejecución y capturar la clave alfanumérica única (**FCM Token**) para asociarla al usuario en Firestore.

## Flujo de Integración de Notificaciones Push

```text
 1. Configurar AndroidManifest.xml (<uses-permission android:name="...POST_NOTIFICATIONS" />)
 2. Solicitar permiso en Compose (rememberLauncherForActivityResult)
 3. Obtener Token: FirebaseMessaging.getInstance().token.await()
 4. Persistir en Firestore: users/{userId} -> fcmToken: "eK9zX..."

```

---

## Solicitud Dinámica de Permisos en Jetpack Compose

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
    val permissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            // Permiso concedido
        }
    }

    LaunchedEffect(Unit) {
        permissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
    }
}

```

---

## Captura y Guardado del Token FCM

```kotlin
// Captura asíncrona del token del dispositivo
val fcmToken = FirebaseMessaging.getInstance().token.await()

// Se guarda dentro del documento del usuario en Firestore
database.collection("users").document(userId)
    .update("fcmToken", fcmToken).await()

```

---

## Errores Comunes

* ⚠️ **Probar notificaciones en primer plano sin configurar canales de notificación visual:** Las notificaciones push genéricas enviadas desde la consola de Firebase solo se despliegan automáticamente en la barra de estado si la app está en segundo plano o cerrada.

## Buenas Prácticas

* Actualizar el `fcmToken` en Firestore cada vez que el usuario inicie sesión o la aplicación se abra, previniendo tokens expirados tras reinstalaciones.

## Relación con otros conceptos

* Suministra la clave de destino utilizada por las funciones descritas en: [09 - Notificaciones Push Personalizadas Dirigidas por Eventos en FCM](<09%20-%20Notificaciones%20Push%20Personalizadas%20Dirigidas%20por%20Eventos%20en%20FCM.md>)

## Preguntas de repaso

1. **Comprensión:** Explica los pasos necesarios para solicitar el permiso de notificaciones en Android 13 (API 33+) usando Jetpack Compose.
2. **Aplicación:** Escribe el bloque de código para obtener el FCM Token de un dispositivo con corrutinas.

## Fuente

* **Clase:** Envío de Notificaciones Push con Firebase Cloud Messaging (FCM)
* **Timestamp:** ~83:00 - 101:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
