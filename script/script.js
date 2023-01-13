// CODER E-COMMERCE ASYNC

//Token ML
const token = 'TEST-6794867399656851-122914-534f4a4375b03fae0321ec8aefa75263-255438701';

// Constantes
const precioDolarText = document.getElementById('precio-dolar');
const modalCompra = new bootstrap.Modal(document.getElementById('modal-compra'))
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const btnWeb = document.getElementById('btn-web');
const btnPagar = document.getElementById('btn-pagar');

// Async ML
const JSONResponse = async (data) => {
    const response = await data;
    return await response.json();
}

// Animacion de espera
const spinner = `<div class="d-flex justify-content-center m-auto">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`;

// Fetch API ML
const callML = () => {
    return fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA1055');
}

// Fetch API ML
const precioDolar = fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');

// Impresion del Dolar en HTML
const traerDolar = async () => {
    const respuesta = await JSONResponse(precioDolar);
    console.log(respuesta);
    const oficial = respuesta.find(dolar => dolar.casa.agencia === '349');
    precioDolarText.innerText = `Dolar Oficial:  Compra $${oficial?.casa.compra} - Venta $${oficial?.casa.venta}`

}

// Fetch para ulilizacion de API de Mercado Pago
const fetchML = (item) => fetch('https://api.mercadopago.com/checkout/preferences', {
    headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
            "items": [
       item
          ]
    })
})

// Async MP
const pagoML = async (item) => {

    const response = await JSONResponse(fetchML(item))

    console.log(response);

    window.location.href = response.init_point
}


// Funcion para Carrito
const irAlPago = (e) => {
    const id = e.target.getAttribute('ref');

    const producto = productos.find(producto => producto.id === id);

    if (!producto) {
        return;
    }

    const item = {
        title: producto.title,
        description: producto.title,
        picture_url: producto.thumbnail,
        category_id: producto.category_id,
        quantity: 1,
        currency_id: "ARS",
        unit_price: producto.price
      }
      btnPagar.innerHTML = spinner;
      pagoML(item)
    
}

//Arrays
let carrito = [];
let productos = [];

//Inyector del spinner y llamada de productos a ML
const getInfo = () => {
    contenedor.innerHTML = spinner;

    callML()
    .then(res => res.json())
    .then((res) => {
        console.log(res);
        productos = [...productos, ...res.results];
        dibujarProductos(productos, contenedor)
    })
    .finally(() =>{
        console.log('termino de cargar')
    })
}

// Constantes para inyectar HTML
const contenedor = document.getElementById('contenedor');
const inputSearch = document.getElementById('input-search');
const contenedorCarrito = document.getElementById('contenedor-carrito');

// Inyector de productos en HTML
const dibujarProductos = (productos, contenedor) => {
    let acumulador = '';

    productos.forEach(element => {
        acumulador += `
        <div class="card" style="width: 18rem;">
            <img src="${element.thumbnail}" class="card-img-top" alt="${element.title}.">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">Cantidad: ${element.available_quantity}</p>
                <p class="card-text">Precio: $ ${element.price.toLocaleString('es', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2
                })}</p>
                <a href="#" onclick="mostrarModal('${element.id}')" class="btn btn-primary">Comprar</a>
            </div>
        </div>
        `
    });
    contenedor.innerHTML = acumulador;
}

// Inyector del modal Carrito
const mostrarModal = (id) =>{
    const producto = productos.find(producto => producto.id === id);

    if (!producto) {
        return;
    }

    modalTitle.innerText = producto.title;
    modalBody.innerHTML = `
        <div class="d-flex flex-row w-100">
            <div>
            <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}.">
            </div>
            <div>
            <h5 class="card-title">${producto.title}</h5>
                <p class="card-text">Cantidad: ${producto.available_quantity}</p>
                <p class="card-text">Precio: $ ${producto.price.toLocaleString('es', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2
                })}</p>
            </div>
        </div>
    `
    btnWeb.href = producto.permalink;

    btnPagar.setAttribute('ref', id);

    modalCompra.show();
}

// Buscador
const handleSearch = (e) => {
    console.log(e.target.value);

    const filtrados = productos.filter(producto => producto.title.toLocaleLowerCase().includes(e.target.value.toLowerCase()))

    dibujarProductos(filtrados, contenedor)
} 

inputSearch.addEventListener('input', handleSearch);

// Llamada a ejecucion de funciones.
getInfo();
traerDolar();

// Boton de pago
btnPagar.addEventListener('click', irAlPago);

// Constante ML
const infoML = fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA1055');
console.log(infoML);

infoML.then((res) => 
   res.json()
)
.then(res => console.log(res))