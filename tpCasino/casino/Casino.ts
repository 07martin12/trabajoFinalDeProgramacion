import { Juego } from './Juego';
import { Persona } from './Persona';

export class Casino {
    private nombre: string;
    private juegos: Juego[];
    private persona: Persona;
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

    public getPersona(): Persona {
        return this.persona;
    }

    public setPersona(persona: Persona): void {
        this.persona = persona;
    }

    public imprimirJuegos (): void {
         //se publica una lista enumerada de juegos disponibles para el jugador
        for (let i = 0; i < this.juegos.length; i++) {
            console.log((i + 1) + ") " + this.juegos[i].getNombre());
        }
    }
}
