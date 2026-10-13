---
tags:
  - spring-boot
  - restcontroller
  - cors
  - cross-origin
aliases:
  - RestController
  - CrossOrigin
  - CORS
clase: Transformación de Spring Boot en un servicio REST API
timestamp: ~15:00 - 19:30 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Configuración de Controladores REST y CORS con `@RestController` y `@CrossOrigin`

## Definición

Para transformar una aplicación Spring Boot tradicional (MVC) en un servicio REST API, se utiliza la anotación **`@RestController`**, la cual deserializa y serializa objetos directamente en formato JSON. Además, se requiere configurar la anotación **`@CrossOrigin`** para autorizar el intercambio de recursos entre orígenes diferentes (*Cross-Origin Resource Sharing*) y habilitar el consumo desde clientes como Angular.

## Anotaciones Clave de Spring Web

* **`@RestController`:** Combina `@Controller` y `@ResponseBody`. En lugar de retornar un nombre de vista HTML (Thymeleaf), retorna objetos o colecciones Java que Spring Web MVC convierte automáticamente a JSON mediante Jackson.
* **`@CrossOrigin`:** Configura los encabezados HTTP CORS en el servidor para permitir solicitudes AJAX desde un dominio o puerto distinto (ej. `http://localhost:4200`).

---

## Implementación Técnica (`StudentController.java`)

```java
package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Convierte las respuestas de los métodos automáticamente a JSON
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde el puerto de Angular
@RequestMapping("/student") // Prefijo base para todas las rutas del controlador
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/all")
    public List<Student> getAll() {
        return studentService.searchAll();
    }
}

```

---

## El Mecanismo de Seguridad CORS

Los navegadores bloquean por defecto cualquier petición HTTP realizada mediante código JavaScript hacia un dominio o puerto diferente al que origino la página.

```text
 Browser (localhost:4200) ──── Petición HTTP ────► Spring Boot (localhost:8090)
                                                       │
 ❌ Sin @CrossOrigin: Bloqueado por el Navegador       │
 ✅ Con @CrossOrigin: Devuelve header Access-Control-  │
     Allow-Origin: http://localhost:4200               │

```

---

## Errores Comunes

* ⚠️ **Bloqueo por CORS no configurado:** Intentar consumir la API desde Angular sin haber agregado `@CrossOrigin` provocará un error en la consola del navegador: *Access to XMLHttpRequest has been blocked by CORS policy*.

## Buenas Prácticas

* Especificar el origen exacto (`origins = "http://localhost:4200"`) en producción en lugar de utilizar asteriscos (`*`) para no exponer la API a cualquier dominio no autorizado.

## Relación con otros conceptos

* Recibe las entidades protegidas de ciclos recursivos por: [06 - Manejo de Referencias Circulares y Recursion Infinita con JsonIgnore](<06%20-%20Manejo%20de%20Referencias%20Circulares%20y%20Recursion%20Infinita%20con%20JsonIgnore.md>)
* Hospeda los endpoints detallados en: [07 - Construccion de Endpoints CRUD con RequestBody y PathVariable](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la diferencia técnica de tipo de retorno entre un controlador anotado con `@Controller` y uno con `@RestController`.
2. **Diagnóstico:** ¿Qué sucede si tu frontend Angular corre en el puerto 4200 y tu backend Spring Boot en el puerto 8090 si no se configura la anotación `@CrossOrigin`?

## Fuente

* **Clase:** Transformación de Spring Boot en un servicio REST API
* **Timestamp:** ~15:00 - 19:30 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
