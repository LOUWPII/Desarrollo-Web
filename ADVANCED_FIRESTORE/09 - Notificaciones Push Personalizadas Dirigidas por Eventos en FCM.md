---
tags:
  - fcm
  - cloud-functions
  - notificaciones
  - follow
aliases:
  - Push dirigida por eventos
  - Notificación de nuevo seguidor
  - Admin SDK Messaging
clase: Notificación Push Personalizada al Recibir un Follow mediante Cloud Functions
timestamp: ~101:00 - 107:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Notificaciones Push Personalizadas Dirigidas por Eventos en FCM

## Definición

Es la combinación de un disparador de creación en Firestore (`onDocumentCreated`), la consulta del `fcmToken` del usuario receptor y el envío de mensajes mediante el **Admin SDK de Firebase Messaging** para entregar notificaciones *push* automáticas a dispositivos específicos.

## Flujo de Ejecución al Recibir un Seguidor

```text
 Evento: Usuario B (followerId) sigue al Usuario A (userId)
   │
   ▼ Creación de documento
 Firestore: users/{userId}/followers/{followerId}
   │
   ▼ Dispara la Cloud Function
 Cloud Function: onDocumentCreated("users/{userId}/followers/{followerId}")
   │
   ├─► Consultar users/{userId}  ──► Obtiene targetToken (fcmToken)
   ├─► Consultar users/{followerId} ──► Obtiene followerName ("Pedro")
   │
   ▼ Construir y enviar mensaje FCM
 admin.messaging().send({
     token: targetToken,
     notification: { title: "Nuevo seguidor", body: "Pedro ha comenzado a seguirte." }
 })

```

---

## Implementación Técnica (`functions/index.js`)

```javascript
exports.sendFollowNotification = onDocumentCreated(
    "users/{userId}/followers/{followerId}",
    async (event) => {
        const userId = event.params.userId;
        const followerId = event.params.followerId;

        // 1. Obtener FCM Token del destinatario
        const userDoc = await db.collection("users").doc(userId).get();
        if (!userDoc.exists) return;
        const targetToken = userDoc.data().fcmToken;

        if (!targetToken) return;

        // 2. Obtener nombre del seguidor
        const followerDoc = await db.collection("users").doc(followerId).get();
        const followerName = followerDoc.exists ? followerDoc.data().username : "Alguien";

        // 3. Construir payload
        const message = {
            token: targetToken,
            notification: {
                title: "Nuevo seguidor",
                body: `${followerName} ha comenzado a seguirte.`
            }
        };

        // 4. Enviar mediante Admin SDK
        try {
            await admin.messaging().send(message);
            logger.log(`Notificación enviada a ${userId}`);
        } catch (error) {
            logger.error("Error enviando notificación:", error);
        }
    }
);

```

---

## Errores Comunes

* ⚠️ **Diferencias de mayúsculas/minúsculas en la clave del token (`fcmToken` vs `fcmtoken`):** La variable en Node.js resultará `undefined` y el mensaje no se enviará.

## Buenas Prácticas

* Validar siempre la existencia del `targetToken` antes de intentar enviar el mensaje con `admin.messaging().send()` para evitar excepciones runtime en la función.

## Relación con otros conceptos

* Se activa a partir de las subcolecciones creadas en: [04 - Subcolecciones Espejo followers y following para Sistema de Seguimiento](<04%20-%20Subcolecciones%20Espejo%20followers%20y%20following%20para%20Sistema%20de%20Seguimiento.md>)
* Utiliza los tokens persistidos en: [08 - Configuracion de FCM Permisos API 33 y Captura de Token](<08%20-%20Configuracion%20de%20FCM%20Permisos%20API%2033%20y%20Captura%20de%20Token.md>)

## Preguntas de repaso

1. **Comprensión:** Explica el proceso completo para enviar una notificación push dirigida a un usuario específico cuando este recibe un nuevo seguidor.
2. **Diagnóstico:** Si la Cloud Function se ejecuta sin lanzar errores pero no llega la notificación, ¿qué propiedad del documento del usuario debes inspeccionar?

## Fuente

* **Clase:** Notificación Push Personalizada al Recibir un Follow mediante Cloud Functions
* **Timestamp:** ~101:00 - 107:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
