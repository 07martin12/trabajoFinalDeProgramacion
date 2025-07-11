"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var Casino = /** @class */ (function () {
    function Casino(nombre, saldo) {
        this.nombre = nombre;
        this.saldo = saldo;
        this.juegos = [];
    }
    Casino.prototype.getNombre = function () {
        return this.nombre;
    };
    Casino.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Casino.prototype.setJuegos = function (juego) {
        this.juegos.push(juego);
    };
    Casino.prototype.getJuegos = function () {
        return this.juegos;
    };
    Casino.prototype.getSaldo = function () {
        return this.saldo;
    };
    Casino.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    Casino.prototype.getPersona = function () {
        return this.jugador;
    };
    Casino.prototype.setPersona = function (jugador) {
        this.jugador = jugador;
    };
    Casino.prototype.imprimirJuegos = function () {
        //se publica una lista enumerada de juegos disponibles para el jugador
        for (var i = 0; i < this.juegos.length; i++) {
            console.log((i + 1) + ") " + this.juegos[i].getNombre());
        }
    };
    Casino.prototype.actualizarSaldo = function (jugador, casino, apuesta, ganancia) {
        if (ganancia > 0) {
            // Si el jugador gana
            jugador.setSaldo(jugador.getSaldo() + ganancia);
            casino.setSaldo(casino.getSaldo() - ganancia); // El casino pierde la cantidad ganada por el jugador
            console.log("¡Felicidades! Ha ganado " + ganancia + " pesos. Tu saldo es ahora " + jugador.getSaldo() + " pesos.");
        }
        else {
            // Si el jugador pierde
            jugador.setSaldo(jugador.getSaldo() - apuesta);
            casino.setSaldo(casino.getSaldo() + apuesta); // El casino gana lo apostado por el jugador
            console.log("Has perdido. El casino ha ganado " + apuesta + " pesos. Tu saldo es ahora " + jugador.getSaldo() + " pesos.");
        }
    };
    return Casino;
}());
exports.Casino = Casino;
