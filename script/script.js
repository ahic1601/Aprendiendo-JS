//  Vademecum

alert('BIENVENIDO! \nEsta app sirve para armar un listado de medicamentos en comprimidos.')

const farmacos = []

class FarmacoComprimido {
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

let opciones = prompt('MENU \nIngrese 1 para agregar farmacos, \n2 para mostrarlos, \n0 para salir');

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


const menu = (opcion) => {
    switch (opcion) {
        case '1':
            agregarFarmacos();
            break
        case '2':
            mostrarFarmacos();
            break
        default:
            alert('Intente nuevamente');
    }
    opciones = prompt('Ingrese 1 para agregar farmacos, 2 para mostrarlos, 0 para salir');
}

while (opciones !== '0') {
    menu(opciones)
}

const container = document.getElementById('contenedor');

let acumulador = '';
for (const farmaco of farmacos) {
    acumulador +=
    `
    <div class="card" style="width: 18rem;">
        <img src="${farmacos.photo}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${farmacos.comercialName}</h5>
            <p class="card-text">${farmacos.name + farmacos.miligram + farmacos.amount + farmacos.price}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
        </div>
    </div>
    `
}

container.innerHTML = acumulador;