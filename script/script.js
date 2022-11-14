/* //console.log('Hola JS')
//var miTexto = 'Hola JS!' // 'var' NO SE USA MAS
//console.log(miTexto)

// let (Se puede reasignar valor) y const (No se puede reasugnar el valor)

const miTextoConstante = 'Hola JS ;)';
console.log(miTextoConstante)

let miVariable = 16;
let miTextoVariable = 'Mi numero';
console.log(miVariable)
console.log(miTextoVariable)

// Operaciones Basicas
// Con Numeros

const numeroA = 10;
const nuemroB = 15;
const resultado = numeroA * nuemroB + ' Sapeee';

console.log(resultado)

// Strings

const textoA = 'hellomoto';
const textoB = ' Chieaang';
const concatenar = (textoA + textoB + ' Saludos' );

console.log(concatenar)

// Practica

/* const numero = prompt ('ingresa un numero');

console.log('Ingresaste un ' + numero);

alert ('Ingresaste un ' + numero) */

/* const nombre = prompt ('Hola, como es tu nombre?');

alert ('Hola ' + nombre + '.\nBienvenido a la Web');

const numero1 = parseFloat (prompt('ingresa un numero'));
const numero2 = parseFloat (prompt('ingresa otro numero'));

alert ('El resultado es: ' + (numero1 + numero2)); */

// Condicionales

/* const edad = prompt ('ingrese su edad');

if (edad >= 18) {
    console.log ('sos mayor');
} else {
    console.log ('todavia sos un pete');
} */

/* let nota = parseFloat (prompt('ingrese nota'))

if (isNaN(nota)) {
    alert ('no ingresaste un nunmero valido');
}

const condicion2 = nota < 7;

if (nota < 3) {
    alert ('sos un pete, desaprobaste feo, anda a estudiar, tu nota es: ' + nota)
} else if (condicion2) {
    alert ('desaprobaste, sos un pete, anda a estudiar, tu nota es: ' + nota)
} else {
    alert ('felicitaciones seguis siendo un pete pero aprobaste con: ' + nota)
} */
/* 
for (let a = 0; a < 16; a++) {
    console.log(a)
} */

// CALCULADORA DE DOSIS PEDIATRICA IBUPROFENO
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

const presentacion = prompt('Elija la presentacion del jarabe: Presione "1" si la presentacion esta expresada en porcetaje. Presione "2" si la presentacion esta expresada en "mg/dl"')

switch (presentacion) {

    case '1': {
        let porcetaje = prompt('Ingrese "a" si la presentacion es al 2%. Ingrese "b" si la presentacion es al 4%')
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






