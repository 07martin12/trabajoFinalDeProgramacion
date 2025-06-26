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
exports.HotHot = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var readlineSync = require("readline-sync");
var HotHot = /** @class */ (function (_super) {
    __extends(HotHot, _super);
    function HotHot(nombre) {
        var _this = _super.call(this, nombre) || this;
        _this.setCargarCarretes();
        return _this;
    }
    HotHot.prototype.getSimboloEspecial = function () {
        return HotHot.simboloEspecialSpin;
    };
    HotHot.prototype.getListaDePagos = function () {
        return HotHot.listaDePagos;
    };
    HotHot.prototype.getApuestasDisponibles = function () {
        return HotHot.apuestasDisponibles;
    };
    HotHot.prototype.getCombinacionesGanadoras = function () {
        return HotHot.combinacionesGanadoras;
    };
    HotHot.prototype.getNombre = function () {
        return _super.prototype.getNombre.call(this);
    };
    HotHot.prototype.setNombre = function (nombre) {
        return _super.prototype.setNombre.call(this, nombre);
    };
    HotHot.prototype.getResultado = function () {
        return _super.prototype.getResultado.call(this);
    };
    HotHot.prototype.setResultado = function (resultado) {
        _super.prototype.setResultado.call(this, resultado);
    };
    HotHot.prototype.getCarretes = function () {
        return this.carretes;
    };
    HotHot.prototype.jugar = function (apuesta) {
        this.setCargarCarretes();
        var gananciaMultiplicador = this.calcularGanancia();
        var ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
        this.setResultado(ganancia);
    };
    HotHot.prototype.calcularGanancia = function () {
        //se realiza una lectura especial evaluando si el jugador consiguo tiradas gratis  por conseguir una combinación de simbolos especiales
        var tiradasGratis = this.hayTiradaGratis();
        var ganancia = 0;
        ganancia += this.lecturaVertical();
        ganancia += this.lecturaHorizontal();
        ganancia += this.lecturaDiagonal();
        //si hay tiradas gratis entonces el bucle vuelve a cargar los carretes de valores aleatorios y sigue evaluando las combinaciones ganadoras y almacenando la ganancia correspondiente
        if (tiradasGratis > 0)
            while (tiradasGratis > 0) {
                this.setCargarCarretes();
                tiradasGratis = this.hayTiradaGratis();
                ganancia += this.lecturaVertical();
                ganancia += this.lecturaHorizontal();
                ganancia += this.lecturaDiagonal();
                tiradasGratis--;
            }
        return ganancia;
    };
    HotHot.prototype.lecturaVertical = function () {
        var contador = 1;
        for (var fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] && this.carretes[fila][0] !== HotHot.simboloEspecialSpin)
                contador++;
        if (contador === 3)
            if (HotHot.combinacionesGanadoras[contador] &&
                HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    HotHot.prototype.lecturaHorizontal = function () {
        var contador = 1;
        for (var columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] && this.carretes[0][columna] !== HotHot.simboloEspecialSpin)
                contador++;
        if (contador === 3 &&
            HotHot.combinacionesGanadoras[contador] &&
            HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    HotHot.prototype.lecturaDiagonal = function () {
        var contador = 1;
        var fila = 1;
        var columna = 1;
        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === this.carretes[0][0] && this.carretes[fila][columna] !== HotHot.simboloEspecialSpin)
                contador++;
            fila++;
            columna++;
        }
        if (contador === 3 && HotHot.combinacionesGanadoras[contador] &&
            HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    HotHot.prototype.setCargarCarretes = function () {
        var filas = 3;
        var columnas = 5;
        var simbolos = Object.keys(HotHot.listaDePagos);
        this.carretes = [];
        for (var i = 0; i < filas; i++) {
            this.carretes[i] = [];
            for (var j = 0; j < columnas; j++) {
                var indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                this.carretes[i][j] = simbolos[indiceAleatorio];
            }
        }
    };
    HotHot.prototype.hayTiradaGratis = function () {
        var contador = 0;
        if (this.carretes[0][0] != HotHot.simboloEspecialSpin)
            return 0;
        var tiradasGratis = 0;
        for (var fila_1 = 1; fila_1 < this.carretes.length; fila_1++)
            if (this.carretes[fila_1][0] === HotHot.simboloEspecialSpin)
                contador++;
        for (var columna_1 = 1; columna_1 < this.carretes[0].length; columna_1++)
            if (this.carretes[0][columna_1] === HotHot.simboloEspecialSpin)
                contador++;
        var fila = 1;
        var columna = 1;
        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === HotHot.simboloEspecialSpin)
                contador++;
            fila++;
            columna++;
        }
        if (contador >= 3)
            tiradasGratis = 3;
        return tiradasGratis;
    };
    HotHot.prototype.imprimirCarretes = function () {
        console.log("\nCarretes de " + this.getNombre() + ":\n");
        for (var fila = 0; fila < this.carretes.length; fila++) {
            var filaStr = "";
            for (var col = 0; col < this.carretes[fila].length; col++) {
                filaStr += this.carretes[fila][col] + " | ";
            }
            console.log(filaStr);
        }
    };
    HotHot.prototype.printApuestasDisponibles = function () {
        var apuestasString = '';
        //se publican las apuestas disponibles de cada juego almacenadas en un array
        for (var i = 0; i < HotHot.apuestasDisponibles.length; i++) {
            apuestasString += HotHot.apuestasDisponibles[i];
            if (i < HotHot.apuestasDisponibles.length - 1) {
                apuestasString += ' | ';
            }
        }
        console.log("Apuestas disponibles: " + apuestasString);
    };
    HotHot.prototype.apuestaExistente = function (eleccion) {
        if (HotHot.apuestasDisponibles.indexOf(eleccion) != -1)
            return false;
        return true;
    };
    HotHot.prototype.elegirApuesta = function (saldoDisponible) {
        var apuestaTotal = 0;
        while (true) {
            //se elije un elemento del array de apuestas (el valor de uno de los elementos del array)
            var eleccion = readlineSync.questionInt("Eliga su apuesta: ");
            if (this.apuestaExistente(eleccion)) {
                //es invalida porque el numero ingresado no existe en el array de apuestas disponibles del juego seleccionado.
                console.log("Opción no válida. Elija una apuesta disponible.");
            }
            else {
                //+= para seguir eligiendo apuestas disponibles y formar una apuesta mayor, si el jugador elige 2 fichas de 40 entonces la apuesta es de 80.
                apuestaTotal += eleccion;
                console.log("Ha apostado " + eleccion + " monedas.");
                console.log("Apuesta total acumulada: " + apuestaTotal + " monedas.");
                if (apuestaTotal > saldoDisponible) {
                    //si el jugador no tiene suficiente saldo entonces no puede aumentar la apuesta
                    console.log("No tiene suficiente saldo para esta apuesta acumulada.");
                    return apuestaTotal;
                }
                var continuarApostando = readlineSync.questionInt("¿Desea seguir apostando? (1 para continuar apostando, 0 para salir de apuestas): ");
                if (continuarApostando === 0) {
                    console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " monedas.");
                    return apuestaTotal;
                }
                else if (continuarApostando !== 1) {
                    console.log("Opción no válida. Por favor, elija 1 para seguir apostando o 0 para dejar de apostar.");
                }
            }
        }
    };
    HotHot.simboloEspecialSpin = "free-spin";
    HotHot.combinacionesGanadoras = {
        5: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"],
        4: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"],
        3: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"]
    };
    HotHot.listaDePagos = {
        "scatter": [100, 30, 10],
        "hot-hot": [150, 40, 12],
        "777": [300, 80, 20],
        "77": [200, 60, 15],
        "7": [150, 50, 10],
        "b5r": [120, 35, 8],
        "bar": [8, 2, 0.3],
        "champagne": [180, 45, 13],
        "fichas": [60, 15, 5],
        "free-spin": [0, 0, 0]
    };
    HotHot.apuestasDisponibles = [
        25, 50, 75, 100, 125, 150, 175, 200, 225, 250,
        300, 350, 400, 450, 500,
        625, 750, 875, 1000, 1125, 1250, 1375, 1500,
        1625, 1750, 1875, 2000
    ];
    return HotHot;
}(Tragamonedas_1.Tragamonedas));
exports.HotHot = HotHot;
