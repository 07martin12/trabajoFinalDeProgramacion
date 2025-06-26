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
exports.Ruleta = void 0;
var rls = require("readline-sync");
var Juego_1 = require("./Juego");
var Ruleta = /** @class */ (function (_super) {
    __extends(Ruleta, _super);
    function Ruleta(pGanoPerdio, pApuestaEsPar, pApuestaColor, pApuestaNumero, pColorGanador, pNumeroGanador, pElegirEsPar, pPolorElegido, pNumeroElegido, pNombreDeJuego, pApuesta, pCreditoActual, pNumeros, pColor, pEsPar, pArrayDeApuestas) {
        var _this = _super.call(this, pNombreDeJuego, pCreditoActual) || this;
        _this.numeroElegido = 0; //numero al que se apostara
        _this.apuestaNumero = 0; //apuesta de Numero
        _this.numeroGanador = 0; //numero Ganador
        _this.apuestaColor = 0; //apuesta de Color
        _this.apuestaEsPar = 0; //apuesta de EsPar
        _this.ganoPerdio = 0; //elimnar atributo
        _this.apuesta = 0;
        _this.nuevoSaldo = 0; //nuevo saldo, para equiparar el credito Actual -CreditoActual
        //----------------------------------------------------------------------------------------------------
        //NUMEROS DE LA RULETA
        //FUNCION crea un arreglo de 12 items
        _this.funcionNumeroRuleta = function () {
            var ruletaNumeros = new Array(12);
            //completa los items del 0 al 11
            for (var i = 0; i < ruletaNumeros.length; i++) {
                ruletaNumeros[i] = i;
            }
            ;
            //le da el valor al arreglo original
            _this.setNumeros(ruletaNumeros);
            //Retorna el array
            return _this.getNumeros();
        };
        //FUNCION ENTREGA NUMERO RANDOM (NUMERO GANADOR)
        _this.funcionNumeroGanador = function () {
            _this.setNumeroGanador(_this.funcionNumeroRuleta()[Math.floor(Math.random() * _this.getNumeros().length)]);
            //entrega un numero random ganador
            return _this.getNumeroGanador();
        };
        //----------------------------------------------------------------------------------------------------
        //COLORES DE LA RULETA
        //CREA LOS COLORES DE LA RULETA
        _this.funcionColorRuleta = function () {
            var ruletaColores = new Array(12);
            //crea un arreglo de nombres de colores
            var nombreDeColores = ["celeste", "blanco", "rojo"];
            //Le asigna un nombre color a cada elemento del arreglo principal (aplica operacion resto, para repetir 4 hasta para completarlo)
            for (var i = 0; i < ruletaColores.length; i++) {
                ruletaColores[i] = nombreDeColores[i % nombreDeColores.length];
            }
            //le asignamos el arreglo al atributo Color
            _this.setColor(ruletaColores);
            return _this.getColor();
        };
        _this.funcionColorGanador = function () {
            //Asignamos el color segun el numero ganador
            _this.setColorGanador(_this.funcionColorRuleta()[_this.getNumeroGanador()]);
            return _this.getColorGanador();
        };
        //----------------------------------------------------------------------------------------------------
        //PAR O IMPAR
        //Asignamos par o impar segun corresponda
        _this.funcionParoImpar = function () {
            if (_this.getNumeroGanador() % 2 === 0) {
                _this.setEsPar(true);
            }
            else {
                _this.setEsPar(false);
            }
            //damos la informacion
            if (_this.getEsPar() === true) {
                return _this.getEsPar();
            }
            else {
                return _this.getEsPar();
            }
        };
        //----------------------------------------------------------------------------------------------------
        //PAR O IMPAR PARA LA RULETA
        //Asignamos par o impar segun corresponda
        _this.funcionRuletaParoImpar = function (pNumeros) {
            if (pNumeros % 2 === 0) {
                var Par = "Par";
                return Par;
            }
            else {
                var imPar = "Impar";
                return imPar;
            }
            ;
        };
        //----------------------------------------------------------------------------------------------------
        //APUESTAS (Crear ARRAY)
        //Iniciar Array de posibles apuestas
        _this.funcionPosiblesApuestas = function () {
            //ejemplo - inicio credito en 10000
            //creamos el arreglo con la cantidad de posibles apuestas
            var arregloPrototipoApuestas = new Array(6);
            //asignamos el valor de cada elemento de 1000 en 1000, incluyendo el ultimo lugar para all-in
            for (var j = 0; j < (arregloPrototipoApuestas.length - 1); j++) {
                arregloPrototipoApuestas[j] = (j + 1) * 1000;
            }
            //all-in
            //agrega Credito Actual al ultimo lugar, desde el penultimo lugar, modifica un lugar, y le da el valor de creditoActual
            arregloPrototipoApuestas.splice(arregloPrototipoApuestas.length - 1, 1, _this.getCreditoActual());
            //el valor al arreglo correspondiente de apuestas
            _this.setArrayDeApuestas(arregloPrototipoApuestas);
            return _this.getArrayDeApuestas();
        };
        //----------------------------------------------------------------------------------------------------
        //FUNCION ELEGIR NUMERO
        _this.funcionElegirNumero = function () {
            //INGRESA LA OPCION DEL NUMERO QUE DESEA APOSTAR POR QUESTION.INT
            _this.setNumeroElegido(rls.questionInt("Por favor ingrese el numero al que quiere jugar su apuesta\n ".concat(_this.getNumeros().join(", "), "\n")));
            //HACEMOS UN BUCLE QUE SI EL NUMERO INGRESADO, NO CUMPLE CON LA CONDICION, TE LO VUELVE A PEDIR HASTA QUE SE CUMPLA
            //EL NUMERO DEBE ESTAR DENTRO DEL ARRAY DE NUMEROS, DEBE SER MAYOR/IGUAL A 0 Y MENOS/IGUAL A 11
            while (!(_this.getNumeros()[_this.getNumeroElegido()] >= 0 && _this.getNumeros()[_this.getNumeroElegido()] <= 11)) {
                console.log("\nNo es posible\n");
                _this.setNumeroElegido(rls.questionInt("****Por favor ingrese el numero al que quiere jugar su apuesta\n\n------------------------------------- ".concat(_this.getNumeros().join(", "), "\n\n\n-------------------------------------\n")));
            }
            //RETORNA EL VALOR APOSTADO DE TIPO NUMBER
            console.log("A elegido el numero ".concat(_this.getNumeros()[_this.getNumeroElegido()], " para jugar"));
            return _this.getNumeros()[_this.getNumeroElegido()];
        };
        //----------------------------------------------------------------------------------------------------
        //FUNCION ELEGIR COLOR
        _this.funcionElegirColor = function () {
            //INGRESA LA OPCION DEL COLOR QUE DESEA APOSTAR POR QUESTION.INT
            _this.setColorElegido(rls.questionInt("-------------------------------------\nPor favor ingrese el Color al que quiere jugar su apuesta\n-------------------------------------\n\n1 para elegir el color ".concat(_this.getColor()[0], "\n---------------\n2 para elegir el color ").concat(_this.getColor()[1], "\n---------------\n3 para elegir el color ").concat(_this.getColor()[2], " \n---------------\n")) - 1);
            //HACEMOS UN BUCLE QUE SI EL NUMERO INGRESADO, NO CUMPLE CON LA CONDICION, TE LO VUELVE A PEDIR HASTA QUE SE CUMPLA
            //EL NUMERO DEBE ESTAR DENTRO DEL ARRAY DE NUMEROS, DEBE SER MAYOR/IGUAL A 0 Y MENOS/IGUAL A 11
            while (!(_this.getColorElegido() >= 0) ||
                !(_this.getColorElegido() <= 2)) {
                console.log("\nNo es posible\n");
                _this.setColorElegido(rls.questionInt("-------------------------------------\nPor favor ingrese el Color al que quiere jugar su apuesta\n-------------------------------------\n1 ".concat(_this.getColor()[0], "\n---------------\n2 ").concat(_this.getColor()[1], ",\n---------------\n3 ").concat(_this.getColor()[2], " ---------------\n\n")) - 1);
            }
            //RETORNA EL VALOR APOSTADO DE TIPO STRING
            console.log("A elegido el color ".concat(_this.getColor()[_this.getColorElegido()], " para jugar"));
            return _this.getColor()[_this.getColorElegido()];
        };
        //----------------------------------------------------------------------------------------------------
        //FUNCION ELEGIR ES PAR
        _this.funcionElegirEsPar = function () {
            //INGRESA LA OPCION DE PAR O IMPAR SEGUN QUIERA APOSTAR POR QUESTION.INT
            _this.setElegirEsPar(rls.questionInt("-------------------------------------\nPor favor elige si desea apostar a par o impar\n---------------\n1 para elegir Par \n---------------\n2 para elegir Impar\n---------------\n") - 1);
            //INICIAMOS UN BUCLE, SINO ES OPCION 1 O 2, NO DEJARA AVANZAR
            while ((_this.getElegirEsPar()) < 0 || (_this.getElegirEsPar()) >= 2) {
                _this.setElegirEsPar(rls.questionInt("-------------------------------------\nPor favor elige si desea apostar a par o impar\n---------------\n1 para elegir Par\n---------------\n2 para elegir Impar\n---------------\n") - 1);
            }
            //COMPROBAMOS NUMERO LA ELECCION Y DEVUELVE TRUE O FALSE SEGUN CORRESPONDA
            if ((_this.getElegirEsPar() == 0)) {
                console.log("---------------\nA elegido jugar a Par\n---------------\n");
                return true;
            }
            else {
                console.log("---------------\nA elegido jugar a Impar\n---------------\n");
                return false;
            }
        };
        //----------------------------------------------------------------------------------------------------
        //FUNCION APOSTAR
        _this.funcionApostar = function () {
            //INGRESA LA OPCION QUE DESEA APOSTAR POR QUESTION.INT
            _this.setApuesta(rls.questionInt("ingrese la cantidad que desea apostar \n1 para apostar ".concat(_this.getArrayDeApuestas()[0], "\n2 para apostar ").concat(_this.getArrayDeApuestas()[1], "\n3 para apostar ").concat(_this.getArrayDeApuestas()[2], "\n4 para apostar ").concat(_this.getArrayDeApuestas()[3], "\n5 para apostar ").concat(_this.getArrayDeApuestas()[4], "\n6 para apostar ").concat(_this.getArrayDeApuestas()[5], "\n")) - 1);
            //HACEMOS UN BUCLE QUE SI EL NUMERO INGRESADO, NO CUMPLE CON LA CONDICION, TE LO VUELVE A PEDIR HASTA QUE SE CUMPLA
            //SI ES MENOR QUE 0, O MAYOR QUE 5 O LA OPCION INGRESADA ES MENOR AL CREIDTO DISPONIBLE
            while ((_this.getApuesta()) < 0
                || (_this.getApuesta()) > 5
                || (_this.getArrayDeApuestas()[_this.getApuesta()]) > _this.getCreditoActual()) {
                _this.setApuesta(rls.questionInt("ingrese la cantidad que desea apostar \n1 para apostar ".concat(_this.getArrayDeApuestas()[0], "\n2 para apostar ").concat(_this.getArrayDeApuestas()[1], "\n3 para apostar ").concat(_this.getArrayDeApuestas()[2], "\n4 para apostar ").concat(_this.getArrayDeApuestas()[3], "\n5 para apostar ").concat(_this.getArrayDeApuestas()[4], "\n6 para apostar ").concat(_this.getArrayDeApuestas()[5], "\n")) - 1);
            }
            //INFORMA QUE LA APUESTA ES CORRECTA
            console.log("su apuesta de ".concat(_this.getArrayDeApuestas()[_this.getApuesta()], " se registro correctamente, mucha suerte"));
            //RETORNA EL VALOR APOSTADO DE TIPO NUMBER, DESDE EL ARRAY DE APUESTA
            return _this.getArrayDeApuestas()[_this.getApuesta()];
        };
        //----------------------------------------------------------------------------------------------------
        //CALCULAR RESULTADO NUMERO
        _this.calcularGananciaNumero = function (apuesta) {
            _this.setApuestaNumero(apuesta); //(this.getArrayDeApuestas()[this.getApuesta()]));
            _this.setCreditoActual((_this.getCreditoActual()) - (_this.getApuestaNumero()));
            console.log("el saldo es ".concat(_this.getCreditoActual(), " "));
        };
        //CALCULAR RESULTADO COLOR
        _this.calcularGananciaColor = function (apuesta) {
            _this.setApuestaColor(apuesta);
            _this.setCreditoActual((_this.getCreditoActual()) - (_this.getApuestaColor()));
            console.log("el saldo es ".concat(_this.getCreditoActual(), " "));
        };
        //CALCULAR RESULTADO PARIDAD
        _this.calcularGananciaEsPar = function (apuesta) {
            _this.setApuestaEsPar(apuesta);
            _this.setCreditoActual((_this.getCreditoActual()) - (_this.getApuestaEsPar()));
            console.log("el saldo es ".concat(_this.getCreditoActual(), " "));
        };
        //----------------------------------------------------------------------------------------------------
        //FUNCION CALCULAR GANANCIA
        _this.calcularGanancia = function () {
            if (!(_this.getApuestaNumero() === 0)) {
                //comprobamos si saca el numero, la apuesta se multiplica * 8 y se suma al credito
                if ((_this.getNumeroElegido()) === (_this.getNumeroGanador())) {
                    _this.setCreditoActual(_this.getApuestaNumero() * 9 + _this.getCreditoActual());
                    console.log("ah ganado 8 veces mas de su apuesta de ".concat(_this.getApuestaNumero(), " por sacar pleno en ").concat(_this.getNumeroGanador(), ", ahora su saldo es de ").concat(_this.getCreditoActual()));
                }
                //Sino restamos la apuesta al credito
                else {
                    console.log("ah perdido su apuesta de ".concat(_this.getApuestaNumero(), " al numero ").concat(_this.getNumeroElegido(), ", su saldo esta en ").concat(_this.getCreditoActual()));
                }
            }
            //color
            if (!(_this.getApuestaColor() === 0)) {
                if ((_this.getColor()[_this.getColorElegido()]) === (_this.getColorGanador())) {
                    _this.setCreditoActual(((_this.getApuestaColor()) * 3) + _this.getCreditoActual());
                    console.log("ah ganado 2 veces mas de su apuesta de ".concat(_this.getApuestaColor(), " por pegar en ").concat(_this.getColorGanador(), ", ahora su saldo es de ").concat(_this.getCreditoActual()));
                }
                //Sino restamos la apuesta al credito
                else {
                    console.log("ah perdido su apuesta de ".concat(_this.getApuestaColor(), " al Color ").concat(_this.getColor()[_this.getColorElegido()], ", su saldo esta en ").concat(_this.getCreditoActual()));
                }
            }
            //color
            if (!(_this.getApuestaEsPar() === 0)) {
                if ((((_this.getElegirEsPar()) === 0) && ((_this.getEsPar()) === true)) || (((_this.getElegirEsPar()) === 1) && ((_this.getEsPar()) === false))) {
                    _this.setCreditoActual(((_this.getApuestaEsPar()) * 2) + _this.getCreditoActual());
                    console.log("ah ganado 2 veces mas de su apuesta de ".concat(_this.getApuestaEsPar(), " por sacar pleno en paridad mixta, ahora su saldo es de ").concat(_this.getCreditoActual()));
                }
                //Sino restamos la apuesta al credito
                else {
                    console.log("ah perdido su apuesta de ".concat(_this.getApuestaEsPar(), " al numero ").concat(_this.getNumeroElegido(), ", su saldo esta en ").concat(_this.getCreditoActual()));
                }
            }
            _this.setApuestaNumero(0);
            _this.setApuestaColor(0);
            _this.setApuestaEsPar(0);
            return _this.getCreditoActual();
        };
        //----------------------------------------------------------------------------------------------------
        //PRESENTACION DE LA RULETA
        _this.funcionRuletaCompleta = function () {
            return console.log("-------RULETA DE LA SUERTE------- \n\nN\u00FAmero ".concat(_this.funcionNumeroRuleta()[0], "||").concat(_this.funcionColorRuleta()[0], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[0]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[1], "||").concat(_this.funcionColorRuleta()[1], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[1]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[2], "||").concat(_this.funcionColorRuleta()[2], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[2]), "\n\nN\u00FAmero ").concat(_this.funcionNumeroRuleta()[3], "||").concat(_this.funcionColorRuleta()[3], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[3]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[4], "||").concat(_this.funcionColorRuleta()[4], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[4]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[5], "||").concat(_this.funcionColorRuleta()[5], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[5]), "\n\nN\u00FAmero ").concat(_this.funcionNumeroRuleta()[6], "||").concat(_this.funcionColorRuleta()[6], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[6]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[7], "||").concat(_this.funcionColorRuleta()[7], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[7]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[8], "||").concat(_this.funcionColorRuleta()[8], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[8]), "\n\nN\u00FAmero ").concat(_this.funcionNumeroRuleta()[9], "||").concat(_this.funcionColorRuleta()[9], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[9]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[10], "||").concat(_this.funcionColorRuleta()[10], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[10]), "     ******     N\u00FAmero ").concat(_this.funcionNumeroRuleta()[11], "||").concat(_this.funcionColorRuleta()[11], "||").concat(_this.funcionRuletaParoImpar(_this.funcionNumeroRuleta()[11]), "\n"));
        };
        //----------------------------------------------------------------------------------------------------
        //METODO PRINCIPAL DE JUEGO
        //INICIAMOS LA FUNCION JUGAR () DEVUELVE NUMBER
        _this.jugar = function () {
            //asignamos el credito
            //CREAMOS LOS NUMEROS DE LA RULETA
            _this.funcionNumeroRuleta();
            //CREAMOS LOS COLORES DE LA RULETA
            _this.funcionColorRuleta();
            //CREAMOS EL RANGO DE APUESTAS
            _this.funcionPosiblesApuestas();
            //PRESENTAMOS EL JUEGO
            console.log("Bienvenido al juego de la ".concat(_super.prototype.getNombre.call(_this), ", le recomendamos ser conciente de su apuesta.\n\n"));
            console.log("-Recuerde que podr\u00E1 elegir un numero del (0) al (11),\n donde si saca pleno se lleva \u00A18! veces m\u00E1s de lo que aposto.\n\n-Tambi\u00E9n podr\u00E1 elegir apostar al color entre: (Celeste), (Blanco) o (Rojo);\n y si acierta se lleva \u00A12! veces m\u00E1s de lo que aposto.\n\n-Y podr\u00E1 elegir por \u00FAltimo entre (par) o (impar),\nn pudiendo sacar \u00A1una! vez m\u00E1s de lo que aposto.\n\n\n    ****Mucha Suerte****\n\n");
            //-----------------------------------------------------------------------------------------------
            console.log("Comencemos...en primer lugar...\n");
            _this.funcionRuletaCompleta();
            _this.funcionElegirNumero();
            if (_this.getCreditoActual() >= 1000) {
                console.log("Por favor ahora ingrese la cantidad que desea apostar a numero.");
                //-------------------------------------------------------
                _this.calcularGananciaNumero(_this.funcionApostar());
                console.log("".concat(_this.getCreditoActual()));
            }
            else {
                console.log("Espere la proxima ronda para seguir apostando, su saldo no es suficiente");
            }
            console.log("Muy bien sigamos...\n");
            _this.funcionRuletaCompleta();
            _this.funcionElegirColor();
            if (_this.getCreditoActual() >= 1000) {
                console.log("Por favor ahora ingrese la cantidad que desea apostar a color.");
                //-------------------------------------------------------
                _this.calcularGananciaColor(_this.funcionApostar());
                console.log("".concat(_this.getCreditoActual()));
            }
            else {
                console.log("Espere la proxima ronda para seguir apostando, su saldo no es suficiente");
            }
            console.log("Ahora si para terminar...");
            _this.funcionRuletaCompleta();
            _this.funcionElegirEsPar();
            if (_this.getCreditoActual() >= 1000) {
                console.log("Por favor ahora ingrese la cantidad que desea apostar a par o impar.");
                //-------------------------------------------------------
                _this.calcularGananciaEsPar(_this.funcionApostar());
                console.log("".concat(_this.getCreditoActual()));
            }
            else {
                console.log("Espere la proxima ronda para seguir apostando, su saldo no es suficiente");
            }
            console.log("Muy bien, sacando numero ganador.\n\n 1...\n\n 2...\n\n 3...\n\n El numero ganador es ".concat(_this.funcionNumeroGanador()));
            console.log("Ah salido el color ".concat(_this.funcionColorGanador(), " y el numero es ").concat(_this.funcionRuletaParoImpar(_this.getNumeroGanador())));
            _this.calcularGanancia();
            console.log(_this.apuestaColor);
            console.log(_this.getCreditoActual());
            return _this.getCreditoActual();
        };
        _this.numeros = pNumeros; //array de numeros posibles
        _this.numeroElegido = pNumeroElegido; //numero al que se apostara
        _this.numeroGanador = pNumeroGanador;
        _this.apuestaNumero = pApuestaNumero;
        _this.color = pColor; // color al que se apostara
        _this.colorElegido = pPolorElegido; // la opcion del color al que se apostara
        _this.colorGanador = pColorGanador;
        _this.apuestaColor = pApuestaColor;
        _this.esPar = pEsPar; //array de par/impar para posibles apuestas
        _this.elegirEsPar = pElegirEsPar; //la opcion de elegir es par o impar a la cual se apostara
        _this.arrayDeApuestas = pArrayDeApuestas; //posibles apuestas disponibles
        _this.apuestaEsPar = pApuestaEsPar;
        _this.ganoPerdio = pGanoPerdio;
        _this.nuevoSaldo = 0; //nuevo saldo, para equiparar el credito Actual -CreditoActual
        return _this;
    }
    //----------------------------------------------------------------------------------------------------
    //REESCRIBO SET DE CREDITO ACUTAL
    Ruleta.prototype.setCreditoActual = function (pCreditoActual) {
        this.nuevoSaldo = pCreditoActual;
    };
    ;
    Ruleta.prototype.getCreditoActual = function () {
        return this.nuevoSaldo;
    };
    ;
    //metodo get de Numero Elegido
    Ruleta.prototype.setApuesta = function (pApuesta) {
        this.apuesta = pApuesta;
    };
    //metodo set de Numeros
    Ruleta.prototype.getApuesta = function () {
        return this.apuesta;
    };
    //metodo get de Numero Elegido
    Ruleta.prototype.setNumeroElegido = function (pNumerosElegido) {
        this.numeroElegido = pNumerosElegido;
    };
    //metodo set de Numeros
    Ruleta.prototype.getNumeroElegido = function () {
        return this.numeroElegido;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo get de Numeros
    Ruleta.prototype.setNumeros = function (pNumeros) {
        this.numeros = pNumeros;
    };
    //metodo set de Numeros
    Ruleta.prototype.getNumeros = function () {
        return this.numeros;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo get de Numero Ganador
    Ruleta.prototype.setNumeroGanador = function (pNumeroGanador) {
        this.numeroGanador = pNumeroGanador;
    };
    //metodo set de Numero Ganador
    Ruleta.prototype.getNumeroGanador = function () {
        return this.numeroGanador;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo set apuesta de numero
    Ruleta.prototype.setApuestaNumero = function (pApuestaNumero) {
        this.apuestaNumero = pApuestaNumero;
    };
    //metodo get apuesta de numero
    Ruleta.prototype.getApuestaNumero = function () {
        return this.apuestaNumero;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo get de Color
    Ruleta.prototype.setColor = function (pColor) {
        this.color = pColor;
    };
    //metodo set de Color
    Ruleta.prototype.getColor = function () {
        return this.color;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo get de Color Elegido
    Ruleta.prototype.setColorElegido = function (pColorElegido) {
        this.colorElegido = pColorElegido;
    };
    //metodo set de Color Elegido
    Ruleta.prototype.getColorElegido = function () {
        return this.colorElegido;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo get de Color Ganador
    Ruleta.prototype.setColorGanador = function (pColorGanador) {
        this.colorGanador = pColorGanador;
    };
    //metodo set de Color Ganador
    Ruleta.prototype.getColorGanador = function () {
        return this.colorGanador;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo set apuesta de Color
    Ruleta.prototype.setApuestaColor = function (pApuestaColor) {
        this.apuestaColor = pApuestaColor;
    };
    //metodo get apuesta de Color
    Ruleta.prototype.getApuestaColor = function () {
        return this.apuestaColor;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo get de Es Par
    Ruleta.prototype.setEsPar = function (pEsPar) {
        this.esPar = pEsPar;
    };
    //metodo set de Es Par
    Ruleta.prototype.getEsPar = function () {
        return this.esPar;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo get de Color Elegido
    Ruleta.prototype.setElegirEsPar = function (pElegirEsPar) {
        this.elegirEsPar = pElegirEsPar;
    };
    //metodo set de Color Elegido
    Ruleta.prototype.getElegirEsPar = function () {
        return this.elegirEsPar;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo set apuesta de EsPar
    Ruleta.prototype.setApuestaEsPar = function (pApuestaEsPar) {
        this.apuestaEsPar = pApuestaEsPar;
    };
    //metodo get apuesta de EsPar
    Ruleta.prototype.getApuestaEsPar = function () {
        return this.apuestaEsPar;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo set arreglo de prototipo de apuestas
    Ruleta.prototype.setArrayDeApuestas = function (pArrayDeApuestas) {
        this.arrayDeApuestas = pArrayDeApuestas;
    };
    //metodo get arreglo de prototipo de apuestas
    Ruleta.prototype.getArrayDeApuestas = function () {
        return this.arrayDeApuestas;
    };
    //----------------------------------------------------------------------------------------------------
    //metodo set gano o perdio
    Ruleta.prototype.setGanoPerdio = function (pGanoPerdio) {
        this.ganoPerdio = pGanoPerdio;
    };
    //metodo get gano o perdio
    Ruleta.prototype.getGanoPerdio = function () {
        return this.ganoPerdio;
    };
    return Ruleta;
}(Juego_1.Juego));
exports.Ruleta = Ruleta;
//var miRuleta = new Ruleta(1,1,1,1,"",1,1, 1, 1, "Ruleta", 20000, 60000, [], ["rojo"], false, []);
// mi objeto de Casino codigo dela suerte [tragomendas1 , tragamonedas2, juegoDeDados, ]
/*
console.log(miRuleta.funcionNumeroGanador());
console.log(miRuleta.funcionColorRuleta());
console.log(miRuleta.funcionColorGanador());
console.log(miRuleta.funcionParoImpar());
console.log(miRuleta.funcionPosiblesApuestas());
console.log(miRuleta.funcionElegirNumero());
console.log(miRuleta.funcionElegirColor());
console.log(miRuleta.funcionElegirEsPar());
console.log(miRuleta.funcionApostar());

console.log(miRuleta.funcionRuletaCompleta());*/
//miRuleta.jugar();
