const contenedorCarrito = document.getElementById('carrito'); 
const shoppingCartIcon = document.getElementById('shoppingCartIcon');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', actualizarCarrito);

contenedorCarrito.style.display = 'none';

shoppingCartIcon.addEventListener('click', () => {
    contenedorCarrito.style.display = contenedorCarrito.style.display === 'none' ? 'block' : 'none';
});

function agregarAlCarrito(id, name, price, image_url) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.quantity += 1;
    } else {
        carrito.push({id, name, price, image_url, quantity: 1});
    }
    actualizarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        title: '¡Añadido!',
        text: `${name} se ha añadido al carrito.`,
        icon: 'success',
        imageUrl: './img/cat-car.png', 
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Producto añadido',
        confirmButtonText: 'OK'
    });
}

function actualizarCarrito() {
    contenedorCarrito.innerHTML = '';
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }
    const listaCarrito = document.createElement('div');
    listaCarrito.className = 'carrito-contenedor-cards';
    carrito.forEach(item => {
        const itemCarrito = document.createElement('div');
        itemCarrito.className = 'card';
        itemCarrito.innerHTML = `
            <img src="${item.image_url}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">$${item.price} x ${item.quantity}</p>
                <button class="btn btn-danger" onclick="confirmarEliminar('${item.id}')">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(itemCarrito);
    });

    const precioTotal = carrito.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalElemento = document.createElement('div');
    totalElemento.className = 'total';
    totalElemento.innerHTML = `Total: $${precioTotal.toFixed(2)}`;

    const botonFinalizarCompra = document.createElement('button');
    botonFinalizarCompra.className = 'terminar-compra';
    botonFinalizarCompra.textContent = 'Finalizar Compra';
    botonFinalizarCompra.addEventListener('click', () => {
        Swal.fire({
            title: '¡Gracias!',
            text: 'Tu pedido ha sido realizado.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        carrito = [];
        localStorage.removeItem('carrito');
        actualizarCarrito();
    });


    contenedorCarrito.appendChild(totalElemento);
    contenedorCarrito.appendChild(botonFinalizarCompra);
    contenedorCarrito.appendChild(listaCarrito);
}

function confirmarEliminar(productId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Este producto se eliminará del carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarDelCarrito(productId);
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El producto ha sido eliminado del carrito.',
                icon: 'success',
                imageUrl: './img/Cat-eliminar.avif', 
                imageWidth: 100,
                imageHeight: 100,
                imageAlt: 'Producto eliminado',
                confirmButtonText: 'OK'
            });
        }
    });
}

function eliminarDelCarrito(productId) {
    const producto = carrito.find(item => item.id === productId);
    if (producto) {
        if (producto.quantity > 1) {
            producto.quantity -= 1;
        } else {
            carrito = carrito.filter(item => item.id !== productId);
        }
    }
    actualizarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
