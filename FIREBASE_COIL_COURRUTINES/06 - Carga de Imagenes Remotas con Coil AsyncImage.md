---
tags:
  - coil
  - asyncimage
  - imagenes
  - compose
aliases:
  - Coil
  - AsyncImage
  - ImageRequest
clase: Carga Remota de Imágenes con la Librería Coil (AsyncImage)
timestamp: ~00:00 - 102:00 min (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Carga de Imágenes Remotas con Coil (AsyncImage)

## Definición

**Coil** (*Coroutine Image Loader*) es una librería de descarga y renderizado de imágenes basada en corrutinas de Kotlin para Android. Su componente principal en Jetpack Compose es **`AsyncImage`**, diseñado para procesar URLs de red de forma asíncrona optimizando el uso de la memoria RAM.

## Componentes del Configurador `ImageRequest`

Para controlar el comportamiento de carga, `AsyncImage` utiliza el patrón *Builder* a través de `ImageRequest.Builder`:

* **`data(...)`:** Recibe la URL remota HTTPS, la ruta local o la `Uri` de la imagen.
* **`crossfade(true)`:** Activa una animación de transición suave al completar la descarga.
* **`placeholder(...)`:** Define el recurso gráfico temporal que se muestra durante la descarga.
* **`error(...)`:** Define el recurso gráfico de respaldo que se dibuja si la descarga falla por red o URL inválida.

---

## Implementación Técnica

```kotlin
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest

@Composable
fun ProfileAsyncImage(
    imageUrl: String?,
    size: Dp = 40.dp,
    modifier: Modifier = Modifier
) {
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data(imageUrl)
            .crossfade(true)
            .build(),
        contentDescription = "Foto de perfil",
        placeholder = painterResource(id = R.drawable.ic_loading_placeholder),
        error = painterResource(id = R.drawable.ic_default_avatar),
        contentScale = ContentScale.Crop, // Recorta manteniendo relación de aspecto
        modifier = modifier
            .size(size)
            .clip(CircleShape) // Recorte circular para avatares
    )
}

```

---

## Errores Comunes

* ⚠️ **Falta del permiso de Internet:** Intentar cargar imágenes remotas con Coil sin declarar `<uses-permission android:name="android.permission.INTERNET" />` en el `AndroidManifest.xml` hará que todas las descargas muestren la imagen de error.

## Buenas Prácticas

* Encapsular `AsyncImage` dentro de composables reutilizables con valores por defecto para unificar la estética de los avatares en toda la aplicación.

## Relación con otros conceptos

* Visualiza las URLs generadas por: [07 - Photo Picker PickVisualMedia Uri y Firebase Storage](<07%20-%20Photo%20Picker%20PickVisualMedia%20Uri%20y%20Firebase%20Storage.md>)
* Se integra en la interfaz lateral en: [09 - Navegacion Lateral ModalNavigationDrawer y Componentes Reutilizables](<09%20-%20Navegacion%20Lateral%20ModalNavigationDrawer%20y%20Componentes%20Reutilizables.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la función de las propiedades `placeholder` y `error` en el composable `AsyncImage`.
2. **Aplicación:** Escribe un composable que dibuje una imagen remota utilizando Coil con recorte circular e integración de `crossfade`.

## Fuente

* **Clase:** Carga Remota de Imágenes con la Librería Coil (AsyncImage)
* **Timestamp:** ~00:00 - 102:00 min (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
