---
tags:
  - cloud-functions
  - serverless
  - desnormalizacion
  - firestore
aliases:
  - Cloud Functions Node.js
  - db.batch
  - Actualización en lote
clase: Backend Serverless con Firebase Cloud Functions (Node.js/JavaScript)
timestamp: ~67:00 - 83:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Backend Serverless con Cloud Functions y Solución a Desnormalización

## Definición

**Firebase Cloud Functions** es un entorno de ejecución *serverless* basado en Node.js que ejecuta código en la nube de forma automática frente a eventos de base de datos o autenticación. Resuelve el problema de la **pérdida de integridad histórica** por desnormalización mediante actualizaciones en lote (`db.batch()`).

## Solución al Cambio de Datos Desnormalizados

```text
 Evento: Usuario modifica su foto de perfil en users/{userId}
   │
   ▼
 Cloud Function: onDocumentUpdated("users/{userId}")
   │
   ▼ Detecta cambio en profileImage
 Consultar todos los tweets en tweets.where("userId", "==", userId)
   │
   ▼
 Actualización en Lote (db.batch()): Modifica "user.profileImage" en todos los tweets del usuario

```

---

## Implementación Técnica en Node.js (`functions/index.js`)

```javascript
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.updateUserInfoInTweets = onDocumentUpdated("users/{userId}", async (event) => {
    const userId = event.params.userId;
    const beforeData = event.data.before.data();
    const afterData = event.data.after.data();

    // Revisa si la foto de perfil sufrió cambios
    if (beforeData.profileImage === afterData.profileImage) return;

    // Busca los tweets del usuario
    const tweetsSnapshot = await db.collection("tweets")
        .where("userId", "==", userId)
        .get();

    const batch = db.batch();

    // Actualiza campos anidados utilizando la notación de punto entre comillas
    tweetsSnapshot.forEach((doc) => {
        batch.update(doc.ref, {
            "user.profileImage": afterData.profileImage
        });
    });

    await batch.commit();
});

```

---

## Errores Comunes

* ⚠️ **Sintaxis incorrecta en campos anidados:** Escribir `userProfileImage` en lugar de `"user.profileImage"` (notación con punto encerrada entre comillas). La primera buscará un campo en la raíz y no actualizará el objeto interno.

## Buenas Prácticas

* Usar `db.batch()` para agrupaciones de escrituras de hasta 500 documentos desde Cloud Functions, garantizando atomicidad y reduciendo la latencia de red.

## Relación con otros conceptos

* Corrige las consecuencias de la desnormalización aplicada en: [01 - Relaciones Muchos a Muchos en NoSQL Subcolecciones y Limite de 1 MB](<01%20-%20Relaciones%20Muchos%20a%20Muchos%20en%20NoSQL%20Subcolecciones%20y%20Limite%20de%201%20MB.md>)
* Se complementa con las funciones accionables para notificaciones descritas en: [09 - Notificaciones Push Personalizadas Dirigidas por Eventos en FCM](<09%20-%20Notificaciones%20Push%20Personalizadas%20Dirigidas%20por%20Eventos%20en%20FCM.md>)

## Preguntas de repaso

1. **Comprensión:** Explica cómo soluciona una Cloud Function la incoherencia de datos que se genera cuando un usuario cambia su información de perfil en una base NoSQL desnormalizada.
2. **Sintaxis:** ¿Cómo se debe referenciar un atributo anidado dentro de un objeto en Firestore al realizar una actualización desde Node.js?

## Fuente

* **Clase:** Backend Serverless con Firebase Cloud Functions (Node.js/JavaScript)
* **Timestamp:** ~67:00 - 83:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
