import * as readlineSync from 'readline-sync';

import { Jugador } from './Jugador';
import { Casino } from './Casino';
import { HotHot } from './HotHot';
import { JokerJoker } from './JokerJoker';
import { Dados } from './Dados';
import { Ruleta } from './Ruleta';
import { HistorialDePartidas } from './historialDePartidas';

let casino = new Casino("codigo de la suerte", 1000000);

let jugador1 = new Jugador ("Juan", 20000);

const joker = new JokerJoker("Tragamonedas_Joker");
const hot = new HotHot("Tragamonedas_Hot");
const dados = new Dados(10000, 500, 2, "Dados", 500);
const ruleta = new Ruleta(1, 1, 1, 1, "", 1, 1, 1, 1, "Ruleta", 20000, 60000, [], ["rojo"], false, []);

casino.setJuegos(joker);
casino.setJuegos(hot);
casino.setJuegos(dados);
casino.setJuegos(ruleta);

// El jugador elige el juego que desea jugar.
elegirJuego(casino);

function elegirJuego(casino: Casino): void {
    let juego: string;
    let seguirJugando = true;
    let juegoSeleccionado: number;

    console.log("Bienvenidos a " + casino.getNombre() + "...\n");

    while (seguirJugando) { 
        console.log("Juegos disponibles:");
        casino.imprimirJuegos();
        juego = readlineSync.question("Elegir un juego (1/2/...): ");
        juegoSeleccionado = parseInt(juego) - 1;

        if (juegoSeleccionado >= 0 && juegoSeleccionado < casino.getJuegos().length) {
            iniciarJuego(casino, juegoSeleccionado, jugador1);
        } else {
            console.log("Opción no válida. Por favor, eliga un número válido.\n");
            continue;
        }

        const respuesta = readlineSync.questionInt("¿Desea jugar otro juego? (1 para cambiar de juego, 0 para salir del casino):\n");
        if (respuesta === 0) {
            seguirJugando = false;
            console.log("Gracias por jugar. ¡Vuelva pronto!");
        } else if (respuesta !== 1) {
            console.log("Opción no válida. Por favor, elija 1 para cambiar de juego, 0 para salir del casino.\n");
            continue;
        }
    }
}

function iniciarJuego(casino: Casino, juegoIndex: number, jugador1: Jugador): void {
    const juegos = casino.getJuegos();
    const juegoSeleccionado = juegos[juegoIndex];
    let seguirJugando = true;
    let apuesta = 0;

    while (seguirJugando) {
        switch (juegoSeleccionado.getNombre()) {
            case "Dados":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.\n");

                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                // Guardamos saldo antes para cálculo de ganancia
                const saldoAntesDados = jugador1.getSaldo();

                dados.setCreditoActual(jugador1.getSaldo());
                //la apuesta de dados es fija, se pasa la apuesta directamente al constructor
                dados.jugar(100);

                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                // Actualizamos saldo del jugador con la diferencia
                jugador1.setSaldo(dados.getCreditoActual());

                // Calculamos ganancia total
                const gananciaDados = jugador1.getSaldo() - saldoAntesDados;

                HistorialDePartidas.registrarPartida(
                    jugador1.getNombreJugador(),
                    juegoSeleccionado.getNombre(),
                    100, gananciaDados
                );
                break;

            case "Ruleta":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.\n");
                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                const saldoAntesRuleta = jugador1.getSaldo();
                ruleta.setCreditoActual(jugador1.getSaldo());
                ruleta.jugar();
                jugador1.setSaldo(ruleta.getCreditoActual());
                const gananciaRuleta = jugador1.getSaldo() - saldoAntesRuleta;

                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");

                HistorialDePartidas.registrarPartida(
                    jugador1.getNombreJugador(),
                    juegoSeleccionado.getNombre(),
                    0, gananciaRuleta
                );

                break;

            case "Tragamonedas_Joker":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.\n");
                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.\n");
                    return;
                }
                
                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                joker.printApuestasDisponibles();
                apuesta = joker.elegirApuesta(jugador1.getSaldo());
                joker.imprimirCarretes();

                const saldoAntes = jugador1.getSaldo();
                joker.jugar(apuesta);
                console.log("Resultado: " + joker.getResultado() + "\n");

                if (joker.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + joker.getResultado());
                    casino.setSaldo(casino.getSaldo() - joker.getResultado());
                } else {
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }

                const ganancia = jugador1.getSaldo() - saldoAntes;

                console.log("Apuesta del jugador: " + apuesta);
                console.log("Saldo actual del jugador: " + jugador1.getSaldo());

                HistorialDePartidas.registrarPartida(
                    jugador1.getNombreJugador(),
                    juegoSeleccionado.getNombre(),
                    apuesta,
                    ganancia
                );

                apuesta = 0;
                break;

            case "Tragamonedas_Hot":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                
                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.");
                    return;
                }

                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");

                hot.printApuestasDisponibles();
                apuesta = hot.elegirApuesta(jugador1.getSaldo());

                const saldoAntesHot = jugador1.getSaldo();
                hot.imprimirCarretes();
                hot.jugar(apuesta);
                console.log("Resultado: " + hot.getResultado() + "\n");

                if (hot.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + hot.getResultado());
                    casino.setSaldo(casino.getSaldo() - hot.getResultado());
                } else {
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }

                const gananciaHot = jugador1.getSaldo() - saldoAntesHot;

                console.log("Apuesta del jugador: " + apuesta + "\n");
                console.log("Resultado de la apuesta: " + hot.getResultado() + "\n");
                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");            

                HistorialDePartidas.registrarPartida(
                    jugador1.getNombreJugador(),
                    juegoSeleccionado.getNombre(),
                    apuesta,
                    gananciaHot
                );

                break;
        }

        const respuesta = readlineSync.questionInt("¿Desea seguir jugando? (1 para continuar, 0 para salir del juego):\n");
        if (respuesta === 0) {
            seguirJugando = false;
            console.log("Gracias por jugar. ¡Vuelva pronto!");
        } else if (respuesta !== 1) {
            console.log("Opción no válida. Por favor, elija 1 para continuar jugando o 0 para salir.\n");
        }
    }
}
