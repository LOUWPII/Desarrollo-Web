---
tags:
  - spring-data-jpa
  - derived-queries
  - repository
  - homework
aliases:
  - Consultas Derivadas
  - Derived Queries
  - findByStudentId
clase: Desarrollo del Módulo de Tareas (Homework) en Backend
timestamp: ~29:00 - 35:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Consultas Derivadas en Spring Data JPA y Módulo Homework

## Definición

Las **Consultas Derivadas** (*Derived Queries / Magic Queries*) son una característica de Spring Data JPA que permite generar consultas SQL automáticamente a partir del nombre de un método declarado en la interfaz del repositorio, sin necesidad de escribir código JPQL ni consultas nativas.

## Funcionamiento de las Consultas Derivadas

Spring Data JPA analiza la firma del método declarado en la interfaz y deduce la cláusula `WHERE` mapeando los atributos de las entidades y sus relaciones.

```text
 Firma del Método en Repositorio:
 List<Homework> findByStudentId(Long id);

 Generación Automática de SQL por Spring Data JPA:
 SELECT h.* FROM homework h WHERE h.student_id = ?;

```

---

## Implementación Técnica del Módulo Homework

### 1. Repositorio (`HomeworkRepository.java`):

```java
package com.example.demo.repository;

import com.example.demo.entity.Homework;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HomeworkRepository extends JpaRepository<Homework, Long> {
    
    // Consulta derivada por la propiedad de relación 'student' e ID
    List<Homework> findByStudentId(Long id);
}

```

### 2. Controlador REST (`HomeworkController.java`):

```java
package com.example.demo.controller;

import com.example.demo.entity.Homework;
import com.example.demo.service.HomeworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/homework")
@CrossOrigin(origins = "http://localhost:4200")
public class HomeworkController {

    @Autowired
    private HomeworkService homeworkService;

    @GetMapping("/all")
    public List<Homework> getAll() {
        return homeworkService.findAll();
    }

    // Endpoint específico para recuperar tareas de un estudiante
    @GetMapping("/student/{id}")
    public List<Homework> getByStudentId(@PathVariable Long id) {
        return homeworkService.findByStudentId(id);
    }
}

```

---

## Errores Comunes

* ⚠️ **Escribir incorrectamente el nombre de la propiedad en el método derivado:** Nombrar el método como `findByEstudianteId` cuando el atributo de la entidad se llama `student` provocará una excepción `PropertyReferenceException` al arrancar la aplicación.

## Buenas Prácticas

* Usar consultas derivadas para operaciones sencillas de filtrado y recurrir a `@Query` solo cuando las consultas requieran `JOIN` complejos o agregaciones.

## Relación con otros conceptos

* Permite la creación del endpoint `/homework/student/{id}` consumido por: [11 - Consultas Asincronas Anidadas en Angular con el Operador mergeMap](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>)

## Preguntas de repaso

1. **Comprensión:** Explica cómo interpreta Spring Data JPA el nombre del método `findByStudentId(Long id)`.
2. **Diagnóstico:** ¿Qué error de arranque ocurre si escribes un nombre de propiedad inexistente dentro de un método derivado de un repositorio?

## Fuente

* **Clase:** Desarrollo del Módulo de Tareas (Homework) en Backend
* **Timestamp:** ~29:00 - 35:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
