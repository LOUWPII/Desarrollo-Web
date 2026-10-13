---
tags:
  - spring-boot
  - requestbody
  - pathvariable
  - crud
aliases:
  - RequestBody
  - PathVariable
  - Endpoints CRUD
clase: Construcción de Endpoints CRUD en Spring Boot
timestamp: ~24:00 - 29:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Construcción de Endpoints CRUD con `@RequestBody` y `@PathVariable`

## Definición

Es la creación de controladores RESTful en Spring Boot mapeando los verbos HTTP a las operaciones de la capa de servicio, utilizando la anotación **`@PathVariable`** para extraer valores dinámicos de la URL y **`@RequestBody`** para deserializar automáticamente el payload JSON enviado en el cuerpo de la petición.

## Anotaciones de Extracción de Parámetros

* **`@PathVariable`:** Vincula una variable declarada en la plantilla de la ruta URL (`/student/{id}`) con un parámetro formal del método Java.
* **`@RequestBody`:** Lee el cuerpo JSON de la solicitud HTTP entrante y utiliza Jackson para instanciar y poblar el objeto Java equivalente.

---

## Implementación Técnica (`StudentController.java`)

```java
package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // 1. READ ALL
    @GetMapping("/all")
    public List<Student> getAll() {
        return studentService.searchAll();
    }

    // 2. READ BY ID
    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return studentService.searchById(id);
    }

    // 3. CREATE (Recibe JSON en el Body)
    @PostMapping("/add")
    public void addStudent(@RequestBody Student student) {
        studentService.add(student);
    }

    // 4. UPDATE (Recibe JSON en el Body)
    @PutMapping("/update")
    public void updateStudent(@RequestBody Student student) {
        studentService.update(student);
    }

    // 5. DELETE (Recibe ID por URL)
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteById(id);
    }
}

```

---

## Comportamiento Interno de JPA en POST y PUT

Tanto `@PostMapping` como `@PutMapping` llaman habitualmente al método `save()` de `JpaRepository`:

* Si el objeto enviado con `@RequestBody` **NO incluye ID** (o es nulo), JPA ejecuta un `INSERT`.
* Si el objeto **SI incluye un ID existente**, JPA ejecuta un `UPDATE` sobre dicho registro.

---

## Errores Comunes

* ⚠️ **Omitir `@RequestBody` en métodos POST/PUT:** Provocará que el objeto recibido en Java sea `null` o contenga todos sus atributos vacíos, ya que Spring no leerá el cuerpo JSON de la petición.

## Buenas Prácticas

* Mantener las firmas de los métodos del controlador limpias, retornando objetos o colecciones concretas sin acoplarlas a objetos de la vista web.

## Relación con otros conceptos

* Aplica los verbos y estándares definidos en: [03 - Verbos HTTP Operaciones CRUD Parametros y Codigos de Respuesta](<03%20-%20Verbos%20HTTP%20Operaciones%20CRUD%20Parametros%20y%20Codigos%20de%20Respuesta.md>)
* Expone los endpoints probados interactivamente con: [09 - Documentacion Interactiva de APIs con Swagger UI y OpenAPI](<09%20-%20Documentacion%20Interactiva%20de%20APIs%20con%20Swagger%20UI%20y%20OpenAPI.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la diferencia de uso entre `@PathVariable` y `@RequestBody` al construir un controlador REST.
2. **Diagnóstico:** Si ejecutas una petición POST enviando un objeto JSON pero no usas la anotación `@RequestBody` en el método Java, ¿qué valor reciben las propiedades del objeto en el servidor?

## Fuente

* **Clase:** Construcción de Endpoints CRUD en Spring Boot
* **Timestamp:** ~24:00 - 29:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
