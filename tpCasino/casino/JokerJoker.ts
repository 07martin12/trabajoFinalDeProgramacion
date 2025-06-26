import { CalculadorDeGanancia } from './CalculadorDeGanancia';
import { Tragamonedas } from './Tragamonedas';
import * as readlineSync from 'readline-sync';

export class JokerJoker extends Tragamonedas implements CalculadorDeGanancia {
    private static readonly simboloEspecialWild = "wild";
    // Se crea un objeto estatico que asocia un número (3, 4 o 5) con un arreglo de símbolos ganadores (strings).
    private static readonly combinacionesGanadoras: { [key: number]: string[] } = {
        5: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        4: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"],
        3: ["diamante", "siete", "bar", "estrella", "campana", "sandia", "uvas", "mango", "durazno", "limon", "cereza"]
    };

    // Se crea un objeto estatico donde cada clave es el nombre de un símbolo y su valor es un arreglo de pagos correspondientes a las apuestas ganadoras.
    // Cada arreglo representa los pagos por 3, 4 o 5 símbolos iguales (en ese orden).
    private static readonly listaDePagos: { [key: string]: number[] } = {
        "diamante": [20, 5, 1], "siete": [10, 3, 0.6],
        "bar": [8, 2, 0.3], "estrella": [5, 1.5, 0.2],
        "campana": [5, 1.5, 0.2], "sandia": [0.8, 0.3, 0.075],
        "uvas": [0.8, 0.3, 0.075], "mango": [0.8, 0.3, 0.075],
        "durazno": [0.5, 0.2, 0.05], "limon": [0.5, 0.2, 0.05],
        "cereza": [0.5, 0.2, 0.05], "wild": [0, 0, 0]
    };

    private static readonly apuestasDisponibles: number[] = [
        10, 20, 30, 40, 50, 60, 70, 80, 90,
        100, 120, 140, 160, 180,
        200, 250, 300, 350, 400, 450,
        500, 600, 700, 800, 900,
        1000, 1200, 1400, 1600, 1800,
        2000
    ];

    private carretes: string[][];

    public constructor(nombre: string) {
        super(nombre);
        this.setCargarCarretes();
    }

    public getSimboloEspecial(): string {
        return JokerJoker.simboloEspecialWild;
    }

    public getListaDePagos(): { [key: string]: number[] } {
        return JokerJoker.listaDePagos;
    }

    public getApuestasDisponibles(): number[] {
        return JokerJoker.apuestasDisponibles;
    }

    public getCombinacionesGanadoras(): { [key: number]: string[] } {
        return JokerJoker.combinacionesGanadoras;
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

    //se cargan los carretes aleatoriamente tomando las claves del objeto listaDePagos como un arreglo con los nombres de todos los simbolos disponibles
    public setCargarCarretes(): void {
        const filas = 3;
        const columnas = 5;
        const simbolos = Object.keys(JokerJoker.listaDePagos);
        this.carretes = [];

        for (let i = 0; i < filas; i++) {
            this.carretes[i] = [];
            for (let j = 0; j < columnas; j++) {
                const indiceAleatorio = Math.floor(Math.random() * simbolos.length);
                this.carretes[i][j] = simbolos[indiceAleatorio];
            }
        }
    }

    public jugar(apuesta: number): void {
        console.log("Iniciando juego...");
        this.setCargarCarretes();
        //si el metodo calcular ganancia retorno 0 entonces no se multiplica por la apuesta
        const gananciaMultiplicador = this.calcularGanancia();
        const ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
        this.setResultado(ganancia);
    }

    public calcularGanancia(): number {
        //se buscan combinaciónes ganadoras y se almacenan sus ganancias correspondientes
        let ganancia = this.lecturaVertical();
        ganancia += this.lecturaHorizontal();
        ganancia += this.lecturaDiagonal();
        return ganancia;
    }

    public lecturaVertical(): number {
        let contador = 1;

        for (let fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] || this.carretes[fila][0] === JokerJoker.simboloEspecialWild)
                contador++;

        if (contador === 3)
            if (JokerJoker.combinacionesGanadoras[contador] &&
                JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];

        return 0;
    }

    public lecturaHorizontal(): number {
        let contador = 1;

        for (let columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] || this.carretes[0][columna] === JokerJoker.simboloEspecialWild)
                contador++;

        if ((contador > 2 && contador < 6) &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];

        return 0;
    }

    public lecturaDiagonal(): number {
        let contador = 1;
        let fila = 1;
        let columna = 1;

        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === this.carretes[0][0] || this.carretes[fila][columna] === JokerJoker.simboloEspecialWild)
                contador++;11
            fila++;
            columna++;
        }

        if (contador === 3 &&
            JokerJoker.combinacionesGanadoras[contador] &&
            JokerJoker.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return JokerJoker.listaDePagos[this.carretes[0][0]][contador - 1];

        return 0;
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
        for (let i = 0; i < JokerJoker.apuestasDisponibles.length; i++) {
            apuestasString += JokerJoker.apuestasDisponibles[i];
            if (i < JokerJoker.apuestasDisponibles.length - 1) {
                apuestasString += ' | ';
            }
        }
        console.log("Apuestas disponibles: " + apuestasString);
    }

    public apuestaExistente(eleccion: number): boolean {
        if (JokerJoker.apuestasDisponibles.indexOf(eleccion) != -1)
            return false;

        return true;
    }

    public elegirApuesta(saldoDisponible: number): number {
        let apuestaTotal = 0;
        while (true) {
            //se elije un elemento del array de apuestas (el valor de uno de los elementos del array)
            const eleccion = readlineSync.questionInt("Eliga su apuesta: ");

            if (this.apuestaExistente(eleccion)) {
                //es invalida porque el numero ingresado no existe en el array de apuestas disponibles del juego seleccionado.
                console.log("Opción no válida. Elija una apuesta disponible.");
            } else {
                //+= para seguir eligiendo apuestas disponibles y formar una apuesta mayor, si el jugador elige 2 fichas de 40 entonces la apuesta es de 80.
                apuestaTotal += eleccion;
                console.log("Ha apostado " + eleccion + " monedas.");
                console.log("Apuesta total acumulada: " + apuestaTotal + " monedas.");

                if (apuestaTotal > saldoDisponible) {
                    //si el jugador no tiene suficiente saldo entonces no puede aumentar la apuesta
                    console.log("No tiene suficiente saldo para esta apuesta acumulada, intente nuevamente.");
                    apuestaTotal = 0;
                }
                const continuarApostando = readlineSync.questionInt("¿Desea seguir apostando? (1 para continuar apostando, 0 para salir de apuestas): ");
                if (continuarApostando === 0) {
                    console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " monedas.");
                    return apuestaTotal;
                } else if (continuarApostando !== 1) {
                    console.log("Opción no válida. Por favor, elija 1 para seguir apostando o 0 para dejar de apostar.");
                }
            }
        }
    }
}