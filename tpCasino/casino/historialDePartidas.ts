import * as fs from 'fs';
import * as path from 'path';

export class HistorialDePartidas {
    private static instancia: HistorialDePartidas;
    private rutaArchivo: string;

    private constructor() {
        this.rutaArchivo = path.resolve(__dirname, '../configuracion/historialDePartidas.txt');

        const carpetaConfiguracion = path.dirname(this.rutaArchivo);
        if (!fs.existsSync(carpetaConfiguracion)) {
            fs.mkdirSync(carpetaConfiguracion); 
        }
        
        if (!fs.existsSync(this.rutaArchivo)) {
            fs.writeFileSync(this.rutaArchivo, '');
        }
    }

    public static getInstancia(): HistorialDePartidas {
        if (!HistorialDePartidas.instancia) {
            HistorialDePartidas.instancia = new HistorialDePartidas();
        }
        return HistorialDePartidas.instancia;
    }

    public static registrarPartida(nombreJugador: string, nombreJuego: string, apuesta: number, ganancia: number): void {
        const instancia = HistorialDePartidas.getInstancia();
        const fechaHora = instancia.obtenerFechaHoraCompleta(new Date());

        const linea = fechaHora + ' | Jugador: ' + nombreJugador + ' | Juego: ' + nombreJuego + ' | Apuesta: ' + apuesta + ' | Ganancia: ' + ganancia + '\n';

        fs.appendFileSync(instancia.rutaArchivo, linea, 'utf8');
    }

    private obtenerFechaHoraCompleta(fecha: Date): string {
        const yyyy = fecha.getFullYear();
        const mm = String(fecha.getMonth() + 1).padStart(2, '0');
        const dd = String(fecha.getDate()).padStart(2, '0');
        const hh = String(fecha.getHours()).padStart(2, '0');
        const mi = String(fecha.getMinutes()).padStart(2, '0');
        const ss = String(fecha.getSeconds()).padStart(2, '0');
        return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
    }
}
