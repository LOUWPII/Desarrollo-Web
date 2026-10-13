---
tags:
  - swagger
  - openapi
  - documentacion
  - spring-boot
aliases:
  - Swagger UI
  - OpenAPI
  - Documentación de APIs
clase: Documentación Interactiva de APIs con Swagger / OpenAPI
timestamp: ~35:00 - 39:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Documentación Interactiva de APIs con Swagger UI y OpenAPI

## Definición

**OpenAPI** es el estándar de especificación para describir y documentar servicios RESTful. **Swagger UI** es una herramienta gráfica interactiva que se genera automáticamente a partir de dichas especificaciones, permitiendo visualizar, explorar y probar los endpoints de la API directamente desde el navegador web.

## Rutas de Documentación por Defecto en Spring Boot

```text
 ┌─────────────────────────────────────────────────────────────┐
 │               URLs de Documentación de la API               │
 ├──────────────────────────────┬──────────────────────────────┤
 │  Especificación JSON Cruda   │   Interfaz Gráfica Swagger   │
 ├──────────────────────────────┼──────────────────────────────┤
 │ `/v3/api-docs`               │ `/swagger-ui/index.html`     │
 └──────────────────────────────┴──────────────────────────────┘

```

---

## Personalización con Anotaciones OpenAPI (`@Operation`)

Se pueden agregar anotaciones de la especificación OpenAPI sobre los métodos de los controladores para proporcionar resúmenes informativos en la interfaz gráfica:

```java
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

@Operation(summary = "Obtiene la información detallada de un estudiante dado su ID")
@GetMapping("/{id}")
public Student getById(@PathVariable Long id) {
    return studentService.searchById(id);
}

```

---

## Descubrimiento Crítico en Pruebas con Swagger UI (Efecto del ID)

Al probar peticiones `POST` en Swagger UI enviando un modelo JSON:

```text
 ⚠️ ADVERTENCIA DE COMPORTAMIENTO JPA:
 Si en el JSON de prueba del POST envías:
 { "id": 1, "nombre": "Juan Updated" }
 JPA detectará que el ID 1 ya existe y ejecutará un UPDATE sobrescribiendo datos.

 ✅ Para CREAR un registro nuevo:
 Debes remover intencionalmente el atributo "id" del JSON de prueba:
 { "nombre": "Nuevo Estudiante" }

```

---

## Errores Comunes

* ⚠️ **Enviar un ID predeterminado en un POST de prueba:** Provoca la sobreescritura no deseada de registros existentes en la base de datos debido al comportamiento de `save()` en JPA.

## Buenas Prácticas

* Usar Swagger UI durante la fase de desarrollo para validar el comportamiento de los endpoints antes de iniciar la integración con el cliente frontend.

## Relación con otros conceptos

* Valida visualmente los métodos implementados en: [07 - Construccion de Endpoints CRUD con RequestBody y PathVariable](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>)

## Preguntas de repaso

1. **Aplicación:** ¿En qué ruta URL se puede acceder a la interfaz gráfica interactiva de Swagger UI en un proyecto Spring Boot?
2. **Diagnóstico:** Si en Swagger UI ejecutas una llamada `POST` con un campo `"id": 2` en el cuerpo del JSON, ¿qué operación ejecutará la base de datos?

## Fuente

* **Clase:** Documentación Interactiva de APIs con Swagger / OpenAPI
* **Timestamp:** ~35:00 - 39:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
