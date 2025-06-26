"use strict";
exports.__esModule = true;
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(nombre, creditoActual) {
        this.nombreDeJuego = nombre;
        this.creditoActual = creditoActual;
    }
    Juego.prototype.getNombre = function () {
        return this.nombreDeJuego;
    };
    Juego.prototype.setNombre = function (nombre) {
        this.nombreDeJuego = nombre;
    };
    Juego.prototype.getCreditoActual = function () {
        return this.creditoActual;
    };
    Juego.prototype.setCreditoActual = function (ganancia) {
        this.creditoActual += ganancia;
    };
    return Juego;
}());
exports.Juego = Juego;
