// CODER E-COMMERCE ASYNC
const token = 'TEST-6794867399656851-122914-534f4a4375b03fae0321ec8aefa75263-255438701';

const precioDolarText = document.getElementById('precio-dolar');
const modalCompra = new bootstrap.Modal(document.getElementById('modal-compra'))
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const btnWeb = document.getElementById('btn-web');
const btnPagar = document.getElementById('btn-pagar');

const JSONResponse = async (data) => {
    const response = await data;
    return await response.json();
}


const spinner = `<div class="d-flex justify-content-center m-auto">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`

const callML = () => {
    return fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA1055');
}

const precioDolar = fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');

// const traerDolar = () => {
//     precioDolar
//     .then(res => res.json())
//     .then(res => {
//         console.log(res);
//         const oficial = res.find(dolar => dolar.casa.agencia === '349');
//         console.log(oficial);
//         precioDolarText.innerText = `Dolar Oficial:  Compra $${oficial?.casa.compra} - Venta $${oficial?.casa.venta}`
//     });
// }

const traerDolar = async () => {
    const respuesta = await JSONResponse(precioDolar);
    console.log(respuesta);
    const oficial = respuesta.find(dolar => dolar.casa.agencia === '349');
    precioDolarText.innerText = `Dolar Oficial:  Compra $${oficial?.casa.compra} - Venta $${oficial?.casa.venta}`

}

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

const pagoML = async (item) => {
    // const response = await fetchML();
    // const responseJSON = await response.json()
    const response = await JSONResponse(fetchML(item))

    console.log(response);
    //REDIRIGIMOS A LA URL DE PAGO
    window.location.href = response.init_point
}



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


let carrito = [];
let productos = [];

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

class Carrito {
    constructor(id, nombre, cantidad, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagen = imagen;
        this.total = precio * cantidad;
    }
}

const contenedor = document.getElementById('contenedor');
const inputSearch = document.getElementById('input-search');
const contenedorCarrito = document.getElementById('contenedor-carrito');


const agregarAlCarrito = (id) => {
    if (!id) {
        return;
    }
    const producto = productos.find(el => el.id === id);

    if (producto) {
        const productoCarrito = new Carrito(producto.id, producto.nombre, 1, producto.precio, producto.imagen);

        if (carrito.some(el => el.id === id)) {
            const target = carrito.find(el => el.id === id);
            carrito = carrito.filter(el => el.id !== id);

            const nuevoProducto = new Carrito(target.id, target.nombre, target.cantidad + 1, target.precio, target.imagen);
            carrito.push(nuevoProducto)
        } else {
            carrito.push(productoCarrito);
        }

    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    listarCarrito(carrito)
}

const listarCarrito = (productosCarrito) => {
    let acumulador = '';

    productosCarrito.forEach((producto) => {
        acumulador += `
        <tr>
        <th scope="row">${producto.id}</th>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.total}</td>
        </tr>
        `
    })
    contenedorCarrito.innerHTML = acumulador;
}

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


const handleSearch = (e) => {
    console.log(e.target.value);

    const filtrados = productos.filter(producto => producto.title.toLocaleLowerCase().includes(e.target.value.toLowerCase()))

    dibujarProductos(filtrados, contenedor)
} 

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    listarCarrito(carrito)

}

getInfo();
traerDolar();

inputSearch.addEventListener('input', handleSearch);
btnPagar.addEventListener('click', irAlPago);

const infoML = fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA1055');
console.log(infoML);

infoML.then((res) => 
   res.json()
)
.then(res => console.log(res))