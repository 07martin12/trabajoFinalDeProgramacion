"use strict";
exports.__esModule = true;
exports.Persona = void 0;
var Persona = /** @class */ (function () {
    function Persona(nombreJugador, saldo) {
        this.nombreJugador = nombreJugador;
        this.saldo = saldo;
    }
    Persona.prototype.getNombreJugador = function () {
        return this.nombreJugador;
    };
    Persona.prototype.setNombreJugador = function (nombre) {
        this.nombreJugador = nombre;
    };
    Persona.prototype.getSaldo = function () {
        return this.saldo;
    };
    Persona.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    return Persona;
}());
exports.Persona = Persona;
