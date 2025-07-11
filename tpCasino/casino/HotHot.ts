import { CalculadorDeGanancia } from './CalculadorDeGanancia';
import { Tragamonedas } from './Tragamonedas';
import * as readlineSync from 'readline-sync';

export class HotHot extends Tragamonedas implements CalculadorDeGanancia {
    private static readonly simboloEspecialSpin = "free-spin";
    // Se crea un objeto estatico e inmutable que asocia un número (3, 4 o 5) con un arreglo de símbolos ganadores del tipo string.
    private static readonly combinacionesGanadoras: { [key: number]: string[] } = {
        5: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"],
        4: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"],
        3: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"]
    };
    // Se crea un objeto estatico e inmutable donde cada clave es el nombre de un símbolo y su valor es un arreglo numerico de pagos correspondientes a las apuestas ganadoras.
    // Cada arreglo representa los pagos por 3, 4 o 5 símbolos iguales (en ese orden).
    private static readonly listaDePagos: { [key: string]: number[] } = {
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

    //Se crea un arreglo estatico e inmutable compuesto de valores numericos que se corresponden con las apuestas disponibles para el  usuario (fichas)
    private static readonly apuestasDisponibles: number[] = [
        25, 50, 75, 100, 125, 150, 175, 200, 225, 250,
        300, 350, 400, 450, 500,
        625, 750, 875, 1000, 1125, 1250, 1375, 1500,
        1625, 1750, 1875, 2000
    ];

    private carretes: string[][];

    public constructor(nombre: string) {
        super(nombre);
        //Se cargan los carretes aleatoriamente por defecto antes de comenzar a jugar
        this.cargarCarretes();
    }

    public getSimboloEspecial(): string {
        return HotHot.simboloEspecialSpin;
    }

    public getListaDePagos(): { [key: string]: number[] } {
        return HotHot.listaDePagos;
    }

    public getApuestasDisponibles(): number[] {
        return HotHot.apuestasDisponibles;
    }

    public getCombinacionesGanadoras(): { [key: number]: string[] } {
        return HotHot.combinacionesGanadoras;
    }

    public getNombre(): string {
        return super.getNombre();
    }

    public setNombre(nombre: string): void {
        return super.setNombre(nombre);
    }

    public getResultado(): number {
        return super.getResultado();
    }

    public setResultado(resultado: number): void {
        super.setResultado(resultado);
    }

    public getCarretes(): string[][] {
        return this.carretes;
    }

    public jugar(apuesta: number): void {
        try {
            console.log("Iniciando juego...");
             //Al apretar la palanca para jugar los carretes cambiaron sus valores aleatoriamente
            this.cargarCarretes();
            //Se analizan los simbolos de los carretes buscando combinaciones ganadoras y retornando su ganancia
            const gananciaMultiplicador = this.calcularGanancia();
            //La ganancia se multiplica por la apuesta del jugador solo si no es igual a 0, lo que indica que hubo combinaciones ganadoras.
            const ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
            //La ganancia se almacena en el resultado actual del jugador en esta partida
            this.setResultado(ganancia);
        } catch (error) {
            console.error("Error durante el juego:", error);
            this.setResultado(0);
        }
    }    

    public calcularGanancia(): number {
        //se realiza una lectura especial evaluando si el jugador consiguo tiradas gratis  por conseguir una combinación de simbolos especiales
        let tiradasGratis = this.hayTiradaGratis();
        let ganancia = 0;
        //se buscan combinaciones ganadoras en el array de carretes y se almacenan sus ganancias correspondientes
        ganancia += this.lecturaVertical();
        ganancia += this.lecturaHorizontal();
        ganancia += this.lecturaDiagonal();

        //si hay tiradas gratis entonces el bucle vuelve a cargar los carretes de valores aleatorios y sigue evaluando las combinaciones ganadoras y almacenando la ganancia correspondiente
        if (tiradasGratis > 0)
            while (tiradasGratis > 0) {
                this.cargarCarretes();
                tiradasGratis = this.hayTiradaGratis();
                ganancia += this.lecturaVertical();
                ganancia += this.lecturaHorizontal();
                ganancia += this.lecturaDiagonal();
                tiradasGratis--;
            }

        return ganancia;
    }

    public lecturaVertical(): number {
        let contador = 1;
         //Se recorre la matriz fila por fila
        //Se cuentan la cantidad de simbolos adyacentes que son iguales buscando aquellas combinaciones que cumplan con los requisitos para ser ganadoras
        for (let fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] && this.carretes[fila][0] !== HotHot.simboloEspecialSpin)
                contador++;
         //Si hay una combinacion de 3 simbolos iguales y adyacentes entonces el jugador gano la apuesta
        if (contador === 3)
             //Se verifica en 'combinacionesGanadoras[contador]' que exista una clave para la posicion dada por el contador (3) 
            //Si existe una clave asociada al contador actual entonces se recorre el array asociado a la clave buscando que el simbolo actual se encuentre presente
            //Si se encuentra presente entonces el simbolo tiene combinaciones ganadoras para la longitud de la combinacion dada por el contador
            if (HotHot.combinacionesGanadoras[contador] &&
                HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                //Si el simbolo tiene combinaciones ganadoras para la longitud actual entonces 
                //this.carretes[0][0] es el nombre del simbolo actual que se relaciona con una de las claves del objeto de 'listaDePagos'
                //contador -1 es la posicion del simbolo actual dentro del array que esta asociado a la clave del simbolo y contiene el valor pago de la combiancion ganadora
                //se retorna el valor pago de la combinacion ganadora
                return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];
        //Si no hay combinacion ganadora la ganancia es de 0
        return 0;
    }

