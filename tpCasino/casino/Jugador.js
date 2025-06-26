"use strict";
exports.__esModule = true;
exports.Jugador = void 0;
var Jugador = /** @class */ (function () {
    function Jugador(nombreJugador, saldo) {
        this.nombreJugador = nombreJugador;
        this.saldo = saldo;
    }
    Jugador.prototype.getNombreJugador = function () {
        return this.nombreJugador;
    };
    Jugador.prototype.setNombreJugador = function (nombre) {
        this.nombreJugador = nombre;
    };
    Jugador.prototype.getSaldo = function () {
        return this.saldo;
    };
    Jugador.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    return Jugador;
}());
exports.Jugador = Jugador;
