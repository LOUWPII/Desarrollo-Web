---
tags:
  - firestore
  - cloud-functions
  - fcm
  - seguridad
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Firestore Avanzado
  - Índice Advanced Firestore
---

# Índice y Mapa de Conocimiento — Firestore Avanzado, Cloud Functions y FCM

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Relaciones Muchos a Muchos en NoSQL: Subcolecciones y Límite de 1 MB](<01%20-%20Relaciones%20Muchos%20a%20Muchos%20en%20NoSQL%20Subcolecciones%20y%20Limite%20de%201%20MB.md>) | Modelado N:M sin arreglos de IDs |
| 02 | [Transacciones Atómicas en Firestore: runTransaction e Incrementos](<02%20-%20Transacciones%20Atomicas%20en%20Firestore%20runTransaction%20e%20Incrementos.md>) | `runTransaction`, `FieldValue.increment()` |
| 03 | [Subconsultas de Comprobación de Estado: liked y followed en UI](<03%20-%20Subconsultas%20de%20Comprobacion%20de%20Estado%20liked%20y%20followed%20en%20UI.md>) | Banderas booleanas en DTOs/Compose |
| 04 | [Subcolecciones Espejo: followers y following para Sistema de Seguimiento](<04%20-%20Subcolecciones%20Espejo%20followers%20y%20following%20para%20Sistema%20de%20Seguimiento.md>) | 4 operaciones atómicas de follow |
| 05 | [Flujos Reactivos en Tiempo Real con callbackFlow y addSnapshotListener](<05%20-%20Flujos%20Reactivos%20en%20Tiempo%20Real%20con%20callbackFlow%20y%20addSnapshotListener.md>) | `Flow`, `awaitClose`, consumo en ViewModel |
| 06 | [Análisis de Costos, Degradación de Feed y Teoría Live Location](<06%20-%20Analisis%20de%20Costos%20Degradacion%20de%20Feed%20y%20Teoria%20Live%20Location.md>) | Escuchas activas vs. `get()` |
| 07 | [Backend Serverless con Cloud Functions y Solución a Desnormalización](<07%20-%20Backend%20Serverless%20con%20Cloud%20Functions%20y%20Solucion%20a%20Desnormalizacion.md>) | `onDocumentUpdated`, `db.batch()` |
| 08 | [Configuración de FCM, Permisos en API 33+ y Captura de Token](<08%20-%20Configuracion%20de%20FCM%20Permisos%20API%2033%20y%20Captura%20de%20Token.md>) | `POST_NOTIFICATIONS`, FCM Token |
| 09 | [Notificaciones Push Personalizadas Dirigidas por Eventos en FCM](<09%20-%20Notificaciones%20Push%20Personalizadas%20Dirigidas%20por%20Eventos%20en%20FCM.md>) | `onDocumentCreated` + Admin SDK |
| 10 | [Reglas de Seguridad en Firestore: Validaciones Granulares y request auth](<10%20-%20Reglas%20de%20Seguridad%20en%20Firestore%20Validaciones%20Granulares%20y%20request%20auth.md>) | `firestore.rules`, Test Mode |

---

## 2. Mapa de Conocimiento

```text
Ecosistema Avanzado de Firestore, Cloud Functions y FCM
├── Modelado NoSQL, Transacciones y Estado Visual
│   ├── Subcolecciones y Límite de 1 MB (01)
│   ├── Transacciones Atómicas con runTransaction (02)
│   ├── Subconsultas de Estado liked y followed (03)
│   └── Subcolecciones Espejo followers/following (04)
│
├── Reactividad, Flujos y Análisis Económico
│   ├── Flujos en Tiempo Real con callbackFlow (05)
│   └── Análisis de Costos y Teoría Live Location (06)
│
└── Infrastructure Serverless, Push Notifications y Seguridad
    ├── Cloud Functions y Solución a Desnormalización (07)
    ├── Configuración de FCM y Permisos API 33+ (08)
    ├── Notificaciones Push Dirigidas por Eventos (09)
    └── Reglas de Seguridad en Firestore (10)

```

### Explicación de la Relación entre los Conceptos

