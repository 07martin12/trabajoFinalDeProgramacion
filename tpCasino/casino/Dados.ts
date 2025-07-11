import * as readlineSync from 'readline-sync';
import { Juego } from "./Juego";
import { CalculadorDeGanancia } from "./CalculadorDeGanancia";

export class Dados extends Juego implements CalculadorDeGanancia {
    //se crea una variable inmutable para almacenar la cantidad de dados del juego
    private static readonly dados: number[][] = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6]
    ];

    //resultados ganadores
    private ganancia: number;

    public constructor(nombreDeJuego: string) {
        super(nombreDeJuego)
        this.ganancia = 0;
    }

    public jugar(apuesta: number): void {
        try {
            let resultadoTotal = 0;
            // Se recorren todos los dados (cada array dentro de la matriz)
            for (let i = 0; i < Dados.dados.length; i++) {
                // Se genera un índice aleatorio para el dado actual
                const indiceAleatorio = Math.floor(Math.random() * Dados.dados[i].length);
                // Se obtiene el valor de la cara del dado
                const caraDado = Dados.dados[i][indiceAleatorio];
                // Suma total de la cara de cada dado
                resultadoTotal += caraDado;
                console.log('Dado ' + (i + 1) + ': ' + caraDado);
            }
            // Se calcula la ganancia con la suma total de los dados
            const gananciaMultiplicador = this.calcularGanancia(resultadoTotal);
            //La ganancia se multiplica por la apuesta del jugador solo si no es igual a 0, lo que indica que hubo combinaciones ganadoras.
            const ganancia = gananciaMultiplicador > 0 ? gananciaMultiplicador * apuesta : 0;
            this.setGanancia(ganancia);
        } catch (error) {
            console.error("Error durante el juego:", error);
        }
    }

    public elegirApuesta(): number {
        try {
            const apuesta = readlineSync.question("Elija su apuesta, la apuesta minima es de 500 y la máxima es de 50.000:\n");
            const apuestaNumerica = parseInt(apuesta);

            if (isNaN(apuestaNumerica)) {
                console.log("Entrada no válida. Debe ingresar un número.");
                return this.elegirApuesta();  // Llamamos nuevamente al método si la entrada no es un número
            }

            if (apuestaNumerica < 500 || apuestaNumerica > 50000) {
                console.log("La apuesta debe ser mayor a 500 y menor a 50,000.");
                return this.elegirApuesta();  // Volver a pedir la apuesta si no está en el rango
            }

            console.log("Apuesta seleccionada: " + apuestaNumerica + " monedas.");
            return apuestaNumerica;
        } catch (error) {
            console.error("Ocurrió un error durante la elección de la apuesta:", error);
            return 0;  // En caso de error, retorna 0
        }
    }

    public getNombre(): string {
        return super.getNombre();
    }

    public setNombre(nombre: string): void {
        return super.setNombre(nombre);
    }

    public getGanancia(): number {
        return this.ganancia;
    }

    public setGanancia(ganancia: number): void {
        this.ganancia = ganancia;
    }

    public calcularGanancia(pSuma: number): number {
        // Verificar si el número es primo
        let esPrimo = true;
        if (pSuma <= 1) {
            esPrimo = false;
        } else {
            for (let i = 2; i <= Math.sqrt(pSuma); i++) {
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
        } else if (esPrimo) { // Número primo
            console.log("Sacaste un numero primo:" + pSuma + ". Ganaste cinco veces tu apuesta.");
            return 5; 
        } else { // Número impar 
            console.log("Sacaste un numero impar:" + pSuma + ". Ganaste el triple de tu apuesta.");
            return 3
        }
    }
}
