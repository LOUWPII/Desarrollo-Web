---
tags:
  - rest
  - spring-boot
  - angular
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC REST
  - Índice REST Spring Boot Angular
---

# Índice y Mapa de Conocimiento — Servicios Web REST con Spring Boot y Angular

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Asincronismo RxJS y Manejo de Concurrencia con mergeMap y concatMap](<01%20-%20Asincronismo%20RxJS%20y%20Manejo%20de%20Concurrencia%20con%20mergeMap%20y%20concatMap.md>) | Operadores de aplanamiento |
| 02 | [Fundamentos de Arquitectura API REST: JSON, URIs y Statelessness](<02%20-%20Fundamentos%20de%20Arquitectura%20API%20REST%20JSON%20URIs%20y%20Statelessness.md>) | Principios REST y *Stateless* |
| 03 | [Verbos HTTP, Operaciones CRUD, Parámetros y Códigos de Respuesta](<03%20-%20Verbos%20HTTP%20Operaciones%20CRUD%20Parametros%20y%20Codigos%20de%20Respuesta.md>) | GET, POST, PUT, DELETE |
| 04 | [Comparativa de Arquitecturas Web: REST vs. SOAP](<04%20-%20Comparativa%20de%20Arquitecturas%20Web%20REST%20vs%20SOAP.md>) | JSON vs. XML Envelope |
| 05 | [Configuración de Controladores REST y CORS con RestController y CrossOrigin](<05%20-%20Configuracion%20de%20Controladores%20REST%20y%20CORS%20con%20RestController%20y%20CrossOrigin.md>) | `@RestController` y `@CrossOrigin` |
| 06 | [Manejo de Referencias Circulares y Recursión Infinita con JsonIgnore](<06%20-%20Manejo%20de%20Referencias%20Circulares%20y%20Recursion%20Infinita%20con%20JsonIgnore.md>) | `@JsonIgnore` y ciclos JPA |
| 07 | [Construcción de Endpoints CRUD con RequestBody y PathVariable](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>) | `@RequestBody` y `@PathVariable` |
| 08 | [Consultas Derivadas en Spring Data JPA y Módulo Homework](<08%20-%20Consultas%20Derivadas%20en%20Spring%20Data%20JPA%20y%20Modulo%20Homework.md>) | *Derived Queries* |
| 09 | [Documentación Interactiva de APIs con Swagger UI y OpenAPI](<09%20-%20Documentacion%20Interactiva%20de%20APIs%20con%20Swagger%20UI%20y%20OpenAPI.md>) | Swagger UI y `@Operation` |
| 10 | [Integración de HttpClient, Módulos e Interfaces TypeScript en Angular](<10%20-%20Integracion%20de%20HttpClient%20Módulos%20e%20Interfaces%20TypeScript%20en%20Angular.md>) | `HttpClient` e interfaces |
| 11 | [Consultas Asíncronas Anidadas en Angular con el Operador mergeMap](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>) | `mergeMap` en componentes |

---

## 2. Mapa de Conocimiento

```text
Ecosistema de Servicios Web REST con Spring Boot y Angular
├── Arquitectura, Protocolos y Concurrencia
│   ├── Asincronismo RxJS y Manejo de Concurrencia (01)
│   ├── Fundamentos de Arquitectura API REST (02)
│   ├── Verbos HTTP, CRUD y Códigos de Respuesta (03)
│   └── Comparativa: REST vs SOAP (04)
│
├── Desarrollo Backend en Spring Boot
│   ├── Configuración de Controladores REST y CORS (05)
│   ├── Referencias Circulares y @JsonIgnore (06)
│   ├── Endpoints CRUD con @RequestBody y @PathVariable (07)
│   ├── Consultas Derivadas en JPA y Módulo Homework (08)
│   └── Documentación Interactiva con Swagger UI (09)
│
└── Consumo e Integración en Angular
    ├── Integración de HttpClient e Interfaces TypeScript (10)
    └── Consultas Asíncronas Anidadas con mergeMap (11)

```

### Explicación de la Relación entre los Conceptos

