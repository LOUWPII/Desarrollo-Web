---
tags:
  - compose
  - layouts
  - column
  - row
  - box
aliases:
  - Layouts Básicos
  - Column
  - Row
  - Box
  - Recursos R
clase: Renderizado de Imágenes y Gestión de Recursos / Contenedores de Diseño
timestamp: ~30:00 - 45:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Layouts Básicos (Column, Row, Box) y Recursos R

## Definición

Los **Contenedores de Diseño** (*Layouts*) son composables encargados de alinear y organizar a otros composables hijos dentro del espacio bidimensional y tridimensional. La **Clase `R`** es una referencia autogenerada por Android que mapea los recursos estáticos guardados dentro de la carpeta `res/` (imágenes, fuentes, cadenas).

## Contenedores Primarios

```text
  ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
  │    Column     │        │      Row      │        │      Box      │
  ├───────────────┤        ├───────────────┤        ├───────────────┤
  │ [ Elemento 1 ]│        │ [El 1] [El 2] │        │ ┌───────────┐ │
  │ [ Elemento 2 ]│        └───────────────┘        │ │El 2 (Top) │ │
  │ [ Elemento 3 ]│                                 │ │┌─────────┐│ │
  └───────────────┘                                 │ ││El 1(Bck)││ │
                                                    │ └└─────────┘┘ │
  Organiza en eje          Organiza en eje          Superpone en    │
  VERTICAL                 HORIZONTAL               eje Z (Capas)   │
                                                    └───────────────┘

```

---

## Importación Correcta de la Clase `R`

Al trabajar con imágenes o gráficos vectoriales mediante `painterResource`, es imprescindible importar la clase `R` correspondiente al **paquete propio de la aplicación** y no las clases `R` de dependencias internas de Android.

```kotlin
// ✅ Correcto: Clase R de la aplicación propia
import com.example.twitterfalso.R

// ❌ Incorrecto: Clase R genérica del sistema
import android.R

```

---

## Implementación Técnica

```kotlin
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.painterResource
import com.example.twitterfalso.R

@Composable
fun TarjetaUsuarioConFondo() {
    Box {
        // Capa inferior: Imagen de fondo
        Image(
            painter = painterResource(id = R.drawable.ic_launcher_background),
            contentDescription = "Fondo de tarjeta"
        )
        // Capa superior: Columna con información
        Column {
            Text(text = "Nombre de Usuario")
            Text(text = "@usuario_tag")
        }
    }
}

```

---

## Errores Comunes

* **Renderizado encimado por falta de contenedor:** No especificar un contenedor (`Column`, `Row` o `Box`) provocará que los composables se rendericen uno encima del otro por defecto en la esquina superior izquierda `(0,0)`.
* **Omitir `contentDescription`:** Dejar la descripción de contenido vacía en imágenes informativas perjudica la accesibilidad de la app para usuarios que utilizan lectores de pantalla (*TalkBack*).

## Buenas Prácticas

* Asignar siempre un valor descriptivo a `contentDescription` en componentes `Image`, salvo que la imagen sea puramente decorativa (en cuyo caso se pasa `null`).

## Relación con otros conceptos

* Organiza componentes de tipo: [02 - Composables Previews y Unidades de Medida](<02%20-%20Composables%20Previews%20y%20Unidades%20de%20Medida.md>)
* Utiliza las reglas de posicionamiento de: [04 - Reglas de Modificadores Modifier y Patron Oficial de Google](<04%20-%20Reglas%20de%20Modificadores%20Modifier%20y%20Patron%20Oficial%20de%20Google.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Qué ocurre visualmente en la pantalla si colocas tres elementos `Text` seguidos sin introducirlos dentro de una `Column` o `Row`?
2. **Aplicación:** ¿En qué escenario del diseño de una interfaz es recomendable utilizar un contenedor `Box` en lugar de una `Column`?

## Fuente

* **Clase:** Renderizado de Imágenes y Gestión de Recursos / Contenedores de Diseño
* **Timestamp:** ~30:00 - 45:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
