---
tags:
  - angular
  - indice
  - mapa-de-conocimiento
aliases:
  - MOC Angular 19
  - Índice Angular
---

# Índice y Mapa de Conocimiento — Angular 19

> [!info] Punto de entrada
> Este archivo es el **MOC (Map of Content)** del sistema. Cada nota individual enlaza aquí con la línea **← Volver al Índice** que aparece al final de su contenido.

## 1. Estructura de Notas

| # | Nota | Tema |
| --- | --- | --- |
| 01 | [Angular Framework](<01%20-%20Angular%20Framework.md>) | Definición, evolución histórica y comparación framework vs librería |
| 02 | [Angular CLI y Entorno Node](<02%20-%20Angular%20CLI%20y%20Entorno%20Node.md>) | Instalación de Node, npm y CLI versionada |
| 03 | [Arquitectura y Anatomia de un Proyecto Angular](<03%20-%20Arquitectura%20y%20Anatomia%20de%20un%20Proyecto%20Angular.md>) | `ng new`, anatomía de carpetas y configuración |
| 04 | [Componentes en Angular](<04%20-%20Componentes%20en%20Angular.md>) | `@Component`, archivos TS/HTML/SCSS, encapsulamiento |
| 05 | [Control Flow y Sintaxis de Plantillas](<05%20-%20Control%20Flow%20y%20Sintaxis%20de%20Plantillas.md>) | Interpolación, `@if`, `@for` y `track` |
| 06 | [Binding de Propiedades y Recursos Estáticos](<06%20-%20Binding%20de%20Propiedades%20y%20Recursos%20Staticos.md>) | `[prop]="x"` y recursos en `public/` |
| 07 | [TypeScript en Angular e Interfaces vs Clases](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>) | Tipado, `any`, `interface` vs `class` |
| 08 | [Null Safety y Operador Opcional](<08%20-%20Null%20Safety%20y%20Operador%20Opcional.md>) | `?`, `?.` y renderizado condicional |
| 09 | [Comunicación entre Componentes (Inputs y Outputs)](<09%20-%20Comunicacion%20entre%20Componentes%20(Inputs%20y%20Outputs).md>) | `input()`, `output()` y `$event` |
| 10 | [Enrutamiento y Angular Router](<10%20-%20Enrutamiento%20y%20Angular%20Router.md>) | `app.routes.ts`, `<router-outlet>`, orden de rutas |
| 11 | [Servicios e Inyección de Dependencias](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>) | `@Injectable`, Singleton e `inject()` |
| 12 | [Lectura de Parámetros y Navegación Programática](<12%20-%20Lectura%20de%20Parametros%20y%20Navegacion%20Programatica.md>) | `ActivatedRoute`, `Router`, `routerLink` |
| 13 | [Formularios Reactivos y Validaciones](<13%20-%20Formularios%20Reactivos%20y%20Validaciones.md>) | `FormGroup`, `FormControl`, `Validators` |
| 14 | [Reutilización de Formularios (CRUD Create / Update)](<14%20-%20Reutilizacion%20de%20Formularios%20(CRUD%20Create%20Update).md>) | Lógica dual Create/Update y `patchValue()` |

---

## 2. Mapa de Conocimiento

```text
Angular 19 Ecosystem
├── Fundamentos de Arquitectura
│   ├── Angular Framework (01)
│   ├── Entorno y CLI (02)
│   └── Estructura del Proyecto (03)
│
├── Capa de Presentación e Interfaz (UI)
│   ├── Componentes (04)
│   │   ├── Sintaxis e Interpolación (05)
│   │   ├── Property Binding y Assets (06)
│   │   └── Comunicación entre Componentes (09)
│   └── Formularios y Captura de Datos
│       ├── Formularios Reactivos (13)
│       └── Integración CRUD Dual (14)
│
├── Lógica de Negocio y Tipado
│   ├── Modelo de Datos en TypeScript (07)
│   ├── Seguridad contra Nulos (08)
│   └── Servicios e Inyección (11)
│
└── Navegación y Estructura SPA
    ├── Configuración de Rutas (10)
    └── Manejo de Parámetros URL (12)
```

