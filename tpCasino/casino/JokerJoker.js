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
exports.JokerJoker = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var readlineSync = require("readline-sync");
var JokerJoker = /** @class */ (function (_super) {
    __extends(JokerJoker, _super);
    function JokerJoker(nombre) {
        var _this = _super.call(this, nombre) || this;
        _this.setCargarCarretes();
        return _this;
    }
    JokerJoker.prototype.getSimboloEspecial = function () {
        return JokerJoker.simboloEspecialWild;
    };
    JokerJoker.prototype.getListaDePagos = function () {
        return JokerJoker.listaDePagos;
    };
    JokerJoker.prototype.getApuestasDisponibles = function () {
        return JokerJoker.apuestasDisponibles;
    };
    JokerJoker.prototype.getCombinacionesGanadoras = function () {
        return JokerJoker.combinacionesGanadoras;
    };
    JokerJoker.prototype.getNombre = function () {
        return _super.prototype.getNombre.call(this);
    };
    JokerJoker.prototype.setNombre = function (nombre) {
        return _super.prototype.setNombre.call(this, nombre);
    };
    JokerJoker.prototype.getResultado = function () {
        return _super.prototype.getResultado.call(this);
    };
    JokerJoker.prototype.setResultado = function (resultado) {
        _super.prototype.setResultado.call(this, resultado);
    };
    JokerJoker.prototype.getCarretes = function () {
        return this.carretes;
    };
    //se cargan los carretes aleatoriamente tomando las claves del objeto listaDePagos como un arreglo con los nombres de todos los simbolos disponibles
    JokerJoker.prototype.setCargarCarretes = function () {
        var filas = 3;
        var columnas = 5;
        var simbolos = Object.keys(JokerJoker.listaDePagos);
        this.carretes = [];
        for (var i = 0; i < filas; i++) {
            this.carretes[i] = [];
            for (var j = 0; j < columnas; j++) {
                var indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                this.carretes[i][j] = simbolos[indiceAleatorio];
            }
        }
    };
    JokerJoker.prototype.jugar = function (apuesta) {
        console.log("Iniciando juego...");
        this.setCargarCarretes();
        //si el metodo calcular ganancia retorno 0 entonces no se multiplica por la apuesta
        var gananciaMultiplicador = this.calcularGanancia();
        var ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
        this.setResultado(ganancia);
    };
    JokerJoker.prototype.calcularGanancia = function () {
        //se buscan combinaciónes ganadoras y se almacenan sus ganancias correspondientes
        var ganancia = this.lecturaVertical();
        ganancia += this.lecturaHorizontal();
        ganancia += this.lecturaDiagonal();
        return ganancia;
    };
    JokerJoker.prototype.lecturaVertical = function () {
        var contador = 1;
        for (var fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] || this.carretes[fila][0] === JokerJoker.simboloEspecialWild)
                contador++;
        if (contador === 3)
            if (JokerJoker.combinacionesGanadoras[contador] &&
                JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    JokerJoker.prototype.lecturaHorizontal = function () {
        var contador = 1;
        for (var columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] || this.carretes[0][columna] === JokerJoker.simboloEspecialWild)
                contador++;
        if ((contador > 2 && contador < 6) &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    JokerJoker.prototype.lecturaDiagonal = function () {
        var contador = 1;
        var fila = 1;
        var columna = 1;
        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === this.carretes[0][0] || this.carretes[fila][columna] === JokerJoker.simboloEspecialWild)
                contador++;
            11;
            fila++;
            columna++;
        }
        if (contador === 3 &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        return 0;
    };
    JokerJoker.prototype.imprimirCarretes = function () {
        console.log("\nCarretes de " + this.getNombre() + ":\n");
        for (var fila = 0; fila < this.carretes.length; fila++) {
            var filaStr = "";
            for (var col = 0; col < this.carretes[fila].length; col++) {
                filaStr += this.carretes[fila][col] + " | ";
            }
            console.log(filaStr);
        }
    };
    JokerJoker.prototype.printApuestasDisponibles = function () {
        var apuestasString = '';
        //se publican las apuestas disponibles de cada juego almacenadas en un array
        for (var i = 0; i < JokerJoker.apuestasDisponibles.length; i++) {
            apuestasString += JokerJoker.apuestasDisponibles[i];
            if (i < JokerJoker.apuestasDisponibles.length - 1) {
                apuestasString += ' | ';
            }
        }
        console.log("Apuestas disponibles: " + apuestasString);
    };
    JokerJoker.prototype.apuestaExistente = function (eleccion) {
        if (JokerJoker.apuestasDisponibles.indexOf(eleccion) != -1)
            return false;
        return true;
    };
    JokerJoker.prototype.elegirApuesta = function (saldoDisponible) {
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
                    console.log("No tiene suficiente saldo para esta apuesta acumulada, intente nuevamente.");
                    apuestaTotal = 0;
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
    JokerJoker.simboloEspecialWild = "wild";
    // Se crea un objeto estatico que asocia un número (3, 4 o 5) con un arreglo de símbolos ganadores (strings).
    JokerJoker.combinacionesGanadoras = {
        5: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        4: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        3: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"]
    };
    // Se crea un objeto estatico donde cada clave es el nombre de un símbolo y su valor es un arreglo de pagos correspondientes a las apuestas ganadoras.
    // Cada arreglo representa los pagos por 3, 4 o 5 símbolos iguales (en ese orden).
    JokerJoker.listaDePagos = {
        "diamante": [20, 5, 1], "siete": [10, 3, 0.6],
        "bar": [8, 2, 0.3], "estrella": [5, 1.5, 0.2],
        "campana": [5, 1.5, 0.2], "sandia": [0.8, 0.3, 0.075],
        "uvas": [0.8, 0.3, 0.075], "mango": [0.8, 0.3, 0.075],
        "durazno": [0.5, 0.2, 0.05], "limon": [0.5, 0.2, 0.05],
        "cereza": [0.5, 0.2, 0.05], "wild": [0, 0, 0]
    };
    JokerJoker.apuestasDisponibles = [
        10, 20, 30, 40, 50, 60, 70, 80, 90,
        100, 120, 140, 160, 180,
        200, 250, 300, 350, 400, 450,
        500, 600, 700, 800, 900,
        1000, 1200, 1400, 1600, 1800,
        2000
    ];
    return JokerJoker;
}(Tragamonedas_1.Tragamonedas));
exports.JokerJoker = JokerJoker;