El ecosistema se fundamenta en los principios de **Asincronismo RxJS** ([01](<01%20-%20Asincronismo%20RxJS%20y%20Manejo%20de%20Concurrencia%20con%20mergeMap%20y%20concatMap.md>)), **Arquitectura REST** ([02](<02%20-%20Fundamentos%20de%20Arquitectura%20API%20REST%20JSON%20URIs%20y%20Statelessness.md>)), **Verbos HTTP** ([03](<03%20-%20Verbos%20HTTP%20Operaciones%20CRUD%20Parametros%20y%20Codigos%20de%20Respuesta.md>)) y la **Comparativa REST vs SOAP** ([04](<04%20-%20Comparativa%20de%20Arquitecturas%20Web%20REST%20vs%20SOAP.md>)).

En el servidor, Spring Boot expone recursos mediante **Controladores REST y CORS** ([05](<05%20-%20Configuracion%20de%20Controladores%20REST%20y%20CORS%20con%20RestController%20y%20CrossOrigin.md>)), protege la serialización con **`@JsonIgnore`** ([06](<06%20-%20Manejo%20de%20Referencias%20Circulares%20y%20Recursion%20Infinita%20con%20JsonIgnore.md>)), construye servicios con **`@RequestBody` y `@PathVariable`** ([07](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>)), consulta repositorios mediante **Consultas Derivadas** ([08](<08%20-%20Consultas%20Derivadas%20en%20Spring%20Data%20JPA%20y%20Modulo%20Homework.md>)) y valida endpoints mediante **Swagger UI** ([09](<09%20-%20Documentacion%20Interactiva%20de%20APIs%20con%20Swagger%20UI%20y%20OpenAPI.md>)).

Finalmente, el cliente consume la API integrando **HttpClient e Interfaces TypeScript** ([10](<10%20-%20Integracion%20de%20HttpClient%20Módulos%20e%20Interfaces%20TypeScript%20en%20Angular.md>)) y coordina llamadas dependientes mediante **`mergeMap`** ([11](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>)).

---

## 3. Lo Esencial

1. **Estructura REST:** Basada en recursos (URIs), sin estado (*Stateless*), que intercambia JSON utilizando verbos HTTP semánticos.
2. **Ubicación de Parámetros:** GET y DELETE reciben parámetros por la URL; POST y PUT reciben datos estructurados en el cuerpo (*Body*).
3. **Manejo de CORS:** Usar `@CrossOrigin(origins = "http://localhost:4200")` para autorizar las solicitudes provenientes del cliente Angular.
4. **Prevención de Ciclos:** Prevenir `StackOverflowError` por referencias circulares en JPA aplicando `@JsonIgnore` sobre atributos de relación.
5. **Comportamiento JPA:** La presencia de un ID en un payload enviado con `@RequestBody` convierte un `POST`/`PUT` en una actualización (*UPDATE*) en lugar de una inserción.
6. **Alineación de Modelos:** Los nombres de atributos en las interfaces TypeScript deben ser idénticos a los definidos en las entidades Java.
7. **Encadenamiento Asíncrono:** Usar `mergeMap` para encadenar peticiones HTTP dependientes sin anidar bloques `.subscribe()`.

---

## 4. Debo Saber Hacer

