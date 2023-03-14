const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'H', 'D', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    let puntosJugadores = [];

    const btnNuevo = document.querySelector('#btnNuevo'),
          btnDetener = document.querySelector('#btnDetener'),
          btnPedir = document.querySelector('#btnPedir');
    const smalls = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');




    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
        }

        smalls.forEach(elem => elem.innerText = 0)
        divCartasJugadores.forEach(elem => elem.innerHTML = '')

        btnPedir.disabled = false;
        btnDetener.disabled = false;

}

    // funcion permite mezclar deck
    const crearDeck = () => {
        deck = [];
        for(let i = 2; i <= 10; i++) {
            for(let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
        for(let tipo of tipos) {
            for(let especial of especiales) {
                deck.push(especial + tipo)
            }
        };
    return _.shuffle(deck);
    }


    // Esta funcion me permite tomar una carta

    const pedirCarta = () => {

        if(deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.shift();
    }
    // pedirCarta()

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : valor * 1

    }

    // Turno de la compu


    // Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugadores = acumularPuntos(carta, 0);

        crearCarta(carta, 0);


        if(puntosJugadores > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCompu(puntosJugadores);
        } else if (puntosJugadores === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCompu(puntosJugadores);
        }
    })

    btnDetener.addEventListener('click', () => {  
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu(puntosJugadores[0])
    })

    btnNuevo.addEventListener('click', () => {

        iniciarJuego();

    })

    const crearCarta = (carta , turno) => {
        const imgCarta = document.createElement('img');
            imgCarta.src = `./assets/cartas/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta)
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputador] = puntosJugadores;

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
        }, 800);
    }

    const turnoCompu = (puntosMinimos) => {

        let puntosComputador = 0;

        do {
            const carta = pedirCarta();
            puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
        
    }

    return {
        nuevoJuego: iniciarJuego
    };

})();
