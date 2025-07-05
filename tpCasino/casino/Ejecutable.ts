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

elegirJuego(casino);

function elegirJuego(casino: Casino): void {
    let seguirJugando = true;

    console.log("Bienvenidos a " + casino.getNombre() + "...\n");

    while (seguirJugando) { 
        console.log("Juegos disponibles:");
        casino.imprimirJuegos();

        const juego = readlineSync.question("Elegir un juego (1/2/...): ");
        const juegoSeleccionado = parseInt(juego) - 1;

        if (isNaN(juegoSeleccionado) || juegoSeleccionado < 0 || juegoSeleccionado >= casino.getJuegos().length) {
            console.log("Opción no válida. Por favor, elija un número válido.\n");
            continue;
        }

        iniciarJuego(casino, juegoSeleccionado, jugador1);

        try {
            const respuesta = readlineSync.questionInt("¿Desea jugar otro juego? (1 para cambiar de juego, 0 para salir del casino):\n");
            if (respuesta === 0) {
                seguirJugando = false;
                console.log("Gracias por jugar. ¡Vuelva pronto!");
            } else if (respuesta !== 1) {
                console.log("Opción no válida. Por favor, elija 1 para cambiar de juego, 0 para salir del casino.\n");
            }
        } catch {
            console.log("Entrada inválida. Debe ingresar un número (0 o 1).\n");
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
                console.log("El juego de Dados ha sido iniciado.\n");

                if (jugador1.getSaldo() < 100) {
                    console.log("No tienes saldo suficiente para jugar a los Dados.\n");
                    return;
                }

                const saldoAntesDados = jugador1.getSaldo();
                console.log("Saldo actual del jugador: " + saldoAntesDados + "\n");

                dados.setCreditoActual(saldoAntesDados);
                dados.jugar(100);
                jugador1.setSaldo(dados.getCreditoActual());

                const gananciaDados = jugador1.getSaldo() - saldoAntesDados;

                HistorialDePartidas.registrarPartida(
                    jugador1.getNombreJugador(),
                    "Dados",
                    100,
                    gananciaDados
                );
                break;

            case "Ruleta":
                console.log("El juego de Ruleta ha sido iniciado.\n");
                const saldoAntesRuleta = jugador1.getSaldo();
                console.log("Saldo actual del jugador: " + saldoAntesRuleta + "\n");

                ruleta.setCreditoActual(saldoAntesRuleta);
                ruleta.jugar();
                jugador1.setSaldo(ruleta.getCreditoActual());

                const gananciaRuleta = jugador1.getSaldo() - saldoAntesRuleta;
                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");

                HistorialDePartidas.registrarPartida(
                    jugador1.getNombreJugador(),
                    "Ruleta",
                    0,
                    gananciaRuleta
                );
                break;

            case "Tragamonedas_Joker":
                console.log("El juego de Joker ha sido iniciado.\n");

                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.\n");
                    return;
                }

                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                joker.printApuestasDisponibles();
                apuesta = joker.elegirApuesta(jugador1.getSaldo());

                if (apuesta > jugador1.getSaldo() || apuesta <= 0) {
                    console.log("Apuesta inválida. Verifique su saldo y el monto.\n");
                    return;
                }

                const saldoAntes = jugador1.getSaldo();
                joker.imprimirCarretes();
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
                    "Tragamonedas_Joker",
                    apuesta,
                    ganancia
                );
                break;

            case "Tragamonedas_Hot":
                console.log("El juego de Hot ha sido iniciado.\n");

                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.\n");
                    return;
                }

                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                hot.printApuestasDisponibles();
                apuesta = hot.elegirApuesta(jugador1.getSaldo());

                if (apuesta > jugador1.getSaldo() || apuesta <= 0) {
                    console.log("Apuesta inválida. Verifique su saldo y el monto.\n");
                    return;
                }

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
                    "Tragamonedas_Hot",
                    apuesta,
                    gananciaHot
                );
                break;
        }

        try {
            const respuesta = readlineSync.questionInt("¿Desea seguir jugando? (1 para continuar, 0 para salir del juego):\n");
            if (respuesta === 0) {
                seguirJugando = false;
                console.log("Gracias por jugar. ¡Vuelva pronto!");
            } else if (respuesta !== 1) {
                console.log("Opción no válida. Por favor, elija 1 para continuar o 0 para salir.\n");
            }
        } catch {
            console.log("Entrada inválida. Debe ingresar un número (0 o 1).\n");
        }
    }
}
