import { Juego } from "./Juego"; //importo la clase base juego.
import { CalculadorDeGanancia } from "./CalculadorDeGanancia";//importo la interfaz CalculadorDeGanancia.

export class Dados extends Juego implements CalculadorDeGanancia {
    private cantidadDados: number; //atributo privado que almacena la cantidad de dados en el juego.
    private apuesta: number = 0;
    private nuevoSaldo: number;

    constructor(pApuesta: number, pCreditoInicial: number, pCantidadDados: number, pNombreDeJuego: string, pCreditoActual: number) { //se heredan tres parametros.
        super(pNombreDeJuego, pCreditoActual)
        this.cantidadDados = pCantidadDados = 2,
            this.apuesta = pApuesta;
        this.nuevoSaldo = 0;
    }

    //reescribo de credito actual
    setCreditoActual(pCreditoActual: number) {
        this.nuevoSaldo = pCreditoActual
    }
    getCreditoActual(): number {
        return this.nuevoSaldo;
    }
    //CREAMOS SET Y GET DE APUESTA
    setApuesta(pApuesta: number) {
        this.apuesta = pApuesta;
    }

    getApuesta(): number {
        return this.apuesta;
    };

    //metodo get y set de cantidad de dados.
    setCantidadDados(pCantidadDados: number) {
        this.cantidadDados = pCantidadDados;
    }

    getCantidadDados() {
        return this.cantidadDados
    }
    //------------------------------------------------------------------------------------------------
    calcularGanancia(pSuma: number, pApuesta: number): number {
        if (pSuma === 7) {
            console.log("¡Sacaste 7! Ganaste el doble de tu apuesta.");
            this.setCreditoActual(this.getCreditoActual() + Math.floor(pApuesta * 2));
        } else if (pSuma === 11) {
            console.log("¡Sacaste 11! Ganaste el triple de tu apuesta.");
            this.setCreditoActual(this.getCreditoActual() + Math.floor(pApuesta * 3));
        } else if (pSuma === 2) {
            //PRUEBA
            console.log("¡Sacaste 2! Ganaste cinco veces tu apuesta.");
            this.setCreditoActual(this.getCreditoActual() + Math.floor(pApuesta * 5));
        } else if ([3, 4, 5, 6, 8, 9, 10, 12].indexOf(pSuma) !== -1) { //arreglo con los numeros perdedores.
            console.log(`Sacaste ${pSuma}. Perdiste toda tu apuesta.`);
        }
        return this.getCreditoActual();
    };

    //---------------------------------------------------------------------------------------------------------------
    jugar(pApuesta: number): void { //metodo que ejecuta una ronda del juego de dados.

        console.log(`Juego creado con crédito inicial: ${this.getCreditoActual()}`);
        pApuesta = Math.floor(pApuesta); // Aseguramos que siempre sea entero
        this.setApuesta(pApuesta);// sette la apuesta.
        console.log(`Apuesta inicial: ${pApuesta}`);

        if (pApuesta > this.getCreditoActual() || this.getCreditoActual() <= 0) { //si apuesto más que mi credito no tengo suficiente saldo para jugar
            console.log("No tienes suficiente crédito para apostar.");
            return;
        }
        this.setCreditoActual((this.getCreditoActual() - pApuesta)); //restamos la apuesta al credito actual.
        console.log(`Crédito después de apostar: ${this.getCreditoActual()}`); //actualiza el credito actual.

        let resultados: number[] = []; //creo un arreglo para almacenar los resultados de los dados, el cual lo inicializo vacio.
        let suma = 0; // inicializo la suma de los valores de los dados en cero.

        for (let i = 0; i < this.getCantidadDados(); i++) {
            const dado = Math.floor(Math.random() * 6) + 1;
            resultados.push(dado); //agrego al arreglo resultado el dado que sale en la tirada.
            suma += dado; //suma los dos dados.
        }
        console.log(`Resultados de los dados: ${resultados} (Suma: ${suma})`);//muestra el resultado de las dos variables (linea 44 y 45)

        this.calcularGanancia(suma, this.getApuesta());
        // if (suma === 7) {
        //     console.log("¡Sacaste 7! Ganaste el doble de tu apuesta.");
        //     this.setCreditoActual (this.getCreditoActual()+ Math.floor(pApuesta * 2));
        // } else if (suma === 11) {
        //     console.log("¡Sacaste 11! Ganaste el triple de tu apuesta.");
        //     this.setCreditoActual (this.getCreditoActual() +Math.floor(pApuesta * 3));
        // } else if (suma === 2) {
        //     console.log("¡Sacaste 2! Ganaste cinco veces tu apuesta.");
        //     this.setCreditoActual (this.getCreditoActual() + Math.floor(pApuesta * 5));
        // }
        //  else if ([3, 4, 5, 6, 8, 9, 10, 12].includes(suma)) { //arreglo con los numeros perdedores.
        //     console.log(`Sacaste ${suma}. Perdiste toda tu apuesta.`);
        // }

        console.log(`Crédito final después de la partida: ${this.getCreditoActual()}`);
    }
}
//const juegoDeDados = new Dados(10000, 2, 1, "h", 20000); //hay que inicializar los parametros desde el inicio. ??
//juegoDeDados.jugar(1000); //lo que quiero que sea la apuesta