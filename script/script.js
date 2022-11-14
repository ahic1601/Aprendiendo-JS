// CALCULADORA DE DOSIS PEDIATRICA IBUPROFENO

const Bienvenida = 'Bienvenido, aqui podras calcular la dosis pediatrica de ibuprofeno en jarabe segun la edad y el peso del paciente.';

alert (Bienvenida);

let edad = parseFloat(prompt('Ingrese la edad en años del paciente'));
console.log(edad + ' años de edad');
let peso = parseFloat(prompt('Ingrese el peso en kg del paciente'));
console.log(peso + ' Kg de peso');

while (isNaN(edad) || isNaN(peso)) {
    edad = parseFloat(prompt('Ingrese la edad en años del paciente'));
    peso = parseFloat(prompt('Ingrese el peso en kg del paciente'));
}

while (edad < 0.5 || edad < 1 / 2) {
    alert('Pacientes menores de 6 meses no pueden recibir ibuprofeno')
    edad = parseFloat(prompt('Ingrese la edad en años del paciente'));
    peso = parseFloat(prompt('Ingrese el peso en kg del paciente'));
}

const presentacion = prompt('Elija la presentacion del jarabe: Presione "1" si la presentacion esta expresada en porcetaje. \nPresione "2" si la presentacion esta expresada en "mg/dl".')

switch (presentacion) {

    case '1': {
        let porcetaje = prompt('Ingrese "a" si la presentacion es al 2%. \nIngrese "b" si la presentacion es al 4%.')
        switch (porcetaje) {
            case 'a': formulacion = 20
                break;
            case 'b': formulacion = 40
                break;
        }
    }
        break;

    case '2': {
        let mg = parseFloat(prompt('Ingrese los mg de la formulación del jarábe'));
        console.log(mg + ' mg de ibuprofeno');
        let ml = parseFloat(prompt('Ingrese los ml de la formulacion del jarábe'));
        console.log('en ' + ml + ' ml');
        formulacion = (mg / ml);
        console.log(formulacion + ' mg de ibuprofeno por cada ml de jarábe');
    }
        break;
}

if (formulacion === 20) {
    let dosis = (((formulacion / 2) * peso) / formulacion);
    alert('Debe administrar como maximo ' + dosis + ' ml de ibuprofeno jarabe cada 8 hs');
    console.log(dosis + ' ml cada 8hs');
} else if (formulacion === 40) {
    let dosis = (((formulacion / 2) * peso) / formulacion);
    alert('Debe administrar como maximo ' + dosis + ' ml de ibuprofeno jarabe cada 8hs')
    console.log(dosis + ' ml cada 8hs');
}






