---
tags:
  - rest
  - soap
  - arquitectura
  - comparativa
aliases:
  - REST vs SOAP
  - SOAP
  - XML Envelope
clase: "Comparativa de Arquitecturas: REST vs. SOAP"
timestamp: ~11:30 - 15:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Comparativa de Arquitecturas Web: REST vs. SOAP

## Definición

**REST** y **SOAP** son las dos arquitecturas/protocolos principales para el intercambio de información entre aplicaciones. Mientras REST está orientado a **Recursos (CRUD)** ligeros sobre HTTP, SOAP está orientado a **Operaciones o Métodos (Invocación Remota)** utilizando contratos estrictos estructurados en XML.

## Matriz Comparativa REST vs. SOAP

| Criterio | REST (Representational State Transfer) | SOAP (Simple Object Access Protocol) |
| --- | --- | --- |
| **Formato de Datos** | **JSON** (Ligero, legible, estándar web). | **XML** exclusivamente (Pesado, verboso). |
| **Protocolos** | Casi exclusivamente **HTTP / HTTPS**. | Múltiples transportes: HTTP, TCP, FTP, SMTP. |
| **Enfoque de Diseño** | **Orientado a Recursos** (`/student/1`). | **Orientado a Operaciones** (`<substract>`). |
| **Estándares / Contrato** | Flexible, documentado con Swagger/OpenAPI. | Rígido, contrato estricto con WSDL y Schema. |
| **Complejidad** | Baja a moderada; fácil implementación. | Alta; overhead por estructura de Envelope. |

---

## Estructura de Payload: JSON (REST) vs. XML Envelope (SOAP)

### REST (JSON):

```json
{
  "intA": 5,
  "intB": 5
}

```

### SOAP (XML Envelope):

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <substract>
         <intA>5</intA>
         <intB>5</intB>
      </substract>
   </soapenv:Body>
</soapenv:Envelope>

```

---

## Criterio de Selección

* **Usar REST cuando:** Se construyen aplicaciones web/móviles basadas en entidades de dominio (estudiantes, productos, tareas) que encajan naturalmente en un modelo CRUD.
* **Usar SOAP cuando:** Se requiere exponer operaciones puras o algoritmos (ej. `calcularInteresCompuesto()`, `restar(5,5)`) que no representan recursos, o en entornos bancarios/legados con requisitos estrictos de seguridad WS-Security.

---

## Errores Comunes

* ⚠️ **Forzar el modelo REST para operaciones complejas sin recursos:** Intentar modelar invocaciones a algoritmos matemáticos dentro de URIs y verbos REST de forma forzada cuando el problema es puramente operacional.

## Buenas Prácticas

* Seleccionar REST para aplicaciones interactivas modernas por su ligereza y eficiencia en el consumo de ancho de banda.

## Relación con otros conceptos

* Fundamenta la elección de la arquitectura implementada en: [05 - Configuracion de Controladores REST y CORS con RestController y CrossOrigin](<05%20-%20Configuracion%20de%20Controladores%20REST%20y%20CORS%20con%20RestController%20y%20CrossOrigin.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la diferencia entre un enfoque "Orientado a Recursos" y uno "Orientado a Operaciones".
2. **Comparación:** Menciona dos ventajas del formato JSON sobre XML en el desarrollo de aplicaciones web.

## Fuente

* **Clase:** Comparativa de Arquitecturas: REST vs. SOAP
* **Timestamp:** ~11:30 - 15:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
