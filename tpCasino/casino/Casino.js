"use strict";
exports.__esModule = true;
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
        return this.persona;
    };
    Casino.prototype.setPersona = function (persona) {
        this.persona = persona;
    };
    Casino.prototype.imprimirJuegos = function () {
        //se publica una lista enumerada de juegos disponibles para el jugador
        for (var i = 0; i < this.juegos.length; i++) {
            console.log((i + 1) + ") " + this.juegos[i].getNombre());
        }
    };
    return Casino;
}());
exports.Casino = Casino;
