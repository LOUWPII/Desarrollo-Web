---
tags:
  - compose
  - navegacion
  - prop-drilling
  - kotlin
aliases:
  - Navegación Condicional
  - Prop Drilling
  - showEdit
clase: Navegación Condicional al Perfil de Usuario y Ocultamiento de Botones de Gestión (showEdit)
timestamp: ~80:00 - 90:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Navegación Condicional y Prop Drilling en Compose

## Definición

Es la técnica de reutilización de vistas visuales (`UserProfileScreen`) mediante la parametrización de rutas de navegación condicionales (`showEdit: Boolean`), combinada con la elevación y transmisión de eventos a través de múltiples componentes visuales anidados (**Prop Drilling**).

## Configuración de Ruta Condicional (`AppNavigation.kt`)

```kotlin
composable(
    route = "userProfile/{userId}/{showEdit}",
    arguments = listOf(
        navArgument("userId") { type = NavType.StringType },
        navArgument("showEdit") { type = NavType.BoolType; defaultValue = false }
    )
) { backStackEntry ->
    val userId = backStackEntry.arguments?.getString("userId") ?: ""
    val showEdit = backStackEntry.arguments?.getBoolean("showEdit") ?: false
    
    UserProfileScreen(
        userId = userId, 
        showEdit = showEdit, 
        onBack = { navController.popBackStack() }
    )
}

```

---

## Reglas de Experiencia de Usuario (UX)

- **Acceso desde el Feed (Clic en foto de autor):** Navega a `userProfile/UID_OTRO/false`. Oculta los botones de "Editar" y "Eliminar".
- **Acceso desde Mi Perfil (Menú Lateral):** Navega a `userProfile/MI_UID/true`. Despliega los botones de gestión.

---

## Flujo de Prop Drilling para Eventos de Clic

El evento de clic en la imagen del autor se eleva a través de la jerarquía de Composables mediante lambdas:

```text
TweetCardHeader (clickable)
  └──> TweetCard (onProfileClick)
         └──> HomeScreen (onProfileClick)
                └──> AppNavigation (navController.navigate("userProfile/..."))

```

```kotlin
// TweetCardHeader.kt
Image(
    painter = rememberAsyncImagePainter(tweet.profileImage),
    contentDescription = null,
    modifier = Modifier
        .size(40.dp)
        .clip(CircleShape)
        .clickable { onTweetProfileImageClicked(tweet.userId) } // Transmite el userId del autor
)

```

---

## Errores Comunes

- ⚠️ **Errores de firma por agregar parámetros a entidades globales:** Agregar `userId` a `TweetInfo` requiere actualizar las firmas de todos los objetos de prueba en previews y listas en memoria.

## Buenas Prácticas

- Usar argumentos booleanos con valores por defecto en la tabla de navegación para controlar permisos visuales de edición.

## Relación con otros conceptos

- Transmite los parámetros extraídos en: [01 - Reorganizacion de UI y Migracion de Identificadores a String](<../RETROFIT/01%20-%20Reorganizacion%20de%20UI%20y%20Migracion%20de%20Identificadores%20a%20String.md>)
- Consume la lista de tweets procesados en: [07 - Mapeo Manual del Document ID y Consultas con Filtros](<07%20-%20Mapeo%20Manual%20del%20Document%20ID%20y%20Consultas%20con%20Filtros.md>)

## Preguntas de repaso

1. **Comprensión:** ¿En qué consiste el fenómeno de *Prop Drilling* en Jetpack Compose y cómo se resuelve la elevación de eventos?
2. **Aplicación:** Escribe la definición de un `composable` de navegación que acepte un parámetro de ruta de tipo booleano con un valor por defecto.

## Fuente

- **Clase:** Navegación Condicional al Perfil de Usuario y Ocultamiento de Botones de Gestión (showEdit)
- **Timestamp:** ~80:00 - 90:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