- [ ] Identificar antipatrones de suscripciones anidadas y refactorizarlos con operadores de aplanamiento. → [01](<01%20-%20Asincronismo%20RxJS%20y%20Manejo%20de%20Concurrencia%20con%20mergeMap%20y%20concatMap.md>)
- [ ] Diseñar rutas RESTful semánticas utilizando sustantivos y verbos HTTP adecuados. → [02](<02%20-%20Fundamentos%20de%20Arquitectura%20API%20REST%20JSON%20URIs%20y%20Statelessness.md>)
- [ ] Crear controladores REST en Spring Boot anotados con `@RestController` y `@CrossOrigin`. → [05](<05%20-%20Configuracion%20de%20Controladores%20REST%20y%20CORS%20con%20RestController%20y%20CrossOrigin.md>)
- [ ] Aplicar `@JsonIgnore` sobre relaciones JPA bidireccionales para evitar bucles de serialización. → [06](<06%20-%20Manejo%20de%20Referencias%20Circulares%20y%20Recursion%20Infinita%20con%20JsonIgnore.md>)
- [ ] Mapear parámetros con `@PathVariable` para URLs dinámicas y `@RequestBody` para JSONs entrantes. → [07](<07%20-%20Construccion%20de%20Endpoints%20CRUD%20con%20RequestBody%20y%20PathVariable.md>)
- [ ] Declarar métodos derivados en repositorios JPA como `findByStudentId(Long id)`. → [08](<08%20-%20Consultas%20Derivadas%20en%20Spring%20Data%20JPA%20y%20Modulo%20Homework.md>)
- [ ] Acceder y probar endpoints interactivamente desde `http://localhost:8090/swagger-ui/index.html`. → [09](<09%20-%20Documentacion%20Interactiva%20de%20APIs%20con%20Swagger%20UI%20y%20OpenAPI.md>)
- [ ] Configurar `HttpClientModule` e inyectar `HttpClient` en servicios de Angular. → [10](<10%20-%20Integracion%20de%20HttpClient%20Módulos%20e%20Interfaces%20TypeScript%20en%20Angular.md>)
- [ ] Crear interfaces TypeScript alineadas con las entidades de Spring Boot. → [10](<10%20-%20Integracion%20de%20HttpClient%20Módulos%20e%20Interfaces%20TypeScript%20en%20Angular.md>)
- [ ] Implementar tuberías asíncronas anidadas con `mergeMap` en componentes de Angular. → [11](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Anidar métodos `.subscribe()`** | Causa condiciones de carrera, errores de ordenamiento y fugas de memoria | [01](<01%20-%20Asincronismo%20RxJS%20y%20Manejo%20de%20Concurrencia%20con%20mergeMap%20y%20concatMap.md>) |
| **Incluir verbos de acción en las URIs** | Crear rutas estilo `/getUsers` o `/deleteUser` | [02](<02%20-%20Fundamentos%20de%20Arquitectura%20API%20REST%20JSON%20URIs%20y%20Statelessness.md>) |
| **Omitir `@CrossOrigin` en el backend** | Genera bloqueos de seguridad CORS en el navegador | [05](<05%20-%20Configuracion%20de%20Controladores%20REST%20y%20CORS%20con%20RestController%20y%20CrossOrigin.md>) |
| **Omitir `@JsonIgnore` en relaciones JPA** | Produce errores de recursión infinita (`StackOverflowError`) | [06](<06%20-%20Manejo%20de%20Referencias%20Circulares%20y%20Recursion%20Infinita%20con%20JsonIgnore.md>) |
| **Enviar un ID en la prueba de un `POST`** | Hace que JPA ejecute un `UPDATE` sobreescribiendo datos existentes | [09](<09%20-%20Documentacion%20Interactiva%20de%20APIs%20con%20Swagger%20UI%20y%20OpenAPI.md>) |
| **Desalinear nombres de propiedades Java vs TypeScript** | Causa que los campos se reciban como `undefined` o `null` en la UI | [10](<10%20-%20Integracion%20de%20HttpClient%20Módulos%20e%20Interfaces%20TypeScript%20en%20Angular.md>) |
| **Omitir el `return` dentro de `mergeMap`** | Detiene el flujo de la segunda petición asíncrona | [11](<11%20-%20Consultas%20Asincronas%20Anidadas%20en%20Angular%20con%20el%20Operador%20mergeMap.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / RxJS)** Explica por qué el uso de suscripciones anidadas (`.subscribe()` dentro de `.subscribe()`) es considerado un antipatrón en Angular.
2. **(Arquitectura / REST)** ¿Qué implica que un servicio REST sea *Stateless* y cómo afecta el manejo de la sesión de los usuarios?
3. **(Diagnóstico / Spring Boot)** ¿Por qué la aplicación lanza un error de recursión infinita al serializar dos entidades JPA con relaciones `@OneToMany` y `@ManyToOne`?
4. **(Aplicación / JPA)** Si ejecutas `postStudent(student)` enviando un objeto JSON que incluye `"id": 3`, ¿qué acción realizará Spring Data JPA en la base de datos?
5. **(Diseño / Front-Back)** Si el atributo en Java se llama `fechaNacimiento` y en TypeScript escribes `birthDate`, ¿qué valor mostrará la plantilla de Angular?
6. **(Integración / Angular)** Escribe el bloque de código utilizando `.pipe(mergeMap(...))` que obtenga primero la información de un alumno y luego sus notas asociadas.