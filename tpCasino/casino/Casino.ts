import { Juego } from './Juego';
import { Jugador } from './Jugador';

export class Casino {
    private nombre: string;
    private juegos: Juego[];
    private jugador: Jugador;
    private saldo: number;

    constructor(nombre: string, saldo: number) {
        this.nombre = nombre;
        this.saldo = saldo;
        this.juegos = [];
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setJuegos(juego: Juego): void {
        this.juegos.push (juego);
    }

    public getJuegos(): Juego[] {
        return this.juegos;
    }

    public getSaldo(): number {
        return this.saldo;
    }

    public setSaldo(saldo: number): void {
        this.saldo = saldo;
    }

    public getPersona(): Jugador {
        return this.jugador;
    }

    public setPersona(jugador: Jugador): void {
        this.jugador = jugador;
    }

    public imprimirJuegos (): void {
         //se publica una lista enumerada de juegos disponibles para el jugador
        for (let i = 0; i < this.juegos.length; i++) {
            console.log((i + 1) + ") " + this.juegos[i].getNombre());
        }
    }

    public actualizarSaldo(jugador: Jugador, casino: Casino, apuesta: number, ganancia: number): void {
        if (ganancia > 0) {
            // Si el jugador gana
            jugador.setSaldo(jugador.getSaldo() + ganancia);
            casino.setSaldo(casino.getSaldo() - ganancia); // El casino pierde la cantidad ganada por el jugador
            console.log("¡Felicidades! Ha ganado " + ganancia + " pesos. Tu saldo es ahora " + jugador.getSaldo() + " pesos.");
        } else {
            // Si el jugador pierde
            jugador.setSaldo(jugador.getSaldo() - apuesta);
            casino.setSaldo(casino.getSaldo() + apuesta); // El casino gana lo apostado por el jugador
            console.log("Has perdido. El casino ha ganado " + apuesta + " pesos. Tu saldo es ahora " + jugador.getSaldo() + " pesos.");
        }
    }
}
