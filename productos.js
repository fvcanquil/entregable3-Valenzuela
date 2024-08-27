const API_URL = 'https://fake-coffee-api.vercel.app/api?limit=6';
const JSON_URL = './assets/productos.json'; 
const main = document.getElementById("main");

const obtenerProductos = async () => {
    try {
        let res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al obtener los datos de la API');
        let data = await res.json();
        mostrarProductos(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        try {
            let localRes = await fetch(JSON_URL);
            let localData = await localRes.json();
            mostrarProductos(localData);
        } catch (localError) {
            console.error('Error al obtener datos del archivo JSON:', localError);
            main.innerHTML = '<p>Ocurrió un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    }
};

const mostrarProductos = (productos) => {
    main.innerHTML = "";
    productos.forEach((e) => {
        main.innerHTML += `
        <div class='card'> 
            <h3>${e.name}</h3>
            <img src="${e.image_url}"/> 
            <p class="precio">$${e.price}</p>
            <p>${e.description}</p>                
            <button class="btnSeleccionar" onclick="agregarAlCarrito('${e._id}', '${e.name}', ${e.price}, '${e.image_url}')">Seleccionar</button>
        </div>
        `;
    });
};

obtenerProductos();

