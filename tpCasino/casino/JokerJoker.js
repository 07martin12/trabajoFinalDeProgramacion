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
exports.JokerJoker = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var readlineSync = require("readline-sync");
var JokerJoker = /** @class */ (function (_super) {
    __extends(JokerJoker, _super);
    function JokerJoker(nombre) {
        var _this = _super.call(this, nombre) || this;
        //Se cargan los carretes aleatoriamente por defecto antes de comenzar a jugar
        _this.cargarCarretes();
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
    JokerJoker.prototype.cargarCarretes = function () {
        var filas = 3;
        var columnas = 5;
        var simbolos = Object.keys(JokerJoker.listaDePagos);
        this.carretes = [];
        for (var i = 0; i < filas; i++) {
            this.carretes[i] = [];
            for (var j = 0; j < columnas; j++) {
                //Se obtiene un indice aleatorio para seleccionar un simbolo al azar
                var indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                //el simbolo seleccionado se almacena en el array de carretes.
                this.carretes[i][j] = simbolos[indiceAleatorio];
            }
        }
    };
    JokerJoker.prototype.jugar = function (apuesta) {
        try {
            console.log("Iniciando juego...");
            //Al apretar la palanca para jugar los carretes cambiaron sus valores aleatoriamente
            this.cargarCarretes();
            //Se analizan los simbolos de los carretes buscando combinaciones ganadoras y retornando su ganancia
            var gananciaMultiplicador = this.calcularGanancia();
            //La ganancia se multiplica por la apuesta del jugador solo si no es igual a 0, lo que indica que hubo combinaciones ganadoras.
            var ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
            //La ganancia se almacena en el resultado actual del jugador en esta partida
            this.setResultado(ganancia);
        }
        catch (error) {
            console.error("Error durante el juego:", error);
        }
    };
    JokerJoker.prototype.calcularGanancia = function () {
        //se buscan combinaciones ganadoras en el array de carretes y se almacenan sus ganancias correspondientes
        var ganancia = this.lecturaVertical();
        ganancia += this.lecturaHorizontal();
        ganancia += this.lecturaDiagonal();
        return ganancia;
    };
    JokerJoker.prototype.lecturaVertical = function () {
        //Se recorre la matriz fila por fila
        //Se cuentan la cantidad de simbolos adyacentes que son iguales buscando aquellas combinaciones que cumplan con los requisitos para ser ganadoras
        var contador = 1;
        for (var fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] || this.carretes[fila][0] === JokerJoker.simboloEspecialWild)
                contador++;
        //Si hay una combinacion de 3 simbolos iguales y adyacentes entonces el jugador gano la apuesta
        if (contador === 3)
            //Se verifica en 'combinacionesGanadoras[contador]' que exista una clave para la posicion dada por el contador (3) 
            //Si existe una clave asociada al contador actual entonces se recorre el array asociado a la clave buscando que el simbolo actual se encuentre presente
            //Si se encuentra presente entonces el simbolo tiene combinaciones ganadoras para la longitud de la combinacion dada por el contador
            if (JokerJoker.combinacionesGanadoras[contador] &&
                JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                //Si el simbolo tiene combinaciones ganadoras para la longitud actual entonces 
                //this.carretes[0][0] es el nombre del simbolo actual que se relaciona con una de las claves del objeto de 'listaDePagos'
                //contador -1 es la posicion del simbolo actual dentro del array que esta asociado a la clave del simbolo y contiene el valor pago de la combiancion ganadora
                //se retorna el valor pago de la combinacion ganadora
                return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        //Si no hay combinacion ganadora la ganancia es de 0
        return 0;
    };
    JokerJoker.prototype.lecturaHorizontal = function () {
        var contador = 1;
        //Se recorre la matriz columna por columna
        //Se cuentan la cantidad de simbolos adyacentes que son iguales buscando aquellas combinaciones que cumplan con los requisitos para ser ganadoras
        for (var columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] || this.carretes[0][columna] === JokerJoker.simboloEspecialWild)
                contador++;
        //Si hay una combinacion de 3 a 5 simbolos iguales y adyacentes entonces el jugador gano la apuesta
        //Se verifica en 'combinacionesGanadoras[contador]' que exista una clave para la posicion dada por el contador (3) 
        //Si existe una clave asociada al contador actual entonces se recorre el array asociado a la clave buscando que el simbolo actual se encuentre presente
        //Si se encuentra presente entonces el simbolo tiene combinaciones ganadoras para la longitud de la combinacion dada por el contador
        if ((contador > 2 && contador < 6) &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            //Si el simbolo tiene combinaciones ganadoras para la longitud actual entonces 
            //this.carretes[0][0] es el nombre del simbolo actual que se relaciona con una de las claves del objeto de 'listaDePagos'
            //contador -1 es la posicion del simbolo actual dentro del array que esta asociado a la clave del simbolo y contiene el valor pago de la combiancion ganadora
            //se retorna el valor pago de la combinacion ganadora
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        //Si no hay combinacion ganadora la ganancia es de 0
        return 0;
    };
    JokerJoker.prototype.lecturaDiagonal = function () {
        var contador = 1;
        var fila = 1;
        var columna = 1;
        //Se recorre la primer diagonal de la matriz 
        //Se cuentan la cantidad de simbolos adyacentes que son iguales buscando aquellas combinaciones que cumplan con los requisitos para ser ganadoras
        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === this.carretes[0][0] || this.carretes[fila][columna] === JokerJoker.simboloEspecialWild)
                contador++;
            fila++;
            columna++;
        }
        //Si hay una combinacion de 3 simbolos iguales y adyacentes entonces el jugador gano la apuesta
        //Se verifica en 'combinacionesGanadoras[contador]' que exista una clave para la posicion dada por el contador (3) 
        //Si existe una clave asociada al contador actual entonces se recorre el array asociado a la clave buscando que el simbolo actual se encuentre presente
        //Si se encuentra presente entonces el simbolo tiene combinaciones ganadoras para la longitud de la combinacion dada por el contador
        if (contador === 3 &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            //Si el simbolo tiene combinaciones ganadoras para la longitud actual entonces 
            //this.carretes[0][0] es el nombre del simbolo actual que se relaciona con una de las claves del objeto de 'listaDePagos'
            //contador -1 es la posicion del simbolo actual dentro del array que esta asociado a la clave del simbolo y contiene el valor pago de la combiancion ganadora
            //se retorna el valor pago de la combinacion ganadora
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];
        //Si no hay combinacion ganadora la ganancia es de 0
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
        // Se verifica si el monto ingresado por el usuario está presente en la lista de apuestas disponibles
        return JokerJoker.apuestasDisponibles.indexOf(eleccion) !== -1;
    };
    JokerJoker.prototype.elegirApuesta = function (saldoDisponible) {
        var apuestaTotal = 0;
        var opcion = 1;
        try {
            while (opcion != 0) {
                var entrada = readlineSync.question("Elija su apuesta:\n");
                var eleccion = parseInt(entrada);
                if (isNaN(eleccion)) {
                    console.log("Entrada no válida. Debe ingresar un número.\n");
                    continue;
                }
                if (!this.apuestaExistente(eleccion)) {
                    console.log("Opción no válida. Elija una apuesta disponible.\n");
                }
                else {
                    apuestaTotal += eleccion;
                    console.log("Ha apostado " + eleccion + " pesos.\n");
                    console.log("Apuesta total acumulada: " + apuestaTotal + " pesos.\n");
                    if (apuestaTotal > saldoDisponible) {
                        console.log("No tiene suficiente saldo para esta apuesta acumulada, intente nuevamente.\n");
                        apuestaTotal = 0;
                        continue;
                    }
                    var seguir = readlineSync.question("¿Desea seguir apostando? (1 para continuar apostando, 0 para salir de apuestas):\n");
                    opcion = parseInt(seguir);
                    if (isNaN(opcion) || (opcion !== 0 && opcion !== 1)) {
                        console.log("Opción no válida. Por favor, elija 1 para seguir apostando o 0 para dejar de apostar.\n");
                        opcion = 1;
                    }
                    else if (opcion === 0) {
                        console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " pesos.\n");
                        return apuestaTotal;
                    }
                }
            }
        }
        catch (error) {
            console.error("Ocurrió un error durante la elección de apuesta:", error);
        }
        return 0;
    };
    JokerJoker.simboloEspecialWild = "wild";
    // Se crea un objeto estatico e inmutable que asocia un número (3, 4 o 5) con un arreglo de símbolos ganadores del tipo string.
    JokerJoker.combinacionesGanadoras = {
        5: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        4: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        3: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"]
    };
    // Se crea un objeto estatico e inmutable donde cada clave es el nombre de un símbolo y su valor es un arreglo numerico de pagos correspondientes a las apuestas ganadoras.
    // Cada arreglo representa los pagos por 3, 4 o 5 símbolos iguales (en ese orden).
    JokerJoker.listaDePagos = {
        "diamante": [20, 5, 1], "siete": [10, 3, 0.6],
        "bar": [8, 2, 0.3], "estrella": [5, 1.5, 0.2],
        "campana": [5, 1.5, 0.2], "sandia": [0.8, 0.3, 0.075],
        "uvas": [0.8, 0.3, 0.075], "mango": [0.8, 0.3, 0.075],
        "durazno": [0.5, 0.2, 0.05], "limon": [0.5, 0.2, 0.05],
        "cereza": [0.5, 0.2, 0.05], "wild": [0, 0, 0]
    };
    //Se crea un arreglo estatico e inmutable compuesto de valores numericos que se corresponden con las apuestas disponibles para el  usuario (fichas)
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
