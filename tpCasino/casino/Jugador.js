"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jugador = void 0;
var readlineSync = require("readline-sync");
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
    Jugador.prototype.saldoInsuficiente = function (apuesta) {
        return apuesta > this.getSaldo();
    };
    Jugador.prototype.cargarSaldo = function () {
        try {
            var saldoCargado = false;
            // Mientras no se ingrese un saldo válido, se le sigue pidiendo un monto al usuario
            while (!saldoCargado) {
                var nuevoSaldo = readlineSync.question("Ingrese el monto de dinero que desea cargar en su cuenta. El monto minimo es de 500 pesos: ");
                var saldoNumerico = parseInt(nuevoSaldo, 10);
                if (isNaN(saldoNumerico) || saldoNumerico <= 0 || saldoNumerico % 2 !== 0) {
                    console.log("El valor ingresado debe ser un número entero mayor a cero.\n");
                }
                else if (saldoNumerico < 500) {
                    console.log("El valor ingresado debe ser igual o mayor a 500.\n");
                }
                else {
                    console.log("Saldo cargado con éxito.\n");
                    this.setSaldo(this.getSaldo() + saldoNumerico);
                    saldoCargado = true;
                }
            }
            return true;
        }
        catch (error) {
            console.log("Hubo un error al procesar su solicitud. Intente nuevamente.\n" + error);
            return false;
        }
    };
    return Jugador;
}());
exports.Jugador = Jugador;
