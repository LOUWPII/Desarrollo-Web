---
tags:
  - rxjs
  - debounceTime
  - busqueda
aliases:
  - Buscador Optimizado Tipo Google
  - debounceTime
  - fromEvent
clase: Caso de Uso Práctico 1: Buscador Optimizado Tipo Google
timestamp: 41:00 - 52:00
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Buscador Optimizado Tipo Google con RxJS

## Definición

Es la implementación práctica de una barra de búsqueda optimizada que captura los eventos del DOM en tiempo real y utiliza una tubería (`.pipe()`) de [RxJS](<06%20-%20Tuberias%20Pipes%20y%20Operadores%20de%20Transformacion.md>) para prevenir la saturación de peticiones hacia el servidor backend.

## Operadores Clave Utilizados

- `fromEvent(elemento, evento)`: Convierte un evento nativo del DOM (como `keyup`) en un Observable.
- `debounceTime(ms)`: Retarda las emisiones hasta que haya transcurrido un lapso de inactividad de `ms` milisegundos sin que ocurran nuevos eventos.
- `trim()`: Método de cadena para eliminar espacios vacíos al inicio y al final.

---

## Implementación Técnica (Código del Profesor)

```javascript
// script.js (Captura en el DOM)
const { fromEvent } = rxjs;
const { map, filter, debounceTime, distinctUntilChanged } = rxjs.operators;

const buscarInput = document.getElementById('buscar');

// Creación del flujo reactivo a partir del evento 'keyup'
fromEvent(buscarInput, 'keyup')
  .pipe(
    // 1. Extrae el valor textual del evento HTML
    map((event) => event.target.value),
    // 2. Limpia espacios en blanco innecesarios
    map((text) => text.trim()),
    // 3. Pausa la emisión durante 500 ms de inactividad
    debounceTime(500),
    // 4. Si el texto no cambió respecto a la búsqueda anterior, lo ignora
    distinctUntilChanged(),
    // 5. Exige un mínimo de 3 caracteres para autorizar la búsqueda
    filter((text) => text.length >= 3)
  )
  .subscribe((busqueda) => {
    console.log('Realizando petición limpia al backend con:', busqueda);
  });
```

---

## Evaluación de Flujo de Entrada

Si el usuario teclea rápidamente la palabra **"hola"**:

1. Teclea `'h'` ➔ `debounceTime` inicia temporizador de 500 ms.
2. Teclea `'o'` (a los 100 ms) ➔ `debounceTime` reinicia el temporizador.
3. Teclea `'l'` (a los 100 ms) ➔ `debounceTime` reinicia el temporizador.
4. Teclea `'a'` (a los 100 ms) ➔ `debounceTime` reinicia el temporizador.
5. Pasan 500 ms sin teclear ➔ El valor `"hola"` atraviesa la tubería y realiza **una única petición HTTP**.

---

## Errores Comunes

- **Establecer un `debounceTime` demasiado alto o bajo:** Un tiempo muy bajo (ej. 50 ms) no evitará las peticiones intermedias; un tiempo muy alto (ej. 2000 ms) hará que la interfaz se sienta lenta e insensible.

## Buenas Prácticas

- Configurar tiempos de `debounceTime` entre 300 ms y 500 ms para equilibrar rendimiento e interactividad.
- Filtrar siempre cadenas vacías o de longitud menor a un umbral razonable (ej. `text.length >= 3`).

## Relación con otros conceptos

- Aplica operadores de: [06 - Tuberias Pipes y Operadores de Transformacion](<06%20-%20Tuberias%20Pipes%20y%20Operadores%20de%20Transformacion.md>)
- Se integra con llamadas reales en: [10 - Consumo de API REST con HttpClient en Angular 19](<10%20-%20Consumo%20de%20API%20REST%20con%20HttpClient%20en%20Angular%2019.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Cómo logra el operador `debounceTime` reducir el número de llamadas a un servidor cuando un usuario escribe en un campo de texto?
2. **Aplicación:** Escribe una tubería de RxJS que escuche el evento `input` de un campo HTML y emita el valor solo si tiene más de 5 caracteres.

## Fuente

- **Clase:** Caso de Uso Práctico 1: Buscador Optimizado Tipo Google
- **Timestamp:** 41:00 - 52:00

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
