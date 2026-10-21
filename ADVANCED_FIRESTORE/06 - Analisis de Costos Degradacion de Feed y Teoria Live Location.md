---
tags:
  - firestore
  - costos
  - listeners
  - live-location
aliases:
  - Análisis de Costos Firestore
  - Degradación de Feed
  - Teoría Live Location WhatsApp
clase: Escucha de Datos en Vivo en Firestore / Análisis de Costos y Teoría de WhatsApp Live Location
timestamp: ~50:00 - 67:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Análisis de Costos, Degradación de Feed y Teoría *Live Location*

## Definición

Es el análisis técnico y financiero sobre el uso de **escuchas en tiempo real (escuchas activas)** versus **peticiones estáticas (`get()`)**. Mantener datos en vivo para *feeds* masivos incrementa exponencialmente las lecturas facturables y satura la UI, por lo que grandes plataformas (X, Instagram, YouTube) optan por recargas manuales (*pull-to-refresh*).

## Comparativa de Estrategias de Carga

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                Estrategia de Carga de Datos                 │
 ├──────────────────────────────┬──────────────────────────────┤
 │  Datos en Vivo (Snapshots)   │  Consulta Estática (get())   │
 ├──────────────────────────────┼──────────────────────────────┤
 │ - Actualización automática.  │ - Foto estática del momento. │
 │ - Alto volumen de lecturas.  │ - Bajo consumo y costos.     │
 │ - Uso: Chat, Live Location.  │ - Uso: Feeds (X, Instagram). │
 └──────────────────────────────┴──────────────────────────────┘

```

---

## El Fenómeno del Multiplicador de Lecturas

Si 5,000 usuarios están conectados simultáneamente escuchando la colección `tweets` en vivo y 1 usuario publica un tweet:

* Firestore emite 1 actualización a 5,000 clientes = **5,000 lecturas facturadas en un instante**.
* Si 100 usuarios publican en un minuto, el costo y tráfico se vuelven insostenibles para aplicaciones de gran escala.

---

## Teoría de Degradación de Servicio en WhatsApp (*Live Location*)

WhatsApp implementó la degradación de la ubicación en tiempo real cuando la app pasa a segundo plano debido a los elevados costos de infraestructura que generaba la emisión de coordenadas GPS cada pocos segundos hacia grupos masivos de usuarios.

---

## Errores Comunes

* ⚠️ **Implementar `addSnapshotListener` por defecto en todas las pantallas de la app:** Eleva los costos operativos de Firebase y agota la batería del dispositivo móvil.

## Buenas Prácticas

* Reservar los datos en vivo exclusivamente para salas de chat, notificaciones o rastreo de mapas, utilizando consultas estáticas con *pull-to-refresh* para vistas tipo lista o catálogo.

## Relación con otros conceptos

* Analiza la viabilidad técnica del código implementado en: [05 - Flujos Reactivos en Tiempo Real con callbackFlow y addSnapshotListener](<05%20-%20Flujos%20Reactivos%20en%20Tiempo%20Real%20con%20callbackFlow%20y%20addSnapshotListener.md>)

## Preguntas de repaso

1. **Comprensión:** Explica por qué redes sociales como Instagram o X no utilizan listeners en tiempo real para sus feeds principales.
2. **Análisis:** ¿Cuál es el impacto financiero en Firestore si 1,000 usuarios escuchan una colección y ocurre 1 escritura?

## Fuente

* **Clase:** Escucha de Datos en Vivo en Firestore / Análisis de Costos y Teoría de WhatsApp Live Location
* **Timestamp:** ~50:00 - 67:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
