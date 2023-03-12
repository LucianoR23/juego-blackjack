let deck = [];
const tipos = ['C', 'H', 'D', 'S']
const especiales = ['A', 'J', 'Q', 'K']
let puntosJugador = 0,
    puntosComputador = 0;

const btnNuevo = document.querySelector('#btnNuevo')
const btnDetener = document.querySelector('#btnDetener');
const btnPedir = document.querySelector('#btnPedir');
const smalls = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasCompu = document.querySelector('#computadora-cartas');

// funcion permite mezclar deck
const crearDeck = () => {
    for(let i = 2; i <= 10; i++) {
        for(let tipo of tipos) {
            deck.push(i + tipo)
        }
        // deck.push(i+'C');
        // deck.push(i+'H');
        // deck.push(i+'D');
        // deck.push(i+'S');
    }
    for(let tipo of tipos) {
        for(let especial of especiales) {
            deck.push(especial + tipo)
        }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck()


// Esta funcion me permite tomar una carta

const pedirCarta = () => {

    if(deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    const carta = deck.shift();

    return carta;
}
// pedirCarta()

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1

    // let puntos = 0;
    // if(isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10
    // } else {
    //     puntos = valor * 1;
    // }
}

// Turno de la compu
const turnoCompu = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputador = puntosComputador + valorCarta(carta);
        smalls[1].innerText = puntosComputador;
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasCompu.append(imgCarta);
        if(puntosMinimos > 21){
            break;
        }
    } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if(puntosComputador === puntosMinimos) {
            alert('Nadie gana')
        } else if (puntosMinimos > 21){
            alert('Computadora gana')
        }  else if (puntosComputador > 21){
            alert('Jugador gana')
        } else {
            alert('Computadora gana')
        }
    }, 20);
    
}


// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText = puntosJugador
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21) {
        console.warn('Jugador pierde');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu(puntosJugador);
    }
})

btnDetener.addEventListener('click', () => {  
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCompu(puntosJugador)
})

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputador = 0;
    smalls[0].innerText = 0;
    smalls[1].innerText = 0;

    divCartasCompu.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

})