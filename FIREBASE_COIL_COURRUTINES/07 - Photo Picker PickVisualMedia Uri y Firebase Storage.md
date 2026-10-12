---
tags:
  - photo-picker
  - firebase-storage
  - uri
  - android
aliases:
  - PickVisualMedia
  - Firebase Storage
  - Photo Picker
clase: Selector de Imágenes / Firebase Storage y Sincronización del Perfil
timestamp: ~102:00 - 138:00 min (Parte 2)
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Photo Picker (PickVisualMedia), Uri y Firebase Storage

## Definición

Es la integración entre el selector seguro de multimedia de Android (**Photo Picker / `PickVisualMedia`**) para acceder a la galería sin solicitar permisos peligrosos, la representación local de archivos mediante **`Uri`** y su almacenamiento persistente en la nube mediante **Firebase Storage**.

## Acceso Seguro a la Galería con `PickVisualMedia`

El enfoque clásico requería solicitar el permiso `READ_EXTERNAL_STORAGE`. La API moderna `PickVisualMedia` lanza un contrato del sistema que permite al usuario seleccionar archivos sin conceder acceso a todo el dispositivo:

```kotlin
// Configuración del lanzador de la galería en Compose
val photoPickerLauncher = rememberLauncherForActivityResult(
    contract = ActivityResultContracts.PickVisualMedia()
) { uri: Uri? ->
    // Retorna la Uri local seleccionada por el usuario
    uri?.let { onImageSelected(it) }
}

// Invocación restringida a imágenes
Button(onClick = {
    photoPickerLauncher.launch(
        PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)
    )
}) {
    Text("Seleccionar Imagen")
}

```

---

## Subida de Archivos y Obtención de URL Pública (`StorageRemoteDataSource.kt`)

```kotlin
import android.net.Uri
import com.google.firebase.storage.FirebaseStorage
import kotlinx.coroutines.tasks.await
import javax.inject.Inject

class StorageRemoteDataSource @Inject constructor(
    private val storage: FirebaseStorage
) {
    suspend fun uploadProfileImage(userId: String, imageUri: Uri): String {
        // Define la referencia del archivo en la nube
        val ref = storage.reference.child("profile_images/$userId.jpg")
        
        // Sube el archivo binario desde la Uri local
        ref.putFile(imageUri).await()
        
        // Retorna la URL pública HTTPS de descarga
        return ref.downloadUrl.await().toString()
    }
}

```

---

## Sincronización del Perfil en Firebase Auth

Una vez obtenida la URL pública HTTPS desde Storage, se actualiza el objeto `currentUser` del SDK:

```kotlin
suspend fun updateProfilePhoto(photoUrl: String) {
    val user = auth.currentUser
    val request = userProfileChangeRequest {
        photoUri = Uri.parse(photoUrl)
    }
    user?.updateProfile(request)?.await()
}

```

---

## Errores Comunes

* ⚠️ **Solicitar permisos de almacenamiento obsoletos:** Solicitar el permiso clásico `READ_EXTERNAL_STORAGE` en versiones modernas de Android (API 33+) en lugar de usar `PickVisualMedia` redundará en un rechazo por parte de Google Play.

## Buenas Prácticas

* Nombrar los archivos en Firebase Storage utilizando identificadores únicos (como el `userId`) para sobreescribir la imagen previa y no acumular almacenamiento basura en la nube.

## Relación con otros conceptos

* Inyecta la referencia configurada en: [03 - Ecosistema Firebase Arquitectura Hibrida y Version Catalog](<03%20-%20Ecosistema%20Firebase%20Arquitectura%20Hibrida%20y%20Version%20Catalog.md>) y [04 - Inyeccion de Dependencias con Dagger Hilt en Clean Architecture](<04%20-%20Inyeccion%20de%20Dependencias%20con%20Dagger%20Hilt%20en%20Clean%20Architecture.md>)
* Entrega las URLs renderizadas por: [06 - Carga de Imagenes Remotas con Coil AsyncImage](<06%20-%20Carga%20de%20Imagenes%20Remotas%20con%20Coil%20AsyncImage.md>)

## Preguntas de repaso

1. **Comprensión:** Explica la ventaja en términos de privacidad de utilizar `PickVisualMedia` frente a solicitar permisos clásicos de almacenamiento.
2. **Aplicación:** Escribe el método de suspensión que suba una `Uri` local a Firebase Storage y retorne la URL pública de descarga.

## Fuente

* **Clase:** Selector de Imágenes / Firebase Storage y Sincronización del Perfil
* **Timestamp:** ~102:00 - 138:00 min (Parte 2)

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
