//  Farmacia JS

const farmacos = [
    {
        id: 1,
        name: 'Diclofenac Sodico',
        comercialName: 'Rodinac 75',
        miligram: 75,
        amount: 15,
        box: 1,
        price: 800,
        photo: 'https://geminisfarmaceutica.com.ar/wp-content/uploads/2016/09/productos31.jpg',
    },
    {
        id: 2,
        name: 'Diclofenac Sodico',
        comercialName: 'Diclogesic 75',
        miligram: 75,
        amount: 30,
        box: 1,
        price: 1600,
        photo: 'https://trbpharma.com/_site/wp-content/uploads/2020/12/23.-Diclogesic75x10-2650-05-110x57-copia.jpg',
    },
    {
        id: 3,
        name: 'Diclofenac Potasico',
        comercialName: 'Blokium P 75',
        miligram: 75,
        amount: 10,
        box: 1,
        price: 1200,
        photo: 'https://www.casasco.com.ar/wp-content/uploads/2018/04/Pack_web-24_blokiumP.jpg',
    },
];


let contenedor = document.getElementById ('contenedor');
const inputSearch = document.getElementById('input-search');
let contenedorCarrito = document.getElementById('contenedor-carrito');


const mostrarFarmacosHtml = (farmacos, contenedor) => {
    let acumulador = '';
    farmacos.forEach(element => {
        acumulador += `
        <div class="card" style="width: 18rem;">
            <img src="${element.photo}" class="card-img-top" alt="${element.comercialname}">
            <div class="card-body">
                <h5 class="card-title">${element.comercialName}</h5>
                <p class="card-text">${element.name +' '+ element.miligram + 'mg x ' + element.amount + ' comprimidos.'}</p>
                <p class="card-text">Cajas X ${element.box}</p>
                <p class="card-text">Precio: ${'$ ' + element.price}</p>
                <a href="#" onclick="agregarAlCarrito(${element.id})" class="btn btn-primary">Comprar</a>
            </div>
        </div>
        `
    })
    contenedor.innerHTML = acumulador;
}
mostrarFarmacosHtml(farmacos,contenedor)

let carrito = [];

class Carrito {
    constructor(id, comercialName, box, price, photo) {
        this.id = id;
        this.comercialName = comercialName;
        this.box = box;
        this.price = price;
        this.photo = photo;
        this.total = price * box;
    }
}


const agregarAlCarrito = (id) => {
    if (!id) {
        return;
    }
    let producto = farmacos.find(el => el.id === id);
    if (producto) {
        const productoCarrito = new Carrito (producto.id, producto.comercialName, producto.box, producto.price, producto.photo);
        if (carrito.some(el => el.id === id)) {
            const target = carrito.find(el => el.id === id);
            carrito = carrito.filter(el => el.id !== id);
            const nuevoProducto = new Carrito (target.id, target.comercialName, target.box + 1, target.price, target.photo);
            carrito.push(nuevoProducto);
        }else{
            carrito.push(productoCarrito);
        }
    }
    listarCarrito(carrito,contenedorCarrito);
}

const listarCarrito = (productoCarrito, contenedorCarrito) => {
    let acumuLador ='';
    productoCarrito.forEach((producto) => {
        acumuLador += `
        <tr>
            <th scope="row">${producto.id}</th>
            <td>${producto.comercialName}</td>
            <td>$${producto.price}</td>
            <td>${producto.box}</td>
            <td>$${producto.total}</td>
        </tr>
        `
    })
    contenedorCarrito.innerHTML = acumuLador;
    console.log(acumuLador)
}


const handleSearch = (e) => {
    console.log(e.target.value);

    const filtrarFarmacos = farmacos.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()));

    mostrarFarmacosHtml(filtrarFarmacos, contenedor);
};

inputSearch.addEventListener ('input', handleSearch);

