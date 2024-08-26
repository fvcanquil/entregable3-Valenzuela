const URL = 'https://fake-coffee-api.vercel.app/api'

const main = document.getElementById("main"); // Asegúrate de que este ID exista en tu HTML

const cards = (arrayCoffee) => {
    main.innerHTML = ""; // Limpia el contenido anterior
    arrayCoffee.forEach((e) => { // Usé `arrayCoffee` en lugar de `productosCoffe`
        main.innerHTML += `
        <div> 
            <h3>${e.name}</h3>
            <img src="${e.image_url}"/> 
            <p>${e.description}</p>
            <p> ${e.flavor_profile}</p>
            <p>$${e.price}</p>
        </div>
        `;
    });
}

const ArrayCoffeeCat = async () => {
    try {
        let res = await fetch(URL);
        let data = await res.json();

        console.log(data); // Muestra los datos en la consola

        let productosCoffe = data.map((e) => {
            return {
                name: e.name,
                _id: e._idid,
                image_url: e.image_url, 
                description: e.description,
                flavor_profile: e.flavor_profile,            
                price: e.price,
                
            };
        });
        cards(productosCoffe); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

ArrayCoffeeCat(); 





    
// Resto de las funciones (eliminarDelCarrito, actualizarCarrito)


 //document.querySelectorAll('.btn-outline-primary').forEach(button => {
 //    button.addEventListener('click', function() {
        // Encuentra el formulario dentro de la misma tarjeta
 //        const card = this.closest('.card');
 //        const form = card.querySelector('form');
        
        // Alterna la visibilidad del formulario
  //       if (form.classList.contains('hidden-form')) {
   //          form.classList.remove('hidden-form');
    //     } else {
    //         form.classList.add('hidden-form');
 //        }
 //    });
 //});



    
