import * as rls from "readline-sync";
import { CalculadorDeGanancia } from "./CalculadorDeGanancia";
import { Juego } from "./Juego";

export class Ruleta extends Juego implements CalculadorDeGanancia {
    // Se crea una variable  para almacenar los números de la ruleta asociados a su color
    private static readonly ruleta = {
        rojo: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
        negro: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
        cero: [0]
    };

    // Se crea una variable para almacenar las apuestas del jugador
    private apuestas: { [key: string]: number } = {
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

    public numeroApostado: number;

    private static readonly listaDePagos: { [key: number]: string[] } = {
        36: ["numero"],
        3: ["1°_docena", "2°_docena", "3°_docena", "1°_fila", "2°_fila", "3°_fila"],
        2: ["rojo", "negro", "par", "impar", "1°_escala(1-18)", "2°_escala(19-36)"]
    };

    private ganancia: number;

    public constructor(nombreDeJuego: string) {
        super(nombreDeJuego);
        this.ganancia = 0;
        this.numeroApostado = 0;
    }

    public jugar(): void {
        try {
            // Generación del número aleatorio de la ruleta (0 a 36)
            const resultadoRuleta = Math.floor(Math.random() * 37);

            //Se obtiene el color del numero
            let color = "verde";
            if (Ruleta.ruleta.rojo.indexOf(resultadoRuleta) !== -1) {
                color = "rojo";
            } else if (Ruleta.ruleta.negro.indexOf(resultadoRuleta) !== -1) {
                color = "negro";
            }

            console.log("Número saliente: " + resultadoRuleta + " | Color saliente: " + color);
            // Se calcula la ganancia llamando a calcularGanancia con el número obtenido
            const ganancia = this.calcularGanancia(resultadoRuleta);
            // Se almacena la ganancia obtenida en el juego
            this.setGanancia(ganancia);
        } catch (error) {
            console.error("Error durante el juego:", error);
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

    // Método para imprimir las apuestas disponibles
    public printApuestasDisponibles(): void {
        // Obtienen todas las claves del objeto 'apuestas'
        const claves = Object.keys(this.apuestas);

        console.log("Apuestas disponibles:");
        for (let i = 0; i < claves.length; i++) {
            console.log((i + 1) + ') ' + claves[i]);
        }
    }

    public elegirApuesta(saldoDisponible: number): number {
        let apuestaTotal = 0;
        let opcion = 1;

        try {
            while (opcion !== 0) {
                // Se muestran las apuestas disponibles
                this.printApuestasDisponibles();
                // Se solicita al jugador elegir un tipo de apuesta
                const entrada = rls.question("Elija el numero de la apuesta que desea realizar (0 para salir):\n");
                const eleccion = parseInt(entrada);
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
                    const numeroElegido = rls.questionInt("Ingrese el número al que desea apostar (0-36): ");
                    if (numeroElegido < 0 || numeroElegido > 36) {
                        console.log("Número inválido. Debe estar entre 0 y 36.");
                        continue;
                    }
                    this.numeroApostado = numeroElegido;
                } else {
                    // Reiniciar número apostado si la apuesta no es a número
                    this.numeroApostado = 0;
                }
                // Se solicita el monto de la apuesta
                const monto = rls.questionInt("Ingrese el monto de la apuesta (minimo 500, máximo 50,000):\n");
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
                const claves = Object.keys(this.apuestas);
                const tipoApuesta = claves[eleccion - 1];
                // Se suma la apuesta al valor actual de la clave en el objeto 'apuestas'
                this.apuestas[tipoApuesta] += monto;
                // Sumar la apuesta al total
                apuestaTotal += monto;
                console.log("Apuesta realizada: " + tipoApuesta + " por " + monto + " pesos.");
                console.log("Apuesta total acumulada: " + apuestaTotal + " pesos.");
                // Preguntar si el jugador desea seguir apostando
                const seguir = rls.question("¿Desea seguir apostando? (1 para continuar, 0 para finalizar):\n");
                opcion = parseInt(seguir);
                if (opcion === 0) {
                    console.log("Ha decidido no seguir apostando. La apuesta total es de " + apuestaTotal + " pesos.");
                    return apuestaTotal; // Devuelve el monto total de las apuestas
                }
            }
        } catch (error) {
            console.error("Ocurrió un error durante la elección de la apuesta:", error);
        }
        this.numeroApostado = 0;
        return 0;
    }
    public calcularGanancia(resultado: number): number {
        let gananciaTotal = 0;
        const tiposDeApuesta = Object.keys(this.apuestas);
        const listaDePagosKeys = Object.keys(Ruleta.listaDePagos);

        for (let i = 0; i < tiposDeApuesta.length; i++) {
            const tipoApuesta = tiposDeApuesta[i];
            const montoApostado = this.apuestas[tipoApuesta];
            if (montoApostado === 0) continue;

            let multiplicador = 0;
            for (let j = 0; j < listaDePagosKeys.length; j++) {
                const key = listaDePagosKeys[j];
                const apuestas = Ruleta.listaDePagos[key];
                if (apuestas.indexOf(tipoApuesta) !== -1) {
                    multiplicador = parseInt(key);
                    break;
                }
            }

            // Evaluar si gana
            let gano = false;
            if (tipoApuesta === "numero") {
                if (resultado === this.numeroApostado) {
                    gano = true;
                }
            } else if (tipoApuesta === "rojo") {
                if (resultado !== 0 && Ruleta.ruleta.rojo.indexOf(resultado) !== -1) {
                    gano = true;
                }
            } else if (tipoApuesta === "negro") {
                if (resultado !== 0 && Ruleta.ruleta.negro.indexOf(resultado) !== -1) {
                    gano = true;
                }
            } else if (tipoApuesta === "par") {
                if (resultado !== 0 && resultado % 2 === 0) {
                    gano = true;
                }
            } else if (tipoApuesta === "impar") {
                if (resultado !== 0 && resultado % 2 !== 0) {
                    gano = true;
                }
            } else if (tipoApuesta === "1°_escala(1-18)") {
                if (resultado >= 1 && resultado <= 18) {
                    gano = true;
                }
            } else if (tipoApuesta === "2°_escala(19-36)") {
                if (resultado >= 19 && resultado <= 36) {
                    gano = true;
                }
            } else if (tipoApuesta === "1°_docena") {
                if (resultado >= 1 && resultado <= 12) {
                    gano = true;
                }
            } else if (tipoApuesta === "2°_docena") {
                if (resultado >= 13 && resultado <= 24) {
                    gano = true;
                }
            } else if (tipoApuesta === "3°_docena") {
                if (resultado >= 25 && resultado <= 36) {
                    gano = true;
                }
            } else if (tipoApuesta === "1°_fila") {
                if (resultado % 3 === 1) {
                    gano = true;
                }
            } else if (tipoApuesta === "2°_fila") {
                if (resultado % 3 === 2) {
                    gano = true;
                }
            } else if (tipoApuesta === "3°_fila") {
                if (resultado % 3 === 0 && resultado !== 0) {
                    gano = true;
                }
            }

            if (gano) {
                gananciaTotal += montoApostado * multiplicador;
            }
        }
        // Reiniciar apuestas
        for (let i = 0; i < tiposDeApuesta.length; i++) {
            this.apuestas[tiposDeApuesta[i]] = 0;
        }

        return gananciaTotal;
    }

    public imprimirNumerosRuleta(): void {
        // Imprimir números rojos
        let resultadoRojo = "";
        for (let i = 0; i < Ruleta.ruleta.rojo.length; i++) {
            resultadoRojo += Ruleta.ruleta.rojo[i];
            if (i !== Ruleta.ruleta.rojo.length - 1) {
                resultadoRojo += " | ";
            }
        }
        // Imprimir números negros
        let resultadoNegro = "";
        for (let i = 0; i < Ruleta.ruleta.negro.length; i++) {
            resultadoNegro += Ruleta.ruleta.negro[i];
            if (i !== Ruleta.ruleta.negro.length - 1) {
                resultadoNegro += " | ";
            }
        }
        console.log("0\n" + resultadoRojo + "\n" + resultadoNegro);
    }
}