### Explicación de la Relación entre los Conceptos

La aplicación se sostiene sobre la infraestructura global configurada por la **CLI y Node** ([02](<02%20-%20Angular%20CLI%20y%20Entorno%20Node.md>)), la cual define la **Estructura del Proyecto** ([03](<03%20-%20Arquitectura%20y%20Anatomia%20de%20un%20Proyecto%20Angular.md>)) y las reglas del **Framework** ([01](<01%20-%20Angular%20Framework.md>)).

Sobre esta base, la pantalla se divide en **Componentes** ([04](<04%20-%20Componentes%20en%20Angular.md>)), los cuales renderizan las vistas utilizando el **Control Flow** ([05](<05%20-%20Control%20Flow%20y%20Sintaxis%20de%20Plantillas.md>)) y el **Property Binding** ([06](<06%20-%20Binding%20de%20Propiedades%20y%20Recursos%20Staticos.md>)). Para mantener un diseño limpio, los componentes se comunican jerárquicamente a través de **Inputs y Outputs** ([09](<09%20-%20Comunicacion%20entre%20Componentes%20(Inputs%20y%20Outputs).md>)).

La información procesada en las vistas se modela mediante el tipado estricto de **TypeScript e Interfaces** ([07](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>)), protegida contra fallos con el uso de **Null Safety** ([08](<08%20-%20Null%20Safety%20y%20Operador%20Opcional.md>)). La lógica de persistencia y estado no reside en los componentes, sino en los **Servicios**, gestionados por el patrón Singleton e inyectados dinámicamente ([11](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)).

Por último, el **Enrutador** ([10](<10%20-%20Enrutamiento%20y%20Angular%20Router.md>)) orquesta la navegación general del sistema SPA organizando las páginas y transmitiendo **Parámetros de Ruta** ([12](<12%20-%20Lectura%20de%20Parametros%20y%20Navegacion%20Programatica.md>)), los cuales son leídos por los **Formularios Reactivos** ([13](<13%20-%20Formularios%20Reactivos%20y%20Validaciones.md>)) para implementar la **Reutilización del CRUD** ([14](<14%20-%20Reutilizacion%20de%20Formularios%20(CRUD%20Create%20Update).md>)) en el registro y edición de información.

---

## 3. Lo Esencial

1. **Angular 19 es un Framework Estructurado:** Proporciona un ecosistema completo para construir aplicaciones SPA donde el código Frontend nunca se conecta directamente a bases de datos.
2. **Arquitectura Basada en Componentes:** La UI se divide en bloques reutilizables e independientes con estilos aislados, compuestos por archivos HTML, SCSS y TS.
3. **Flujo de Datos Unidireccional:** El traspaso de información desde componentes Padre hacia Hijos se realiza con **Inputs** `input()`, y el flujo inverso mediante la emisión de eventos con **Outputs** `output()`.
4. **Servicios Singleton e Inyección de Dependencias:** La lógica de negocio y el estado global deben alojarse en servicios `@Injectable({ providedIn: 'root' })`, inyectados de forma limpia mediante la función `inject()`.
5. **Formularios Reactivos Controlados:** El estado de las entradas se administra desde TypeScript usando `FormGroup` y `FormControl`, garantizando validaciones síncronas y tipadas.

---

## 4. Debo Saber Hacer

