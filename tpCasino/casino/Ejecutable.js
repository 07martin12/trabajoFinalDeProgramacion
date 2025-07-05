"use strict";
exports.__esModule = true;
var readlineSync = require("readline-sync");
var Jugador_1 = require("./Jugador");
var Casino_1 = require("./Casino");
var HotHot_1 = require("./HotHot");
var JokerJoker_1 = require("./JokerJoker");
var Dados_1 = require("./Dados");
var Ruleta_1 = require("./Ruleta");
var historialDePartidas_1 = require("./historialDePartidas");
var casino = new Casino_1.Casino("codigo de la suerte", 1000000);
var jugador1 = new Jugador_1.Jugador("Juan", 20000);
var joker = new JokerJoker_1.JokerJoker("Tragamonedas_Joker");
var hot = new HotHot_1.HotHot("Tragamonedas_Hot");
var dados = new Dados_1.Dados(10000, 500, 2, "Dados", 500);
var ruleta = new Ruleta_1.Ruleta(1, 1, 1, 1, "", 1, 1, 1, 1, "Ruleta", 20000, 60000, [], ["rojo"], false, []);
casino.setJuegos(joker);
casino.setJuegos(hot);
casino.setJuegos(dados);
casino.setJuegos(ruleta);
elegirJuego(casino);
function elegirJuego(casino) {
    var seguirJugando = true;
    console.log("Bienvenidos a " + casino.getNombre() + "...\n");
    while (seguirJugando) {
        console.log("Juegos disponibles:");
        casino.imprimirJuegos();
        var juego = readlineSync.question("Elegir un juego (1/2/...): ");
        var juegoSeleccionado = parseInt(juego) - 1;
        if (isNaN(juegoSeleccionado) || juegoSeleccionado < 0 || juegoSeleccionado >= casino.getJuegos().length) {
            console.log("Opción no válida. Por favor, elija un número válido.\n");
            continue;
        }
        iniciarJuego(casino, juegoSeleccionado, jugador1);
        try {
            var respuesta = readlineSync.questionInt("¿Desea jugar otro juego? (1 para cambiar de juego, 0 para salir del casino):\n");
            if (respuesta === 0) {
                seguirJugando = false;
                console.log("Gracias por jugar. ¡Vuelva pronto!");
            }
            else if (respuesta !== 1) {
                console.log("Opción no válida. Por favor, elija 1 para cambiar de juego, 0 para salir del casino.\n");
            }
        }
        catch (_a) {
            console.log("Entrada inválida. Debe ingresar un número (0 o 1).\n");
        }
    }
}
function iniciarJuego(casino, juegoIndex, jugador1) {
    var juegos = casino.getJuegos();
    var juegoSeleccionado = juegos[juegoIndex];
    var seguirJugando = true;
    var apuesta = 0;
    while (seguirJugando) {
        switch (juegoSeleccionado.getNombre()) {
            case "Dados":
                console.log("El juego de Dados ha sido iniciado.\n");
                if (jugador1.getSaldo() < 100) {
                    console.log("No tienes saldo suficiente para jugar a los Dados.\n");
                    return;
                }
                var saldoAntesDados = jugador1.getSaldo();
                console.log("Saldo actual del jugador: " + saldoAntesDados + "\n");
                dados.setCreditoActual(saldoAntesDados);
                dados.jugar(100);
                jugador1.setSaldo(dados.getCreditoActual());
                var gananciaDados = jugador1.getSaldo() - saldoAntesDados;
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), "Dados", 100, gananciaDados);
                break;
            case "Ruleta":
                console.log("El juego de Ruleta ha sido iniciado.\n");
                var saldoAntesRuleta = jugador1.getSaldo();
                console.log("Saldo actual del jugador: " + saldoAntesRuleta + "\n");
                ruleta.setCreditoActual(saldoAntesRuleta);
                ruleta.jugar();
                jugador1.setSaldo(ruleta.getCreditoActual());
                var gananciaRuleta = jugador1.getSaldo() - saldoAntesRuleta;
                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), "Ruleta", 0, gananciaRuleta);
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
                var saldoAntes = jugador1.getSaldo();
                joker.imprimirCarretes();
                joker.jugar(apuesta);
                console.log("Resultado: " + joker.getResultado() + "\n");
                if (joker.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + joker.getResultado());
                    casino.setSaldo(casino.getSaldo() - joker.getResultado());
                }
                else {
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }
                var ganancia = jugador1.getSaldo() - saldoAntes;
                console.log("Apuesta del jugador: " + apuesta);
                console.log("Saldo actual del jugador: " + jugador1.getSaldo());
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), "Tragamonedas_Joker", apuesta, ganancia);
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
                var saldoAntesHot = jugador1.getSaldo();
                hot.imprimirCarretes();
                hot.jugar(apuesta);
                console.log("Resultado: " + hot.getResultado() + "\n");
                if (hot.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + hot.getResultado());
                    casino.setSaldo(casino.getSaldo() - hot.getResultado());
                }
                else {
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }
                var gananciaHot = jugador1.getSaldo() - saldoAntesHot;
                console.log("Apuesta del jugador: " + apuesta + "\n");
                console.log("Resultado de la apuesta: " + hot.getResultado() + "\n");
                console.log("Saldo actual del jugador: " + jugador1.getSaldo() + "\n");
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), "Tragamonedas_Hot", apuesta, gananciaHot);
                break;
        }
        try {
            var respuesta = readlineSync.questionInt("¿Desea seguir jugando? (1 para continuar, 0 para salir del juego):\n");
            if (respuesta === 0) {
                seguirJugando = false;
                console.log("Gracias por jugar. ¡Vuelva pronto!");
            }
            else if (respuesta !== 1) {
                console.log("Opción no válida. Por favor, elija 1 para continuar o 0 para salir.\n");
            }
        }
        catch (_a) {
            console.log("Entrada inválida. Debe ingresar un número (0 o 1).\n");
        }
    }
}
