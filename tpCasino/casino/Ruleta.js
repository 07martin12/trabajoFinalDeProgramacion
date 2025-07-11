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
exports.Ruleta = void 0;
var rls = require("readline-sync");
var Juego_1 = require("./Juego");
var Ruleta = /** @class */ (function (_super) {
    __extends(Ruleta, _super);
    function Ruleta(nombreDeJuego) {
        var _this = _super.call(this, nombreDeJuego) || this;
        // Se crea una variable  para almacenar los números de la ruleta asociados a su color
        _this.ruleta = {
            rojo: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
            negro: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
            cero: [0]
        };
        // Se crea una variable para almacenar las apuestas del jugador
        _this.apuestas = {
            "numero": 0,
            "rojo": 0,
            "negro": 0,
            "par": 0,
            "impar": 0,
            "1°_docena": 0,
            "2°_docena": 0,
            "3°_docena": 0,
            "1°_fila": 0,
            "2°_fila": 0,
            "3°_fila": 0,
            "1°_escala(1-18)": 0,
            "2°_escala(19-36)": 0,
        };
        _this.ganancia = 0;
        _this.numeroApostado = 0;
        return _this;
    }
    Ruleta.prototype.jugar = function () {
        try {
            // Generación del número aleatorio de la ruleta (0 a 36)
            var resultadoRuleta = Math.floor(Math.random() * 37);
            //Se obtiene el color del numero
            var color = "verde";
            if (this.ruleta.rojo.indexOf(resultadoRuleta) !== -1) {
                color = "rojo";
            }
            else if (this.ruleta.negro.indexOf(resultadoRuleta) !== -1) {
                color = "negro";
            }
            console.log("Número saliente: " + resultadoRuleta + " | Color saliente: " + color);
            // Se calcula la ganancia llamando a calcularGanancia con el número obtenido
            var ganancia = this.calcularGanancia(resultadoRuleta);
            // Se almacena la ganancia obtenida en el juego
            this.setGanancia(ganancia);
        }
        catch (error) {
            console.error("Error durante el juego:", error);
        }
    };
    Ruleta.prototype.getNombre = function () {
        return _super.prototype.getNombre.call(this);
    };
    Ruleta.prototype.setNombre = function (nombre) {
        return _super.prototype.setNombre.call(this, nombre);
    };
    Ruleta.prototype.getGanancia = function () {
        return this.ganancia;
    };
    Ruleta.prototype.setGanancia = function (ganancia) {
        this.ganancia = ganancia;
    };
    // Método para imprimir las apuestas disponibles
    Ruleta.prototype.printApuestasDisponibles = function () {
        // Obtienen todas las claves del objeto 'apuestas'
        var claves = Object.keys(this.apuestas);
        console.log("Apuestas disponibles:");
        for (var i = 0; i < claves.length; i++) {
            console.log((i + 1) + ') ' + claves[i]);
        }
    };
    Ruleta.prototype.elegirApuesta = function (saldoDisponible) {
        var apuestaTotal = 0;
        var opcion = 1;
        try {
            while (opcion !== 0) {
                // Se muestran las apuestas disponibles
                this.printApuestasDisponibles();
                // Se solicita al jugador elegir un tipo de apuesta
                var entrada = rls.question("Elija el numero de la apuesta que desea realizar (0 para salir):\n");
                var eleccion = parseInt(entrada);
                // Validación de la entrada
                if (isNaN(eleccion)) {
                    console.log("Entrada no válida. Debe ingresar un número.");
                    continue;
                }
                // Permitir salir si elige 0
                if (eleccion === 0) {
                    console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " pesos.");
                    return apuestaTotal; // Devuelve el monto total acumulado
                }
                // Verificar que la opción sea válida
                if (eleccion < 1 || eleccion > Object.keys(this.apuestas).length) {
                    console.log("Opción no válida. Elija una apuesta disponible.");
                    continue;
                }
                if (eleccion === 1) {
                    var numeroElegido = rls.questionInt("Ingrese el número al que desea apostar (0-36): ");
                    if (numeroElegido < 0 || numeroElegido > 36) {
                        console.log("Número inválido. Debe estar entre 0 y 36.");
                        continue;
                    }
                    this.numeroApostado = numeroElegido;
                }
                else {
                    // Reiniciar número apostado si la apuesta no es a número
                    this.numeroApostado = 0;
                }
                // Se solicita el monto de la apuesta
                var monto = rls.questionInt("Ingrese el monto de la apuesta (minimo 500, máximo 50,000):\n");
                // Validación de monto
                if (monto < 500 || monto > 50000) {
                    console.log("La apuesta debe ser mayor a 500 y menor a 50,000.");
                    continue;
                }
                // Validar que el jugador tenga saldo suficiente
                if (monto > saldoDisponible) {
                    console.log("No tiene suficiente saldo para realizar esta apuesta, recargue su saldo y vuelva a intentar.");
                    continue;
                }
                // Obtener la clave de la apuesta seleccionada
                var claves = Object.keys(this.apuestas);
                var tipoApuesta = claves[eleccion - 1];
                // Se suma la apuesta al valor actual de la clave en el objeto 'apuestas'
                this.apuestas[tipoApuesta] += monto;
                // Sumar la apuesta al total
                apuestaTotal += monto;
                console.log("Apuesta realizada: " + tipoApuesta + " por " + monto + " pesos.");
                console.log("Apuesta total acumulada: " + apuestaTotal + " pesos.");
                // Preguntar si el jugador desea seguir apostando
                var seguir = rls.question("¿Desea seguir apostando? (1 para continuar, 0 para finalizar):\n");
                opcion = parseInt(seguir);
                if (opcion === 0) {
                    console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " pesos.");
                    return apuestaTotal; // Devuelve el monto total de las apuestas
                }
            }
        }
        catch (error) {
            console.error("Ocurrió un error durante la elección de la apuesta:", error);
        }
        this.numeroApostado = 0;
        return 0;
    };
    Ruleta.prototype.calcularGanancia = function (resultado) {
        var gananciaTotal = 0;
        var tiposDeApuesta = Object.keys(this.apuestas);
        for (var i = 0; i < tiposDeApuesta.length; i++) {
            var tipoApuesta = tiposDeApuesta[i];
            var montoApostado = this.apuestas[tipoApuesta];
            if (montoApostado === 0)
                continue;
            // Buscar multiplicador
            var multiplicador = 0;
            for (var _i = 0, _a = Object.entries(Ruleta.listaDePagos); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], apuestas = _b[1];
                if (apuestas.indexOf(tipoApuesta) !== -1) {
                    multiplicador = parseInt(key);
                    break;
                }
            }
            // Evaluar si gana
            var gano = false;
            if (tipoApuesta === "numero") {
                if (resultado === this.numeroApostado) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "rojo") {
                if (resultado !== 0 && this.ruleta.rojo.includes(resultado)) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "negro") {
                if (resultado !== 0 && this.ruleta.negro.includes(resultado)) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "par") {
                if (resultado !== 0 && resultado % 2 === 0) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "impar") {
                if (resultado !== 0 && resultado % 2 !== 0) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "1°_escala(1-18)") {
                if (resultado >= 1 && resultado <= 18) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "2°_escala(19-36)") {
                if (resultado >= 19 && resultado <= 36) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "1°_docena") {
                if (resultado >= 1 && resultado <= 12) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "2°_docena") {
                if (resultado >= 13 && resultado <= 24) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "3°_docena") {
                if (resultado >= 25 && resultado <= 36) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "1°_fila") {
                if (resultado % 3 === 1) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "2°_fila") {
                if (resultado % 3 === 2) {
                    gano = true;
                }
            }
            else if (tipoApuesta === "3°_fila") {
                if (resultado % 3 === 0 && resultado !== 0) {
                    gano = true;
                }
            }
            if (gano) {
                gananciaTotal += montoApostado * multiplicador;
            }
        }
        // Reiniciar apuestas
        for (var i = 0; i < tiposDeApuesta.length; i++) {
            this.apuestas[tiposDeApuesta[i]] = 0;
        }
        return gananciaTotal;
    };
    Ruleta.prototype.imprimirNumerosRuleta = function () {
        // Imprimir números rojos
        var resultadoRojo = "";
        for (var i = 0; i < this.ruleta.rojo.length; i++) {
            resultadoRojo += this.ruleta.rojo[i];
            if (i !== this.ruleta.rojo.length - 1) {
                resultadoRojo += " | ";
            }
        }
        // Imprimir números negros
        var resultadoNegro = "";
        for (var i = 0; i < this.ruleta.negro.length; i++) {
            resultadoNegro += this.ruleta.negro[i];
            if (i !== this.ruleta.negro.length - 1) {
                resultadoNegro += " | ";
            }
        }
        console.log("0\n" + resultadoRojo + "\n" + resultadoNegro);
    };
    Ruleta.listaDePagos = {
        36: ["numero"],
        3: ["1°_docena", "2°_docena", "3°_docena", "1°_fila", "2°_fila", "3°_fila"],
        2: ["rojo", "negro", "par", "impar", "1°_escala(1-18)", "2°_escala(19-36)"]
    };
    return Ruleta;
}(Juego_1.Juego));
exports.Ruleta = Ruleta;
