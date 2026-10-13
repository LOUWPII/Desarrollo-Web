---
tags:
  - jpa
  - jackson
  - jsonignore
  - recursion
aliases:
  - JsonIgnore
  - Recursión Infinita
  - Referencias Circulares
clase: Manejo de Referencias Circulares y Serialization (@JsonIgnore)
timestamp: ~19:30 - 24:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Manejo de Referencias Circulares y Recursión Infinita con `@JsonIgnore`

## Definición

El error de **Recursión Infinita en Serialización JSON** ocurre cuando Jackson (el serializador por defecto de Spring Boot) intenta convertir a JSON entidades JPA que poseen relaciones bidireccionales (`@OneToMany` / `@ManyToOne`). La anotación **`@JsonIgnore`** detiene el bucle infinito indicando a Jackson qué atributos debe omitir durante el proceso de serialización.

## Causa Técnica de la Recursión Infinita

```text
 Causa del Bucle Infinito:
 Student contiene List<Homework>
   └─► Cada Homework contiene la referencia a Student
         └─► Que a su vez vuelve a traer la List<Homework>... ♾️ (StackOverflowError / Cycle)

```

---

## Solución con `@JsonIgnore`

La anotación `@JsonIgnore` se coloca sobre la propiedad de la relación bidireccional que no se desea serializar directamente hacia el cliente:

```java
package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    // Se ignora la lista de tareas al serializar el Estudiante a JSON
    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private List<Homework> homeworkList;

    // Getters y Setters...
}

```

---

## Decisión de Diseño: ¿Objetos Anidados vs. Consultas Separadas?

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                Estrategias de Serialización                 │
 ├──────────────────────────────┬──────────────────────────────┤
 │   Traer Objetos Anidados    │  Peticiones Separadas (Rec.) │
 ├──────────────────────────────┼──────────────────────────────┤
 │ Trae la entidad con todas sus │ Colocar @JsonIgnore a las    │
 │ relaciones en un solo JSON.  │ relaciones y realizar llamadas│
 │                              │ HTTP independientes desde    │
 │                              │ el frontend cuando se ocupen.│
 ├──────────────────────────────┼──────────────────────────────┤
 │ ❌ JSON muy pesado.          │ ✅ JSONs ligeros.            │
 │ ❌ Ralentiza la consulta.    │ ✅ Carga bajo demanda.       │
 └──────────────────────────────┴──────────────────────────────┘

```

---

## Errores Comunes

* ⚠️ **Lanzamiento de `Direct self-reference leading to cycle`:** Omitir el manejo de relaciones bidireccionales en entidades JPA antes de exponerlas en controladores REST.

## Buenas Prácticas

* Ignorar las colecciones de relaciones por defecto en las entidades y realizar consultas HTTP independientes desde el cliente según la vista lo requiera.

## Relación con otros conceptos

* Hace necesaria la ejecución de la consulta anidada mediante `mergeMap` en: [11 - Consultas Asincronas Anidadas en Angular con el Operador mergeMap](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>)
* Permite la exposición segura de los repositorios construidos en: [08 - Consultas Derivadas en Spring Data JPA y Modulo Homework](<08%20-%20Consultas%20Derivadas%20en%20Spring%20Data%20JPA%20y%20Modulo%20Homework.md>)

## Preguntas de repaso

1. **Comprensión:** Explica cómo se produce un error de serialización por referencia circular entre dos entidades JPA relacionadas.
2. **Diseño:** Menciona las ventajas en rendimiento de aplicar `@JsonIgnore` y realizar consultas separadas desde el cliente.

## Fuente

* **Clase:** Manejo de Referencias Circulares y Serialization (@JsonIgnore)
* **Timestamp:** ~19:30 - 24:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
