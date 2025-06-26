"use strict";
exports.__esModule = true;
var readlineSync = require("readline-sync");
var Persona_1 = require("./Persona");
var Casino_1 = require("./Casino");
var HotHot_1 = require("./HotHot");
var JokerJoker_1 = require("./JokerJoker");
var Dados_1 = require("./Dados");
var Ruleta_1 = require("./Ruleta");
var historialDePartidas_1 = require("./historialDePartidas");
var casino = new Casino_1.Casino("codigo de la suerte", 1000000);
var jugador1 = new Persona_1.Persona("Juan", 20000);
var joker = new JokerJoker_1.JokerJoker("Tragamonedas_Joker");
var hot = new HotHot_1.HotHot("Tragamonedas_Hot");
var dados = new Dados_1.Dados(10000, 500, 2, "Dados", 500);
var ruleta = new Ruleta_1.Ruleta(1, 1, 1, 1, "", 1, 1, 1, 1, "Ruleta", 20000, 60000, [], ["rojo"], false, []);
casino.setJuegos(joker);
casino.setJuegos(hot);
casino.setJuegos(dados);
casino.setJuegos(ruleta);
// El jugador elige el juego que desea jugar.
elegirJuego(casino);
function elegirJuego(casino) {
    var juego;
    var seguirJugando = true;
    var juegoSeleccionado;
    while (seguirJugando) {
        console.log("Bienvenidos a " + casino.getNombre() + ".");
        console.log("Juegos disponibles:");
        casino.imprimirJuegos();
        juego = readlineSync.question("Elegir un juego (1/2/...): ");
        juegoSeleccionado = parseInt(juego) - 1;
        if (juegoSeleccionado >= 0 && juegoSeleccionado < casino.getJuegos().length) {
            iniciarJuego(casino, juegoSeleccionado, jugador1);
        }
        else {
            console.log("Opción no válida. Por favor, eliga un número válido.");
        }
        var respuesta = readlineSync.questionInt("¿Desea jugar otro juego? (1 para cambiar de juego, 0 para salir del casino): ");
        if (respuesta === 0) {
            seguirJugando = false;
            console.log("Gracias por jugar. ¡Vuelva pronto!");
        }
        else if (respuesta !== 1) {
            console.log("Opción no válida. Por favor, elija 1 para cambiar de juego, 0 para salir del casino.");
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
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                // Guardamos saldo antes para cálculo de ganancia
                var saldoAntesDados = jugador1.getSaldo();
                dados.setCreditoActual(jugador1.getSaldo());
                dados.jugar(100);
                // Actualizamos saldo del jugador con la diferencia
                jugador1.setSaldo(dados.getCreditoActual());
                // Calculamos ganancia neta
                var gananciaDados = jugador1.getSaldo() - saldoAntesDados;
                console.log("Saldo actual del jugador: " + jugador1.getSaldo());
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), 100, // apuesta fija en tu ejemplo
                gananciaDados);
                break;
            case "Ruleta":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                var saldoAntesRuleta = jugador1.getSaldo();
                ruleta.setCreditoActual(jugador1.getSaldo());
                ruleta.jugar();
                jugador1.setSaldo(ruleta.getCreditoActual());
                var gananciaRuleta = jugador1.getSaldo() - saldoAntesRuleta;
                console.log("Saldo actual del jugador: " + jugador1.getSaldo());
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), 0, // No hay apuesta explícita en el ejemplo, ajusta si tienes un método para obtenerla
                gananciaRuleta);
                break;
            case "Tragamonedas_Joker":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.");
                    return;
                }
                joker.printApuestasDisponibles();
                apuesta = joker.elegirApuesta(jugador1.getSaldo());
                joker.imprimirCarretes();
                var saldoAntes = jugador1.getSaldo();
                joker.jugar(apuesta);
                console.log("Resultado: " + joker.getResultado());
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
                console.log("Saldo actual del casino: " + casino.getSaldo());
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), apuesta, ganancia);
                apuesta = 0;
                break;
            case "Tragamonedas_Hot":
                console.log("El juego de " + juegoSeleccionado.getNombre() + " ha sido iniciado.");
                if (jugador1.getSaldo() === 0) {
                    console.log("No tiene suficiente saldo para esta apuesta.");
                    return;
                }
                console.log("Saldo actual del jugador: " + jugador1.getSaldo());
                console.log("Saldo actual del casino: " + casino.getSaldo());
                hot.printApuestasDisponibles();
                apuesta = hot.elegirApuesta(jugador1.getSaldo());
                var saldoAntesHot = jugador1.getSaldo();
                hot.imprimirCarretes();
                hot.jugar(apuesta);
                console.log("Resultado: " + hot.getResultado());
                if (hot.getResultado() !== 0) {
                    jugador1.setSaldo(jugador1.getSaldo() + hot.getResultado());
                    casino.setSaldo(casino.getSaldo() - hot.getResultado());
                }
                else {
                    jugador1.setSaldo(jugador1.getSaldo() - apuesta);
                    casino.setSaldo(casino.getSaldo() + apuesta);
                }
                var gananciaHot = jugador1.getSaldo() - saldoAntesHot;
                console.log("Apuesta del jugador: " + apuesta);
                console.log("Resultado de la apuesta: " + hot.getResultado());
                console.log("Saldo actual del jugador: " + jugador1.getSaldo());
                console.log("Saldo actual del casino: " + casino.getSaldo());
                historialDePartidas_1.HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), apuesta, gananciaHot);
                break;
        }
        var respuesta = readlineSync.questionInt("¿Desea seguir jugando? (1 para continuar, 0 para salir del juego): ");
        if (respuesta === 0) {
            seguirJugando = false;
            console.log("Gracias por jugar. ¡Vuelva pronto!");
        }
        else if (respuesta !== 1) {
            console.log("Opción no válida. Por favor, elija 1 para continuar jugando o 0 para salir.");
        }
    }
}
