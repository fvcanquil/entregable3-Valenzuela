const URL = 'https://fake-coffee-api.vercel.app/api?limit=2';
const main = document.getElementById("main");

const mostrarProductos = (arrayCoffee) => {
    main.innerHTML = "";
    arrayCoffee.forEach((e) => {
        main.innerHTML += `
        <div class='card'> 
            <h3>${e.name}</h3>
            <img src="${e.image_url}"/> 
            <h4>${e.flavor_profile}</h4>
            <p>${e.description}</p>      
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
        let productosCoffe = data.map((e) => ({
            name: e.name,
            _id: e._id,
            image_url: e.image_url,
            description: e.description,
            flavor_profile: e.flavor_profile,
            price: e.price,
        }));
        mostrarProductos(productosCoffe);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

obtenerProductos();
