"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Tragamonedas = void 0;
var Juego_1 = require("./Juego");
var Tragamonedas = /** @class */ (function (_super) {
    __extends(Tragamonedas, _super);
    function Tragamonedas(nombre) {
        return _super.call(this, nombre, 0) || this;
    }
    Tragamonedas.prototype.getNombre = function () {
        return _super.prototype.getNombre.call(this);
    };
    Tragamonedas.prototype.setNombre = function (nombre) {
        return _super.prototype.setNombre.call(this, nombre);
    };
    Tragamonedas.prototype.getResultado = function () {
        return _super.prototype.getCreditoActual.call(this);
    };
    Tragamonedas.prototype.setResultado = function (gananciaTotal) {
        _super.prototype.setCreditoActual.call(this, gananciaTotal);
    };
    return Tragamonedas;
}(Juego_1.Juego));
exports.Tragamonedas = Tragamonedas;
