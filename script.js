const URL = 'https://fake-coffee-api.vercel.app/api?limit=2';
const main = document.getElementById("main");
const contenedorCarrito = document.getElementById('carrito'); 


let carrito = [];


const mostrarProductos = (arrayCoffee) => {
    main.innerHTML = "";
    arrayCoffee.forEach((e) => {
        main.innerHTML += `
        <div class='card'> 
            <h3>${e.name}</h3>
            <img src="${e.image_url}"/> 
            <p>${e.description}</p>
            <p>${e.flavor_profile}</p>
            <p>$${e.price}</p>
            <button class="btnSeleccionar" onclick="agregarAlCarrito('${e._id}', '${e.name}', ${e.price}, '${e.image_url}')">Seleccionar</button>
        </div>
        `;
    });
};

const obtenerProductos = async () => {
    try {
        let res = await fetch(URL);
        let data = await res.json();

        let productosCoffe = data.map((e) => {
            return {
                name: e.name,
                _id: e._id,
                image_url: e.image_url,
                description: e.description,
                flavor_profile: e.flavor_profile,
                price: e.price,
            };
        });
        mostrarProductos(productosCoffe);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

obtenerProductos();


function agregarAlCarrito(id, name, price, image_url) {
    console.log("se agrego algo");
    const producto = { id, name, price, image_url };
    carrito.push(producto);
    actualizarCarrito();


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
                <p class="card-text">$${item.price}</p>
                <button class="btn btn-danger" onclick="confirmarEliminar('${item.id}')">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(itemCarrito);
    });

  
    const precioTotal = carrito.reduce((total, item) => total + Number(item.price), 0);
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
        actualizarCarrito();
    });

    contenedorCarrito.appendChild(listaCarrito);
    contenedorCarrito.appendChild(totalElemento);
    contenedorCarrito.appendChild(botonFinalizarCompra);
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
            Swal.fire(
                '¡Eliminado!',
                'El producto ha sido eliminado del carrito.',
                'success'
            );
        }
    });
}


function eliminarDelCarrito(productId) {
    console.log ('Se elimino algo')
    carrito = carrito.filter(item => item.id !== productId);
    actualizarCarrito();
}