El ecosistema inicia resolviendo relaciones N:M mediante **Subcolecciones y Límite de 1 MB** ([01](<01%20-%20Relaciones%20Muchos%20a%20Muchos%20en%20NoSQL%20Subcolecciones%20y%20Limite%20de%201%20MB.md>)), asegurando consistencia con **Transacciones Atómicas** ([02](<02%20-%20Transacciones%20Atomicas%20en%20Firestore%20runTransaction%20e%20Incrementos.md>)), pintando la interfaz mediante **Subconsultas de Estado** ([03](<03%20-%20Subconsultas%20de%20Comprobacion%20de%20Estado%20liked%20y%20followed%20en%20UI.md>)) y construyendo redes de usuarios con **Subcolecciones Espejo** ([04](<04%20-%20Subcolecciones%20Espejo%20followers%20y%20following%20para%20Sistema%20de%20Seguimiento.md>)).

La capa reactiva conecta eventos en vivo mediante **`callbackFlow`** ([05](<05%20-%20Flujos%20Reactivos%20en%20Tiempo%20Real%20con%20callbackFlow%20y%20addSnapshotListener.md>)), cuyo uso se evalúa en el **Análisis de Costos y Teoría Live Location** ([06](<06%20-%20Analisis%20de%20Costos%20Degradacion%20de%20Feed%20y%20Teoria%20Live%20Location.md>)).

Finalmente, la infraestructura se sostiene en la nube con **Cloud Functions** ([07](<07%20-%20Backend%20Serverless%20con%20Cloud%20Functions%20y%20Solucion%20a%20Desnormalizacion.md>)), integrando notificaciones a través de la **Configuración de FCM y Permisos** ([08](<08%20-%20Configuracion%20de%20FCM%20Permisos%20API%2033%20y%20Captura%20de%20Token.md>)), automatizando alertas con **Notificaciones Push Dirigidas** ([09](<09%20-%20Notificaciones%20Push%20Personalizadas%20Dirigidas%20por%20Eventos%20en%20FCM.md>)) y blindando el servidor con **Reglas de Seguridad** ([10](<10%20-%20Reglas%20de%20Seguridad%20en%20Firestore%20Validaciones%20Granulares%20y%20request%20auth.md>)).

---

## 3. Lo Esencial

1. **Subcolecciones NoSQL:** Salvan el límite de 1 MB por documento y aíslan subconsultas pesadas.
2. **Atomicidad con `runTransaction`:** Ejecuta operaciones de lectura, creación, borrado e incrementos de forma unificada con *rollback* automático.
3. **Escuchas Reactivas (`callbackFlow`):** Transforman `addSnapshotListener` en flujos `Flow`, exigiendo `awaitClose` para prevenir fugas de memoria.
4. **Análisis Financiero:** Los *listeners* en tiempo real para *feeds* masivos incrementan los costos exponencialmente; los *feeds* principales deben usar recargas manuales.
5. **Serverless con Cloud Functions:** Resuelven la falta de integridad por desnormalización modificando documentos en lote (`db.batch()`).
6. **Notificaciones Push (FCM):** Requieren solicitar permisos dinámicos en Android 13+ (`POST_NOTIFICATIONS`) y persistir el `fcmToken` del usuario.
7. **Reglas de Seguridad:** Validan en el servidor la autenticación (`request.auth`) y las restricciones del modelo (`request.resource.data`).

---

## 4. Debo Saber Hacer

