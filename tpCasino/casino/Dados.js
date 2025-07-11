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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dados = void 0;
var readlineSync = require("readline-sync");
var Juego_1 = require("./Juego");
var Dados = /** @class */ (function (_super) {
    __extends(Dados, _super);
    function Dados(nombreDeJuego) {
        var _this = _super.call(this, nombreDeJuego) || this;
        //se crea una variable inmutable para almacenar la cantidad de dados del juego
        _this.dados = [
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6]
        ];
        _this.ganancia = 0;
        return _this;
    }
    Dados.prototype.jugar = function (apuesta) {
        try {
            var resultadoTotal = 0;
            // Se recorren todos los dados (cada array dentro de la matriz)
            for (var i = 0; i < this.dados.length; i++) {
                // Se genera un índice aleatorio para el dado actual
                var indiceAleatorio = Math.floor(Math.random() * this.dados[i].length);
                // Se obtiene el valor de la cara del dado
                var caraDado = this.dados[i][indiceAleatorio];
                // Suma total de la cara de cada dado
                resultadoTotal += caraDado;
                console.log('Dado ' + (i + 1) + ': ' + caraDado);
            }
            // Se calcula la ganancia con la suma total de los dados
            var gananciaMultiplicador = this.calcularGanancia(resultadoTotal);
            //La ganancia se multiplica por la apuesta del jugador solo si no es igual a 0, lo que indica que hubo combinaciones ganadoras.
            var ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
            this.setGanancia(ganancia);
        }
        catch (error) {
            console.error("Error durante el juego:", error);
        }
    };
    Dados.prototype.elegirApuesta = function () {
        try {
            var apuesta = readlineSync.question("Elija su apuesta, la apuesta minima es de 500 y la máxima es de 50.000:\n");
            var apuestaNumerica = parseInt(apuesta);
            if (isNaN(apuestaNumerica)) {
                console.log("Entrada no válida. Debe ingresar un número.");
                return this.elegirApuesta(); // Llamamos nuevamente al método si la entrada no es un número
            }
            if (apuestaNumerica < 500 || apuestaNumerica > 50000) {
                console.log("La apuesta debe ser mayor a 500 y menor a 50,000.");
                return this.elegirApuesta(); // Volver a pedir la apuesta si no está en el rango
            }
            console.log("Apuesta seleccionada: " + apuestaNumerica + " monedas.");
            return apuestaNumerica;
        }
        catch (error) {
            console.error("Ocurrió un error durante la elección de la apuesta:", error);
            return 0; // En caso de error, retorna 0
        }
    };
    Dados.prototype.getNombre = function () {
        return _super.prototype.getNombre.call(this);
    };
    Dados.prototype.setNombre = function (nombre) {
        return _super.prototype.setNombre.call(this, nombre);
    };
    Dados.prototype.getGanancia = function () {
        return this.ganancia;
    };
    Dados.prototype.setGanancia = function (ganancia) {
        this.ganancia = ganancia;
    };
    Dados.prototype.calcularGanancia = function (pSuma) {
        // Verificar si el número es primo
        var esPrimo = true;
        if (pSuma <= 1) {
            esPrimo = false;
        }
        else {
            for (var i = 2; i <= Math.sqrt(pSuma); i++) {
                if (pSuma % i === 0) {
                    esPrimo = false;
                    break;
                }
            }
        }
        // Calcular el multiplicador
        if (pSuma % 2 === 0) { // Número par
            console.log("Sacaste un numero par: " + pSuma + ". Ganaste el doble de tu apuesta.");
            return 2;
        }
        else if (esPrimo) { // Número primo
            console.log("Sacaste un numero primo:" + pSuma + ". Ganaste cinco veces tu apuesta.");
            return 5;
        }
        else { // Número impar 
            console.log("Sacaste un numero impar:" + pSuma + ". Ganaste el triple de tu apuesta.");
            return 3;
        }
    };
    return Dados;
}(Juego_1.Juego));
exports.Dados = Dados;
