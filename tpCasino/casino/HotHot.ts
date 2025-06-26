import { CalculadorDeGanancia } from './CalculadorDeGanancia';
import { Tragamonedas } from './Tragamonedas';
import * as readlineSync from 'readline-sync';

export class HotHot extends Tragamonedas implements CalculadorDeGanancia {
    private static readonly simboloEspecialSpin = "free-spin";

    private static readonly combinacionesGanadoras: { [key: number]: string[] } = {
        5: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"],
        4: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"],
        3: ["scatter", "hot-hot", "777", "77", "7", "b5r", "bar", "champagne", "fichas"]
    };

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

    private static readonly apuestasDisponibles: number[] = [
        25, 50, 75, 100, 125, 150, 175, 200, 225, 250,
        300, 350, 400, 450, 500,
        625, 750, 875, 1000, 1125, 1250, 1375, 1500,
        1625, 1750, 1875, 2000
    ];

    private carretes: string[][];

    public constructor(nombre: string) {
        super(nombre);
        this.setCargarCarretes();
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
        this.setCargarCarretes();
        const gananciaMultiplicador = this.calcularGanancia();
        const ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
        this.setResultado(ganancia);
    }

    public calcularGanancia(): number {
        //se realiza una lectura especial evaluando si el jugador consiguo tiradas gratis  por conseguir una combinación de simbolos especiales
        let tiradasGratis = this.hayTiradaGratis();
        let ganancia = 0;

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
    }

    public lecturaVertical(): number {
        let contador = 1;

        for (let fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === this.carretes[0][0] && this.carretes[fila][0] !== HotHot.simboloEspecialSpin)
                contador++;

        if (contador === 3)
            if (HotHot.combinacionesGanadoras[contador] &&
                HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
                return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];

        return 0;
    }

    public lecturaHorizontal(): number {
        let contador = 1;

        for (let columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === this.carretes[0][0] && this.carretes[0][columna] !== HotHot.simboloEspecialSpin)
                contador++;

        if (contador === 3 &&
            HotHot.combinacionesGanadoras[contador] &&
            HotHot.combinacionesGanadoras[contador].indexOf(this.carretes[0][0]) !== -1)
            return HotHot.listaDePagos[this.carretes[0][0]][contador - 1];

        return 0;
    }

    public lecturaDiagonal(): number {
        let contador = 1;
        let fila = 1;
        let columna = 1;

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
    }

    public setCargarCarretes(): void {
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

        if (this.carretes[0][0] != HotHot.simboloEspecialSpin)
            return 0;

        let tiradasGratis = 0;

        for (let fila = 1; fila < this.carretes.length; fila++)
            if (this.carretes[fila][0] === HotHot.simboloEspecialSpin)
                contador++;

        for (let columna = 1; columna < this.carretes[0].length; columna++)
            if (this.carretes[0][columna] === HotHot.simboloEspecialSpin)
                contador++;

        let fila = 1;
        let columna = 1;

        while (fila < this.carretes.length) {
            if (this.carretes[fila][columna] === HotHot.simboloEspecialSpin)
                contador++;

            fila++;
            columna++;
        }

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
        if (HotHot.apuestasDisponibles.indexOf(eleccion) != -1)
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
                    console.log("No tiene suficiente saldo para esta apuesta acumulada.");
                    return apuestaTotal;
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
