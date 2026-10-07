---
tags:
  - express
  - backend
  - rest
  - arquitectura
aliases:
  - Arquitectura Cliente-Servidor
  - API REST
clase: Introducción al Backend, Arquitectura Cliente-Servidor y Herramientas de Desarrollo
timestamp: ~00:00 - 05:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Arquitectura Cliente-Servidor y API REST

## Definición

La **Arquitectura Cliente-Servidor** es un patrón de diseño donde las responsabilidades de la aplicación se dividen entre el cliente (interfaz gráfica) y el servidor (lógica de negocio y persistencia). Una **API REST** (*Representational State Transfer*) es una interfaz de programación que permite la comunicación entre cliente y servidor mediante el protocolo HTTP utilizando datos estructurados en formato **JSON** (*JavaScript Object Notation*).

## Intuición

Piensa en un restaurante:

- **El Cliente:** Es el comensal sentado a la mesa que revisa el menú.
- **La API REST (Mesero):** Toma el pedido formateado (petición HTTP), lo lleva a la cocina y regresa con la comida servida.
- **El Backend (Cocina / Base de Datos):** Prepara los platillos, gestiona la despensa y no permite que los clientes entren directamente a manipular los alimentos por razones de seguridad.

## Estructura de una Petición HTTP

Una petición HTTP enviada desde un cliente (como Postman o un navegador) se compone de:

1. **Request Line:** Define el Método HTTP (`GET`, `POST`, `PUT`, `DELETE`), la URI/endpoint y la versión del protocolo.
2. **Headers (Encabezados):** Metadatos de la petición (ej. `Content-Type: application/json`, tokens de autorización).
3. **Body (Cuerpo):** Payload de datos estructurados enviados al servidor (usado en `POST` y `PUT`).

---

## Métodos HTTP para un CRUD

| Método | Propósito | ¿Lleva Body? | Ejemplo de Endpoint |
| --- | --- | --- | --- |
| **`GET`** | Solicitar/Obtener uno o varios recursos. | **No** | `GET http://localhost:3000/users/1` |
| **`POST`** | Crear un nuevo recurso en el servidor. | **Sí** | `POST http://localhost:3000/users` |
| **`PUT`** | Actualizar un recurso existente de forma completa. | **Sí** | `PUT http://localhost:3000/users/1` |
| **`DELETE`** | Eliminar un recurso del servidor. | **No** | `DELETE http://localhost:3000/users/1` |

---

## Herramientas de Desarrollo Requeridas

1. **Visual Studio Code:** Editor de código fuente.
2. **Postman / Thunder Client:** Cliente HTTP para realizar y probar peticiones a la API.
3. **Node.js:** Entorno de ejecución para JavaScript en el servidor.
4. **PostgreSQL:** Motor de base de datos relacional (SQL).
5. **DBeaver / PGAdmin:** Interfaz gráfica de usuario (GUI) para consultar y administrar la base de datos.

---

## Advertencias Técnicas

- ⚠️ **Manejador vs Motor:** No confundir la herramienta de interfaz gráfica (**DBeaver** o **PGAdmin**) con el motor de base de datos real (**PostgreSQL**).
- En peticiones `GET`, la información identificadora no debe enviarse en el cuerpo, sino mediante parámetros de ruta (`req.params`) o parámetros de consulta (`req.query`).

## Buenas Prácticas

- Asegurar que la API responda utilizando siempre códigos de estado HTTP estandarizados (`200 OK`, `201 Created`, `404 Not Found`, `500 Internal Server Error`).
- Utilizar JSON como formato estándar único para el intercambio de información.

## Relación con otros conceptos

- Es implementado por: [02 - Entorno de Desarrollo Backend con Node Express y Nodemon](<02%20-%20Entorno%20de%20Desarrollo%20Backend%20con%20Node%20Express%20y%20Nodemon.md>)
- Expone datos persistidos por: [03 - Estructura de Proyecto y Conexion a PostgreSQL con Sequelize](<03%20-%20Estructura%20de%20Proyecto%20y%20Conexion%20a%20PostgreSQL%20con%20Sequelize.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Por qué un cliente móvil o web no debe conectarse directamente a una base de datos relacional PostgreSQL?
2. **Comparación:** ¿Qué diferencia estructural existe entre una petición `GET` y una petición `POST` al enviar parámetros identificadores?
3. **Diagnóstico:** Si ejecutas una solicitud `DELETE` a un endpoint y la API retorna un cuerpo JSON con error 400 por enviar parámetros en el body, ¿cuál es la causa sintáctica del fallo?

## Fuente

- **Clase:** Introducción al Backend, Arquitectura Cliente-Servidor y Herramientas de Desarrollo
- **Timestamp:** ~00:00 - 05:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
