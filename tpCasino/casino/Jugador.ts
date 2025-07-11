import * as readlineSync from 'readline-sync';

export class Jugador {
    private nombreJugador: string;
    private saldo: number;

    constructor(nombreJugador: string, saldo: number) {
        this.nombreJugador = nombreJugador;
        this.saldo = saldo;
    }

    public getNombreJugador(): string {
        return this.nombreJugador;
    }

    public setNombreJugador(nombre: string): void {
        this.nombreJugador = nombre;
    }

    public getSaldo(): number {
        return this.saldo;
    }

    public setSaldo(saldo: number): void {
        this.saldo = saldo;
    }

    public saldoInsuficiente (apuesta: number) {
        return apuesta > this.getSaldo()
    }

    public cargarSaldo(): boolean {
        try {
            let saldoCargado = false;
            // Mientras no se ingrese un saldo válido, se le sigue pidiendo un monto al usuario
            while (!saldoCargado) {
                const nuevoSaldo = readlineSync.question("Ingrese el monto de dinero que desea cargar en su cuenta. El monto minimo es de 500 pesos: ");
                const saldoNumerico = parseInt(nuevoSaldo, 10);

                if (isNaN(saldoNumerico) || saldoNumerico <= 0 || saldoNumerico % 2 !== 0) {
                    console.log("El valor ingresado debe ser un número entero mayor a cero.\n");
                } else if (saldoNumerico < 500) {
                    console.log("El valor ingresado debe ser igual o mayor a 500.\n");
                } else {
                    console.log("Saldo cargado con éxito.\n");
                    this.setSaldo(this.getSaldo() + saldoNumerico); 
                    saldoCargado = true; 
                }
            }
            return true; 
        } catch (error) {
            console.log("Hubo un error al procesar su solicitud. Intente nuevamente.\n" + error);
            return false; 
        }
    }
}