- [ ] Crear un proyecto desde cero usando la CLI de Angular (`ng new`) configurando preprocesadores SCSS. → [03](<03%20-%20Arquitectura%20y%20Anatomia%20de%20un%20Proyecto%20Angular.md>)
- [ ] Generar componentes (`ng g c`) e importar selecciones e hijas de forma explícita en el decorador. → [04](<04%20-%20Componentes%20en%20Angular.md>)
- [ ] Implementar estructuras dinámicas en la plantilla usando la sintaxis moderna `@if` y `@for` con su cláusula obligatoria `track`. → [05](<05%20-%20Control%20Flow%20y%20Sintaxis%20de%20Plantillas.md>)
- [ ] Construir un contrato de datos mediante `export interface` y aplicarlo sobre variables y arreglos en TypeScript. → [07](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>)
- [ ] Implementar la comunicación entre dos componentes mediante `input()` y `output()` utilizando `$event`. → [09](<09%20-%20Comunicacion%20entre%20Componentes%20(Inputs%20y%20Outputs).md>)
- [ ] Configurar un mapa de rutas SPA en `app.routes.ts`, protegiendo el orden secuencial de evaluación. → [10](<10%20-%20Enrutamiento%20y%20Angular%20Router.md>)
- [ ] Crear e inyectar un Servicio Singleton (`ng g s`) consumiéndolo dentro del ciclo de vida `ngOnInit()`. → [11](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>)
- [ ] Construir un formulario con `ReactiveFormsModule` incluyendo validaciones síncronas (`Validators.required`, `pattern`). → [13](<13%20-%20Formularios%20Reactivos%20y%20Validaciones.md>)
- [ ] Implementar la lógica dual de un formulario para creación y edición aprovechando el método `patchValue()`. → [14](<14%20-%20Reutilizacion%20de%20Formularios%20(CRUD%20Create%20Update).md>)

---

## 5. Errores que Debo Evitar

| Error | Consecuencia | Nota relacionada |
| --- | --- | --- |
| **Usar AngularJS (v1)** con `$scope` o directivas obsoletas | Código de 2010 incompatible con proyectos modernos | [01](<01%20-%20Angular%20Framework.md>) |
| **Abusar del tipo `any`** | Desactiva el chequeo de tipos y lleva a fallos en producción | [07](<07%20-%20TypeScript%20en%20Angular%20e%20Interfaces%20vs%20Clases.md>) |
| **Instanciar Servicios con `new`** | Rompe el patrón Singleton; los datos no se comparten | [11](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>) |
| **Alterar el orden de las rutas** (`:id` encima de `new`) | `/student/new` carga el componente de detalle | [10](<10%20-%20Enrutamiento%20y%20Angular%20Router.md>) |
| **Olvidar `$event`** al capturar un Output | El padre no recibe la información del hijo | [09](<09%20-%20Comunicacion%20entre%20Componentes%20(Inputs%20y%20Outputs).md>) |
| **Cargar datos pesados en el constructor** | Se ignora el hook `ngOnInit()` y la inicialización falla | [11](<11%20-%20Servicios%20e%20Inyeccion%20de%20Dependencias.md>) |

---

## 6. Preguntas de Active Recall

1. **(Comprensión / Arquitectura)** ¿Por qué Angular impone la separación entre Componentes y Servicios, y qué consecuencias negativas trae acumular la lógica de datos dentro de un Componente?
2. **(Diagnóstico / Routing)** Un usuario navega a la URL `/student/new` pero la pantalla muestra los datos vacíos del componente `StudentDetailComponent`. ¿Qué error ocurrió en la configuración de las rutas y cómo lo corriges?
3. **(Aplicación / TypeScript)** Si recibes una respuesta de una API que puede devolver la propiedad `photo` o dejarla indefinida, ¿cómo estructuras la interfaz en TypeScript y cómo la consumes en el HTML para evitar excepciones de puntero nulo?
4. **(Comparación / Formularios)** ¿Cuál es la diferencia técnica entre los métodos `patchValue()` y `setValue()` dentro de un `FormGroup` y por qué `patchValue()` es más adecuado para formularios reutilizables?
5. **(Diseño / Performance)** ¿Por qué Angular 19 exige de forma obligatoria el uso de la cláusula `track` dentro de la sintaxis `@for` y qué parámetro se debe seleccionar como valor de rastreo?