    public lecturaHorizontal(): number {
        let contador = 1;
         //Se recorre la matriz columna por columna
        //Se cuentan la cantidad de simbolos adyacentes que son iguales buscando aquellas combinaciones que cumplan con los requisitos para ser ganadoras
        for (let columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] && this.carretes[0][columna] !== HotHot.simboloEspecialSpin)
                contador++;
         //Si hay una combinacion de 3 a 5 simbolos iguales y adyacentes entonces el jugador gano la apuesta
        //Se verifica en 'combinacionesGanadoras[contador]' que exista una clave para la posicion dada por el contador (3) 
        //Si existe una clave asociada al contador actual entonces se recorre el array asociado a la clave buscando que el simbolo actual se encuentre presente
        //Si se encuentra presente entonces el simbolo tiene combinaciones ganadoras para la longitud de la combinacion dada por el contador
        if (contador === 3 &&
            HotHot.combinacionesGanadoras[contador] &&
            HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            //Si el simbolo tiene combinaciones ganadoras para la longitud actual entonces 
            //this.carretes[0][0] es el nombre del simbolo actual que se relaciona con una de las claves del objeto de 'listaDePagos'
            //contador -1 es la posicion del simbolo actual dentro del array que esta asociado a la clave del simbolo y contiene el valor pago de la combiancion ganadora
            //se retorna el valor pago de la combinacion ganadora
            return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];
        //Si no hay combinacion ganadora la ganancia es de 0
        return 0;
    }

    public lecturaDiagonal(): number {
        let contador = 1;
        let fila = 1;
        let columna = 1;
         //Se recorre la primer diagonal de la matriz 
        //Se cuentan la cantidad de simbolos adyacentes que son iguales buscando aquellas combinaciones que cumplan con los requisitos para ser ganadoras
        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === this.carretes[0][0] && this.carretes[fila][columna] !== HotHot.simboloEspecialSpin)
                contador++;

            fila++;
            columna++;
        }
        //Si hay una combinacion de 3 simbolos iguales y adyacentes entonces el jugador gano la apuesta
         //Se verifica en 'combinacionesGanadoras[contador]' que exista una clave para la posicion dada por el contador (3) 
         //Si existe una clave asociada al contador actual entonces se recorre el array asociado a la clave buscando que el simbolo actual se encuentre presente
        //Si se encuentra presente entonces el simbolo tiene combinaciones ganadoras para la longitud de la combinacion dada por el contador
        if (contador === 3 && HotHot.combinacionesGanadoras[contador] &&
            HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            //Si el simbolo tiene combinaciones ganadoras para la longitud actual entonces 
            //this.carretes[0][0] es el nombre del simbolo actual que se relaciona con una de las claves del objeto de 'listaDePagos'
            //contador -1 es la posicion del simbolo actual dentro del array que esta asociado a la clave del simbolo y contiene el valor pago de la combiancion ganadora
            //se retorna el valor pago de la combinacion ganadora
            return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];
        //Si no hay combinacion ganadora la ganancia es de 0
        return 0;
    }

    //se cargan los carretes aleatoriamente tomando las claves del objeto listaDePagos como un arreglo con los nombres de todos los simbolos disponibles
    public cargarCarretes(): void {
        const filas = 3;
        const columnas = 5;
        const simbolos = Object.keys(HotHot.listaDePagos);
        this.carretes = [];

        for (let i = 0; i < filas; i++) {
            this.carretes[i] = [];
            for (let j = 0; j < columnas; j++) {
                const indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                this.carretes[i][j] = simbolos[indiceAleatorio];
            }
        }
    }

    public hayTiradaGratis(): number {
        let contador = 0;
        //Si el primer simbolo del carrete no es un simbolo especial entonces no hay tirada gratis
        if (this.carretes[0][0] != HotHot.simboloEspecialSpin)
            return 0;

        let tiradasGratis = 0;
        //Se realiza una lectura vertical para buscar simbolos especiales
        for (let fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === HotHot.simboloEspecialSpin)
                contador++;
        //Se realiza una lectura horizontal para buscar simbolos especiales
        for (let columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === HotHot.simboloEspecialSpin)
                contador++;

        let fila = 1;
        let columna = 1;
        //Se realiza una lectura en diagonal para buscar simbolos especiales
        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === HotHot.simboloEspecialSpin)
                contador++;

            fila++;
            columna++;
        }
        //Si se contaron 3 o mas simbolos adyacentes y del mismo tipo entonces el jugador obtiene 3 tiradas gratis
        if (contador >= 3)
            tiradasGratis = 3;

        return tiradasGratis;
    }

    public imprimirCarretes(): void {
        console.log("\nCarretes de " + this.getNombre() + ":\n");
        for (let fila = 0; fila < this.carretes.length; fila++) {
            let filaStr = "";
            for (let col = 0; col < this.carretes[fila].length; col++) {
                filaStr += this.carretes[fila][col] + " | ";
            }
            console.log(filaStr);
        }
    }


    public printApuestasDisponibles(): void {
        let apuestasString = '';
        //se publican las apuestas disponibles de cada juego almacenadas en un array
        for (let i = 0; i < HotHot.apuestasDisponibles.length; i++) {
            apuestasString += HotHot.apuestasDisponibles[i];
            if (i < HotHot.apuestasDisponibles.length - 1) {
                apuestasString += ' | ';
            }
        }
        console.log("Apuestas disponibles: " + apuestasString);
    }

    public apuestaExistente(eleccion: number): boolean {
        // Se verifica si el monto ingresado por el usuario está presente en la lista de apuestas disponibles
        return HotHot.apuestasDisponibles.indexOf(eleccion) !== -1;
    }

    public elegirApuesta(saldoDisponible: number): number {
        let apuestaTotal = 0;
        let opcion = 1;
    
        try {
            while (opcion != 0) {
                const entrada = readlineSync.question("Elija su apuesta:\n");
                const eleccion = parseInt(entrada);
    
                if (isNaN(eleccion)) {
                    console.log("Entrada no válida. Debe ingresar un número.\n");
                    continue;
                }
    
                if (!this.apuestaExistente(eleccion)) {
                    console.log("Opción no válida. Elija una apuesta disponible.\n");
                } else {
                    apuestaTotal += eleccion;
                    console.log("Ha apostado " + eleccion + " monedas.\n");
                    console.log("Apuesta total acumulada: " + apuestaTotal + " monedas.\n");
    
                    if (apuestaTotal > saldoDisponible) {
                        console.log("No tiene suficiente saldo para esta apuesta acumulada, intente nuevamente.\n");
                        apuestaTotal = 0;
                        continue;
                    }
    
                    const seguir = readlineSync.question("¿Desea seguir apostando? (1 para continuar apostando, 0 para salir de apuestas):\n");
                    opcion = parseInt(seguir);
    
                    if (isNaN(opcion) || (opcion !== 0 && opcion !== 1)) {
                        console.log("Opción no válida. Por favor, elija 1 para seguir apostando o 0 para dejar de apostar.\n");
                        opcion = 1;
                    } else if (opcion === 0) {
                        console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " monedas.\n");
                        return apuestaTotal;
                    }
                }
            }
        } catch (error) {
            console.error("Ocurrió un error durante la elección de apuesta:", error);
        }
    
        return 0;
    }    
}