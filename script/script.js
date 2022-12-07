//  Farmacia JS

//alert('BIENVENIDO! \nEsta app sirve para armar un listado de medicamentos en comprimidos.')

const farmacos = [
    {
        id: 1,
        name: 'Diclofenac Sodico',
        comercialName: 'Rodinac 75',
        miligram: 75,
        amount: 15,
        boxes: 5,
        price: 800,
        photo: 'https://geminisfarmaceutica.com.ar/wp-content/uploads/2016/09/productos31.jpg'
    },
    {
        id: 2,
        name: 'Diclofenac Sodico',
        comercialName: 'Diclogesic 75',
        miligram: 75,
        amount: 30,
        boxes: 10,
        price: 1600,
        photo: 'https://trbpharma.com/_site/wp-content/uploads/2020/12/23.-Diclogesic75x10-2650-05-110x57-copia.jpg'
    },
    {
        id: 3,
        name: 'Diclofenac Potasico',
        comercialName: 'Blokium P 75',
        miligram: 75,
        amount: 10,
        boxes: 15,
        price: 1200,
        photo: 'https://www.casasco.com.ar/wp-content/uploads/2018/04/Pack_web-24_blokiumP.jpg'
    },
];

/* class FarmacoComprimido {
    constructor() {
        this.id = farmacos.length + 1;
        this.name = prompt('Ingresa el nombre quimico del farmaco');
        this.comercialName = prompt('Ingresa el nombre comercial del farmaco');
        this.miligram = parseInt(prompt('Ingrese la candidad en miligramos del comprimido '));
        this.amount = parseInt(prompt('Ingrese la cantidad de comprimidos de la presentacion'));
        this.boxes = parseInt(prompt('Ingrese la cantidad de cajas del farmaco en existencia'));
        this.price = parseInt(prompt('Ingrese el precio por caja'))
        this.photo = prompt('Ingrese la url de la foto del producto')
    }
}

let opciones = prompt('MENU \nIngrese: \n1 para agregar farmacos, \n2 para mostrarlos, \n3 para eliminar un farmaco, \n0 para salir');

const agregarFarmacos = () => {
    const newFarmaco = new FarmacoComprimido();
    farmacos.push(newFarmaco);
    console.log(farmacos);
}

const mostrarFarmacos = () => {
    console.log('Sus Farmacos son:')
    farmacos.forEach((farmaco, index) => {
        console.log(index + 1, farmaco)
    })
}

const eliminarFarmacos = () => {

}


const menu = (opcion) => {
    switch (opcion) {
        case '1':
            agregarFarmacos();
            break
        case '2':
            mostrarFarmacos();
            break
        case '3':
            eliminarFarmacos();
        break
        default:
            alert('Intente nuevamente');
    }
    opciones = prompt('MENU \nIngrese: \n1 para agregar farmacos, \n2 para mostrarlos, \n3 para eliminar un farmaco, \n0 para salir');
}

while (opciones !== '0') {
    menu(opciones)
} */

let contenedor = document.getElementById ('contenedor');

const mostrarFarmacosHtml = (farmacos, contenedor) => {
    let acumulador = '';
    farmacos.forEach(element => {
        acumulador += `
        <div class="card" style="width: 18rem;">
            <img src="${element.photo}" class="card-img-top" alt="${element.comercialname}">
            <div class="card-body">
                <h5 class="card-title">${element.comercialName}</h5>
                <p class="card-text">${element.name +' '+ element.miligram + 'mg x ' + element.amount + ' comprimidos.'}</p>
                <p class="card-text">Cajas: ${element.boxes + '  disponibles'}</p>
                <p class="card-text">Precio: ${'$ ' + element.price}</p>
                <a href="#" class="btn btn-primary">Comprar</a>
            </div>
        </div>
        `
    })
    contenedor.innerHTML = acumulador;
}
mostrarFarmacosHtml(farmacos,contenedor)

const handleSearch = (e) => {
    console.log(e.target.value)

    const filtrarFarmacos = farmacos.filter(farmaco => farmaco.name.toLowerCase().includes(e.target.value.toLowerCase()))

    mostrarFarmacosHtml(filtrarFarmacos, contenedor)
}

inputSearch.addEventListener('input', handleSearch)