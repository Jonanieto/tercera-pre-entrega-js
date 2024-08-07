class Producto {
    constructor(nombre, precio, impuesto, descuento) {
        this.nombre = nombre;
        this.precio = precio;
        this.impuesto = impuesto;
        this.descuento = descuento;
    }
}

// Array para almacenar los productos ingresados
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Función para guardar productos en el localStorage
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para calcular el costo final con impuestos y descuentos
function calcularCostoFinal(precio, impuesto, descuento) {
    let precioConImpuesto = precio + (precio * (impuesto / 100));
    let precioFinal = precioConImpuesto - (precioConImpuesto * (descuento / 100));
    return precioFinal.toFixed(2);
}

// Función para ordenar productos por precio 
function ordenarPorPrecioDesc() {
    productos.sort((a, b) => b.precio - a.precio);
}

// Función para ordenar productos por nombre 
function ordenarPorNombreDesc() {
    productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
}

function mostrarProductosOrdenados() {
    let criterio = prompt("¿Cómo deseas ordenar los productos? Ingresa 'precio' o 'nombre':").toLowerCase();
    if (criterio === 'precio') {
        ordenarPorPrecioDesc();
    } else if (criterio === 'nombre') {
        ordenarPorNombreDesc();
    } else {
        alert("Criterio inválido. Mostrando productos sin orden específico.");
    }

    const productosList = document.getElementById('productos-list');
    productosList.innerHTML = '<h2>Productos Ingresados</h2>'; 

    productos.forEach(producto => {
        let productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${producto.nombre}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Impuesto:</strong> ${producto.impuesto}%</p>
            <p><strong>Descuento:</strong> ${producto.descuento}%</p>
            <p><strong>Precio Final:</strong> $${calcularCostoFinal(producto.precio, producto.impuesto, producto.descuento)}</p>
        `;
        productosList.appendChild(productoDiv);
    });
}
// Función para manejar el envío del formulario
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let precio = parseFloat(document.getElementById('precio').value);
    let impuesto = parseFloat(document.getElementById('impuesto').value);
    let descuento = parseFloat(document.getElementById('descuento').value);

    if (nombre && !isNaN(precio) && !isNaN(impuesto) && !isNaN(descuento)) {
        productos.push(new Producto(nombre, precio, impuesto, descuento));
        guardarProductos();
        alert(`Producto ${nombre} agregado correctamente.`);
        document.getElementById('producto-form').reset();
    } else {
        alert("Por favor, completa todos los campos correctamente.");
}

// Función para manejar la selección de la forma de pago del producto
function manejarFormaPago() {
    const formaPago = document.getElementById('forma-pago').value;
    const paypalEmail = document.getElementById('paypal-email');
    const tarjetaNumero = document.getElementById('tarjeta-numero');
    const tarjetaNombre = document.getElementById('tarjeta-nombre');
    const tarjetaFecha = document.getElementById('tarjeta-fecha');
    const tarjetaCodigo = document.getElementById('tarjeta-codigo');

    if (formaPago === 'paypal') {
        paypalEmail.style.display = 'block';
        tarjetaNumero.style.display = 'none';
        tarjetaNombre.style.display = 'none';
        tarjetaFecha.style.display = 'none';
        tarjetaCodigo.style.display = 'none';
    } else if (formaPago === 'tarjeta') {
        paypalEmail.style.display = 'none';
        tarjetaNumero.style.display = 'block';
        tarjetaNombre.style.display = 'block';
        tarjetaFecha.style.display = 'block';
        tarjetaCodigo.style.display = 'block';
    }
}
// Función para confirmar el pago del producto
function confirmarPago() {
    const formaPago = document.getElementById('forma-pago').value;
    if (formaPago === 'paypal') {
        const email = document.getElementById('paypal-email').value;
        alert(`Forma de pago seleccionada: PayPal\nEmail: ${email}`);
        console.log(`Forma de pago seleccionada: PayPal\nEmail: ${email}`);
    } else if (formaPago === 'tarjeta') {
        const numeroTarjeta = document.getElementById('tarjeta-numero').value;
        const nombreTitular = document.getElementById('tarjeta-nombre').value;
        const fechaExpiracion = document.getElementById('tarjeta-fecha').value;
        const codigoSeguridad = document.getElementById('tarjeta-codigo').value;
        alert(`Forma de pago seleccionada: Tarjeta\nNúmero de Tarjeta: ${numeroTarjeta}\nTitular: ${nombreTitular}\nFecha de Expiración: ${fechaExpiracion}\nCódigo de Seguridad: ${codigoSeguridad}`);
        console.log(`Forma de pago seleccionada: Tarjeta\nNúmero de Tarjeta: ${numeroTarjeta}\nTitular: ${nombreTitular}\nFecha de Expiración: ${fechaExpiracion}\nCódigo de Seguridad: ${codigoSeguridad}`);
    } else {
        alert("Forma de pago inválida.");
        console.log("Forma de pago inválida.");
    }
}
// Función para el envío del formulario de comentarios
function manejarEnvioComentario(event) {
    event.preventDefault();
    const nombreUsuario = document.getElementById('nombre-usuario').value;
    const comentario = document.getElementById('comentario').value;

    if (nombreUsuario && comentario) {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.className = 'comentario';
        comentarioDiv.innerHTML = `
            <p><strong>${nombreUsuario}</strong> dice:</p>
            <p>${comentario}</p>
        `;
        document.getElementById('comentarios-list').appendChild(comentarioDiv);
        alert("Comentario enviado correctamente.");
        document.getElementById('comentario-form').reset();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}
 // 
function inicializarSimulador() {
    document.getElementById('producto-form').addEventListener('submit', manejarEnvioFormulario);
    document.getElementById('mostrar-productos').addEventListener('click', mostrarProductosOrdenados);
    document.getElementById('forma-pago').addEventListener('change', manejarFormaPago);
    document.getElementById('confirmar-pago').addEventListener('click', confirmarPago);
    document.getElementById('comentario-form').addEventListener('submit', manejarEnvioComentario);
}

window.onload = inicializarSimulador;
