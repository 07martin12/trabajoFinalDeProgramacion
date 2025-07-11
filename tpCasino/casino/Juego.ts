export class Juego {
    private nombreDeJuego: string;
    private creditoActual: number;

    public constructor(nombre: string) {
        this.nombreDeJuego = nombre;
        this.creditoActual =  0;
    }

    public getNombre(): string {
        return this.nombreDeJuego;
    }

    public setNombre(nombre: string): void {
        this.nombreDeJuego = nombre;
    }
    
    public getCreditoActual(): number {
        return this.creditoActual;
    }

    public setCreditoActual(ganancia: number): void {
        this.creditoActual = ganancia;
    }
}
