---
tags:
  - firestore
  - seguridad
  - reglas
  - request-auth
aliases:
  - firestore.rules
  - Reglas granulares
  - Test Mode 30 días
clase: Reglas de Seguridad en Firestore
timestamp: ~107:00 - 113:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Reglas de Seguridad en Firestore: Validaciones Granulares y `request.auth`

## Definición

Las **Reglas de Seguridad en Firestore** constituyen un lenguaje declarativo de control de acceso ejecutado en los servidores de Firebase. Validan la autenticación del usuario (`request.auth`) y la integridad del contenido enviado (`request.resource.data`), previniendo inyecciones de datos corruptos o accesos no autorizados.

## Reglas de Seguridad Globales vs. Granulares

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                      Tipos de Reglas                        │
 ├──────────────────────────────┬──────────────────────────────┤
 │      Regla Global (Auth)     │   Regla Granular por Colección│
 ├──────────────────────────────┼──────────────────────────────┤
 │ Valida que el cliente esté   │ Restringe tamaño de texto,   │
 │ autenticado en la app.       │ tipos de datos e id del autor│
 └──────────────────────────────┴──────────────────────────────┘

```

---

## Configuración de Reglas (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 1. Regla Global: Bloquea acceso anónimo
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // 2. Regla Granular para la colección 'tweets'
    match /tweets/{tweetId} {
      allow write: if request.auth != null
                   // Longitud del tweet menor a 200 caracteres
                   && request.resource.data.content.size() < 200
                   // El userId del documento debe ser el UID del usuario autenticado
                   && request.resource.data.userId == request.auth.uid
                   // likesCount debe ser entero positivo o cero
                   && request.resource.data.likesCount is int
                   && request.resource.data.likesCount >= 0;
    }
  }
}

```

---

## Expiración del Modo de Prueba (*Test Mode*)

El modo de prueba inicial expira automáticamente a los **30 días**. Si no se definen reglas explícitas antes del vencimiento, la base de datos bloqueará todas las operaciones de lectura y escritura.

---

## Errores Comunes

* ⚠️ **Confiar únicamente en validaciones de la interfaz visual en Android:** Usuarios maliciosos pueden omitir la app e interactuar directamente con la API REST de Firestore, inyectando datos inválidos si no se definen Reglas de Seguridad en el servidor.

## Buenas Prácticas

* Validar siempre que `request.resource.data.userId == request.auth.uid` en operaciones de creación para evitar la suplantación de identidad en documentos.

## Relación con otros conceptos

* Protege las colecciones y subcolecciones estructuradas en: [01 - Relaciones Muchos a Muchos en NoSQL Subcolecciones y Limite de 1 MB](<01%20-%20Relaciones%20Muchos%20a%20Muchos%20en%20NoSQL%20Subcolecciones%20y%20Limite%20de%201%20MB.md>)
* Aplica las reglas sobre las transacciones ejecutadas en: [02 - Transacciones Atomicas en Firestore runTransaction e Incrementos](<02%20-%20Transacciones%20Atomicas%20en%20Firestore%20runTransaction%20e%20Incrementos.md>)

## Preguntas de repaso

1. **Comprensión:** Explica el riesgo de seguridad que surge si el modo de prueba de Firestore expira sin haber configurado reglas de producción.
2. **Aplicación:** Escribe una condición en Reglas de Firestore que verifique que el contenido de un documento tenga menos de 100 caracteres y pertenezca al usuario autenticado.

## Fuente

* **Clase:** Reglas de Seguridad en Firestore
* **Timestamp:** ~107:00 - 113:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
