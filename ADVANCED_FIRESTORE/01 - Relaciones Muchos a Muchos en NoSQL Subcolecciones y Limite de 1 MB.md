---
tags:
  - firestore
  - nosql
  - subcolecciones
  - desnormalizacion
aliases:
  - Relaciones N:M en NoSQL
  - Subcolecciones y 1 MB
  - Contador desnormalizado likesCount
clase: Relaciones Muchos a Muchos en NoSQL vs. SQL y Subcolecciones en Firestore
timestamp: ~05:00 - 15:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Relaciones Muchos a Muchos en NoSQL: Subcolecciones y Límite de 1 MB

## Definición

En bases de datos NoSQL como **Firestore**, las relaciones **Muchos a Muchos (N:M)** no se resuelven mediante tablas intermedias (SQL) ni acumulando arreglos de identificadores dentro de un único documento (anti-patrón), sino a través de **Subcolecciones**. Esto previene superar el límite físico de **1 MB por documento** y optimiza el consumo de ancho de banda.

## Comparativa de Enfoques de Modelado N:M

```text
 ❌ ANTI-PATRÓN: Arreglo de IDs en Documento Principal
 Documento: tweets/tweet_123
 {
   "content": "Hola mundo",
   "likes": ["user_1", "user_2", ..., "user_1000000"] ──► 💥 Excede 1 MB / Carga masiva innecesaria
 }

 ✅ PATRÓN RECOMENDADO: Subcolección + Contador Desnormalizado
 Documento: tweets/tweet_123
 {
   "content": "Hola mundo",
   "likesCount": 1500 ────────────────────────────► Lectura rápida y económica en el Feed
 }
   └─► Subcolección: tweets/tweet_123/likes/user_1 ──► Crecimiento aislado e independiente

```

---

## Razones para Evitar Arreglos de Identificadores

1. **Límite Físico de 1 MB:** Un documento que supere 1 MB rechazará escrituras adicionales en los servidores de Google.
2. **Payload / Ancho de Banda Innecesario:** Al consultar el tweet para renderizar una lista o *feed*, se descargarían miles de IDs innecesarios, elevando latencia y costos.

---

## Desnormalización Estratégica (`likesCount`)

Para evitar realizar consultas a la subcolección únicamente para contar elementos, se almacena un entero `likesCount` en el documento padre. La subcolección `likes` solo se consulta si el usuario desea ver la lista detallada de perfiles o verificar si ya dio *like*.

---

## Errores Comunes

* ⚠️ **Modelar NoSQL como un esquema relacional estricto o acoplar colecciones dinámicas ilimitadas dentro de arreglos:** Produce cuellos de botella e interrupción de servicio por exceso de tamaño.

## Buenas Prácticas

* Usar la estructura `colección/documento/subcolección/documento` para cualquier relación que pueda crecer indefinidamente.

## Relación con otros conceptos

* Sirve como estructura base para las transacciones explicadas en: [02 - Transacciones Atomicas en Firestore runTransaction e Incrementos](<02%20-%20Transacciones%20Atomicas%20en%20Firestore%20runTransaction%20e%20Incrementos.md>)
* Define la arquitectura para el sistema de seguimiento en: [04 - Subcolecciones Espejo followers y following para Sistema de Seguimiento](<04%20-%20Subcolecciones%20Espejo%20followers%20y%20following%20para%20Sistema%20de%20Seguimiento.md>)

## Preguntas de repaso

1. **Comprensión:** Explica las dos razones técnicas principales por las cuales guardar una lista de `userIds` dentro del documento principal de un tweet es un anti-patrón en NoSQL.
2. **Diseño:** ¿Cuál es el propósito de almacenar el campo desnormalizado `likesCount` en el documento principal?

## Fuente

* **Clase:** Relaciones Muchos a Muchos en NoSQL vs. SQL y Subcolecciones en Firestore
* **Timestamp:** ~05:00 - 15:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
