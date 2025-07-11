import { Juego } from './Juego';

export abstract class Tragamonedas extends Juego {
    public constructor(nombre: string) {
        super (nombre); 
    }

    public abstract getSimboloEspecial (): string;
    public abstract getListaDePagos (): {[key: string]: number[]}; 
    public abstract getApuestasDisponibles(): number[];
    public abstract getCombinacionesGanadoras (): {[key: number]: string []};
    public abstract getCarretes(): string [][];
    public abstract cargarCarretes (): void;

    public abstract lecturaVertical (): number;
    public abstract lecturaHorizontal (): number;
    public abstract apuestaExistente (eleccion: number): boolean;
    public abstract printApuestasDisponibles (): void;
    public abstract elegirApuesta (saldoDisponible: number): number; 
    public abstract jugar (apuesta: number): void;  

    public getNombre (): string {
        return super.getNombre ();
    }

    public setNombre (nombre:string): void {
        return super.setNombre (nombre);
    }

    public getResultado (): number {
        return super.getCreditoActual ();
    }

    //Se actualiza el resultado de la partida actual del jugador una vez finalizada
    public setResultado (gananciaTotal: number): void {
        super.setCreditoActual (gananciaTotal);
    }
}
