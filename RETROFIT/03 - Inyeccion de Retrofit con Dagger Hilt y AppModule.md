---
tags:
  - retrofit
  - android
  - hilt
  - di
aliases:
  - Dagger Hilt
  - AppModule
  - Inyección de dependencias
clase: Configuración del Módulo de Inyección de Dependencias con Hilt (AppModule)
timestamp: ~10:00 - 15:00 min
up: "[Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)"
---

# Inyección de Retrofit con Dagger Hilt y AppModule

## Definición

Es la configuración del patrón de Inyección de Dependencias utilizando **Dagger Hilt** para proveer una instancia Singleton e inmutable del cliente HTTP **Retrofit** y sus convertidores de serialización para toda la aplicación.

## Componentes del Builder de Retrofit

- **`baseUrl(...)`:** Define el dominio base de la API. **Debe finalizar obligatoriamente con una barra diagonal `/`**.
- **`GsonConverterFactory`:** Convertidor que mapea automáticamente respuestas JSON a objetos `data class` de Kotlin usando la librería Gson.
- **`ScalarsConverterFactory`:** Convertidor opcional para leer respuestas crudas en texto plano o cadenas simples.

---

## Configuración en Hilt (`injection/AppModule.kt`)

```kotlin
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun providesRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("http://10.0.2.2:3000/") // ¡Atención a la barra diagonal final!
            .addConverterFactory(GsonConverterFactory.create())
            .addConverterFactory(ScalarsConverterFactory.create())
            .build()
    }
}

```

---

## Errores Comunes

- ⚠️ **`IllegalArgumentException` por falta de `/`:** Si defines `.baseUrl("[http://10.0.2.2:3000](http://10.0.2.2:3000)")` sin la barra final, Retrofit colapsará en tiempo de ejecución al intentar instanciar el cliente.

## Buenas Prácticas

- Asegurar que la función que provee Retrofit lleve las anotaciones `@Provides` y `@Singleton` dentro de `AppModule` para reutilizar una única conexión HTTP en todos los servicios.

## Relación con otros conceptos

- Utiliza la infraestructura configurada en: [02 - Configuracion de Red en Android IP del Emulador y Traffic Permitted](<02%20-%20Configuracion%20de%20Red%20en%20Android%20IP%20del%20Emulador%20y%20Traffic%20Permitted.md>)
- Provee la instancia base para crear los servicios en: [05 - Servicios Retrofit Anotaciones HTTP e Implementacion de DataSources](<05%20-%20Servicios%20Retrofit%20Anotaciones%20HTTP%20e%20Implementacion%20de%20DataSources.md>)

## Preguntas de repaso

1. **Comprensión:** ¿Qué función cumple `GsonConverterFactory` dentro de la cadena del `Retrofit.Builder`?
2. **Diagnóstico:** Si la aplicación colapsa al arrancar con un `IllegalArgumentException` referida a la `baseUrl`, ¿cuál es el detalle sintáctico que debes revisar?

## Fuente

- **Clase:** Configuración del Módulo de Inyección de Dependencias con Hilt (AppModule)
- **Timestamp:** ~10:00 - 15:00 min

---

**← Volver al [Índice y Mapa de Conocimiento](<00%20-%20Indice%20y%20Mapa%20de%20Conocimiento.md>)**
