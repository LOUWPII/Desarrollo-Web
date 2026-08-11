// ==========================================
// 1. ESTADO DE LA APLICACIÓN Y DATOS INICIALES
// ==========================================

// Lista inicial de productos en la tienda (mínimo 6 atributos por producto)
// 1. id, 2. nombre, 3. precio, 4. imagen, 5. atributo1, 6. atributo2, 7. atributo3
const productos = [
    {
        id: 1,
        nombre: "Curso de Python",
        precio: 25000,
        imagen: "https://via.placeholder.com/150",
        atributo1: "Programación",
        atributo2: "Backend",
        atributo3: "Nivel Inicial"
    },
    {
        id: 2,
        nombre: "Libro JavaScript",
        precio: 15000,
        imagen: "https://via.placeholder.com/150",
        atributo1: "Libros",
        atributo2: "Desarrollo Web",
        atributo3: "Tapa Blanda"
    }
];

// Arreglo donde guardaremos los productos agregados al carrito
let carrito = [];

// ==========================================
// 2. SELECCIÓN DE ELEMENTOS DEL DOM
// ==========================================

// Contenedor donde se insertarán las tarjetas de productos
const contenedorProductos = document.getElementById("contenedor-productos");

// Elementos de la tabla del carrito
const contenedorItemsCarrito = document.getElementById("items-carrito");
const botonVaciarCarrito = document.getElementById("btn-vaciar-carrito");

// Elementos del formulario
const formularioAgregarProducto = document.getElementById("formulario-agregar-producto");

// ==========================================
// 3. NOTIFICACIONES EMERGENTES
// ==========================================

/**
 * Muestra una notificación emergente (toast) en la esquina superior derecha.
 * @param {string} mensaje - Texto que se mostrará en la notificación.
 * @param {string} tipo - "exito" (verde) o "aviso" (naranja, para advertencias).
 */
function mostrarNotificacion(mensaje, tipo = "exito") {
    // 1. Creamos el elemento <div> de la notificación
    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");

    // 2. Si el tipo es "aviso", agregamos la clase correspondiente
    if (tipo === "aviso") {
        notificacion.classList.add("notificacion-aviso");
    }

    // 3. Insertamos el mensaje dentro de la notificación
    notificacion.textContent = mensaje;

    // 4. Agregamos la notificación al cuerpo de la página
    document.body.appendChild(notificacion);

    // 5. La removemos automáticamente después de 2.5 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 2000);
}

// ==========================================
// 4. FUNCIONES PARA RENDERIZAR PRODUCTOS
// ==========================================

/**
 * Función para renderizar todos los productos en el DOM
 */
function renderizarProductos() {
    // 1. Limpiamos el contenedor para evitar duplicar productos al volver a renderizar
    contenedorProductos.innerHTML = "";

    // 2. Recorremos el arreglo de productos
    productos.forEach((producto) => {
        // Creamos un elemento <div> para la tarjeta
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");

        // Insertamos la estructura HTML interna de la tarjeta usando Template Literals (``)
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <ul>
                <li><strong>Categoría:</strong> ${producto.atributo1}</li>
                <li><strong>Marca:</strong> ${producto.atributo2}</li>
                <li><strong>Garantía:</strong> ${producto.atributo3}</li>
            </ul>
            <p class="precio">$${producto.precio.toLocaleString()}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;

        // 3. Agregamos la tarjeta al contenedor principal en el DOM
        contenedorProductos.appendChild(tarjeta);
    });
}

/**
 * Agrega un producto al carrito por su ID o incrementa su cantidad si ya existe
 */
function agregarAlCarrito(idProducto) {
    // 1. Buscamos si el producto ya está presente en el carrito
    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        // Si ya existe, aumentamos la cantidad en +1
        itemExistente.cantidad++;
    } else {
        // Si no existe, buscamos el producto original en la lista general
        const productoEncontrado = productos.find(p => p.id === idProducto);
        
        // Lo agregamos al carrito con cantidad inicial 1
        carrito.push({
            ...productoEncontrado,
            cantidad: 1
        });
    }

    // Actualizamos la tabla del carrito en la interfaz
    renderizarCarrito();

    // Mostramos una notificación para confirmar la acción al usuario
    mostrarNotificacion("Producto agregado al carrito");
}

/**
 * Renderiza la lista de elementos dentro del menú desplegable del carrito
 */
function renderizarCarrito() {
    // Limpiamos las filas anteriores
    contenedorItemsCarrito.innerHTML = "";

    // Construimos una fila HTML por cada elemento dentro del carrito
    carrito.forEach((item) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td><img src="${item.imagen}" class="imagen-carrito" alt="${item.nombre}"></td>
            <td>${item.nombre}</td>
            <td>$${item.precio.toLocaleString()}</td>
            <td>${item.cantidad}</td>
        `;

        contenedorItemsCarrito.appendChild(fila);
    });
}

/**
 * Elimina todos los elementos de la lista del carrito tanto en memoria como en el DOM
 */
function vaciarCarrito() {
    // Si el carrito ya está vacío, no mostramos nada
    if (carrito.length === 0) {
        mostrarNotificacion("El carrito ya está vacío", "aviso");
        return;
    }

    // Vaciamos el arreglo en JS
    carrito = [];
    // Renderizamos la tabla vacía en HTML
    renderizarCarrito();

    // Mostramos una notificación para confirmar la acción al usuario
    mostrarNotificacion("Carrito vaciado");
}

// Evento para el botón de vaciar carrito
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

// Ejecución inicial para mostrar productos en pantalla
renderizarProductos();

// ==========================================
// 5. FORMULARIO Y VALIDACIÓN DE NUEVO ARTÍCULO
// ==========================================

/**
 * Procesa el envío del formulario para crear un nuevo producto
 */
function manejarNuevoProducto(evento) {
    // 1. Evitamos que la página se recargue automáticamente al enviar el formulario
    evento.preventDefault();

    // 2. Leemos y capturamos los valores ingresados en los inputs
    const nombre = document.getElementById("nombre-producto").value;
    const atributo1 = document.getElementById("atributo-1").value;
    const atributo2 = document.getElementById("atributo-2").value;
    const atributo3 = document.getElementById("atributo-3").value;
    const imagen = document.getElementById("imagen-producto").value;
    const precio = Number(document.getElementById("precio-producto").value);

    // 3. Validar precio mínimo: si es menor a 500 se muestra una notificación de aviso
    if (precio < 1000) {
        mostrarNotificacion("El precio debe ser mayor o igual a $500.", "aviso");
        return; // Detiene la ejecución de la función
    }

    // 4. Creamos el objeto del nuevo producto
    const nuevoProducto = {
        id: Date.now(), // Genera un ID único usando la fecha actual en milisegundos
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        atributo1: atributo1,
        atributo2: atributo2,
        atributo3: atributo3
    };

    // 5. Agregamos el producto a la lista general
    productos.push(nuevoProducto);

    // 6. Volvemos a renderizar la cuadrícula de productos en el DOM
    renderizarProductos();

    // 7. Vaciamos los campos del formulario
    formularioAgregarProducto.reset();

    // 8. Mostramos una notificación para confirmar la acción al usuario
    mostrarNotificacion("Artículo agregado correctamente");
}

// Asignamos el evento 'submit' al formulario
formularioAgregarProducto.addEventListener("submit", manejarNuevoProducto);