- [ ] Estructurar subcolecciones para relaciones N:M (ej. `tweets/{id}/likes/{userId}`). → [01](<01%20-%20Relaciones%20Muchos%20a%20Muchos%20en%20NoSQL%20Subcolecciones%20y%20Limite%20de%201%20MB.md>)
- [ ] Implementar transacciones con `database.runTransaction` e incrementos con `FieldValue.increment()`. → [02](<02%20-%20Transacciones%20Atomicas%20en%20Firestore%20runTransaction%20e%20Incrementos.md>)
- [ ] Inyectar propiedades de estado (`liked`, `followed`) en modelos mediante subconsultas livianas. → [03](<03%20-%20Subconsultas%20de%20Comprobacion%20de%20Estado%20liked%20y%20followed%20en%20UI.md>)
- [ ] Crear el sistema de seguimiento atómico de 4 operaciones entre `following` y `followers`. → [04](<04%20-%20Subcolecciones%20Espejo%20followers%20y%20following%20para%20Sistema%20de%20Seguimiento.md>)
- [ ] Envolver un `addSnapshotListener` dentro de un `callbackFlow` finalizado con `awaitClose`. → [05](<05%20-%20Flujos%20Reactivos%20en%20Tiempo%20Real%20con%20callbackFlow%20y%20addSnapshotListener.md>)
- [ ] Crear y desplegar Cloud Functions en Node.js usando `firebase-tools`. → [07](<07%20-%20Backend%20Serverless%20con%20Cloud%20Functions%20y%20Solucion%20a%20Desnormalizacion.md>)
- [ ] Actualizar datos anidados en lote usando `db.batch()` y la notación de punto (`"user.profileImage"`). → [07](<07%20-%20Backend%20Serverless%20con%20Cloud%20Functions%20y%20Solucion%20a%20Desnormalizacion.md>)
- [ ] Solicitar el permiso `POST_NOTIFICATIONS` en Android 13+ con `rememberLauncherForActivityResult`. → [08](<08%20-%20Configuracion%20de%20FCM%20Permisos%20API%2033%20y%20Captura%20de%20Token.md>)
- [ ] Capturar el token FCM con `FirebaseMessaging.getInstance().token.await()`. → [08](<08%20-%20Configuracion%20de%20FCM%20Permisos%20API%2033%20y%20Captura%20de%20Token.md>)
- [ ] Escribir reglas de seguridad granulares en Firestore validando `request.auth` y campos del documento. → [10](<10%20-%20Reglas%20de%20Seguridad%20en%20Firestore%20Validaciones%20Granulares%20y%20request%20auth.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Guardar listas infinitas de IDs en arreglos dentro del documento** | Excede el límite de 1 MB | [01](<01%20-%20Relaciones%20Muchos%20a%20Muchos%20en%20NoSQL%20Subcolecciones%20y%20Limite%20de%201%20MB.md>) |
| **Omitir `awaitClose` en `callbackFlow`** | Mantiene escuchas activas produciendo fugas de memoria y cobros por lecturas innecesarias | [05](<05%20-%20Flujos%20Reactivos%20en%20Tiempo%20Real%20con%20callbackFlow%20y%20addSnapshotListener.md>) |
| **Usar *listeners* en tiempo real para el feed principal** | Genera cobros excesivos por lecturas cruzadas masivas | [06](<06%20-%20Analisis%20de%20Costos%20Degradacion%20de%20Feed%20y%20Teoria%20Live%20Location.md>) |
| **Usar notaciones sin comillas para objetos anidados en Node.js** | Escribir `userProfileImage` en vez de `"user.profileImage"` | [07](<07%20-%20Backend%20Serverless%20con%20Cloud%20Functions%20y%20Solucion%20a%20Desnormalizacion.md>) |
| **Diferir en el nombre de las claves de token** | Guardar `fcmToken` en Firestore y consultar `fcmtoken` en Cloud Functions | [09](<09%20-%20Notificaciones%20Push%20Personalizadas%20Dirigidas%20por%20Eventos%20en%20FCM.md>) |
| **Confiar únicamente en validaciones de UI** | Exponer la base de datos sin Reglas de Seguridad en el servidor | [10](<10%20-%20Reglas%20de%20Seguridad%20en%20Firestore%20Validaciones%20Granulares%20y%20request%20auth.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / NoSQL)** Explica por qué guardar arreglos dinámicos dentro de un documento de Firestore es un anti-patrón y cómo lo solucionan las subcolecciones.
2. **(Aplicación / Transacciones)** Escribe el bloque de código de una transacción en Firestore que borre un *like* y decremente el contador `likesCount` atómicamente.
3. **(Diagnóstico / Corrutinas)** ¿Qué consecuencia técnica ocurre si omites la llamada `awaitClose { listener.remove() }` dentro de un `callbackFlow`?
4. **(Análisis / Costos)** ¿Por qué aplicaciones como X o Instagram no utilizan *listeners* en tiempo real para sus pantallas principales de contenido?
5. **(Diseño / Serverless)** Explica cómo una Cloud Function permite mantener la coherencia de la foto de perfil en los tweets pasados de un usuario sin saturar al cliente móvil.
6. **(Seguridad / Firestore)** Escribe una regla de seguridad en Firestore que permita la escritura en la colección `tweets` únicamente si el usuario está autenticado y el campo `content` tiene menos de 200 caracteres.
