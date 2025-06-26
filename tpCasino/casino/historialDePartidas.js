"use strict";
exports.__esModule = true;
exports.HistorialDePartidas = void 0;
var fs = require("fs");
var path = require("path");
var HistorialDePartidas = /** @class */ (function () {
    function HistorialDePartidas() {
        this.rutaArchivo = path.resolve(__dirname, '../configuracion/historialDePartidas.txt');
        var carpetaConfiguracion = path.dirname(this.rutaArchivo);
        if (!fs.existsSync(carpetaConfiguracion)) {
            fs.mkdirSync(carpetaConfiguracion);
        }
        if (!fs.existsSync(this.rutaArchivo)) {
            fs.writeFileSync(this.rutaArchivo, '');
        }
    }
    HistorialDePartidas.getInstancia = function () {
        if (!HistorialDePartidas.instancia) {
            HistorialDePartidas.instancia = new HistorialDePartidas();
        }
        return HistorialDePartidas.instancia;
    };
    HistorialDePartidas.registrarPartida = function (nombreJugador, nombreJuego, apuesta, ganancia) {
        var instancia = HistorialDePartidas.getInstancia();
        var fechaHora = instancia.obtenerFechaHoraCompleta(new Date());
        var linea = fechaHora + ' | Jugador: ' + nombreJugador + ' | Juego: ' + nombreJuego + ' | Apuesta: ' + apuesta + ' | Ganancia: ' + ganancia + '\n';
        fs.appendFileSync(instancia.rutaArchivo, linea, 'utf8');
    };
    HistorialDePartidas.prototype.obtenerFechaHoraCompleta = function (fecha) {
        var yyyy = fecha.getFullYear();
        var mm = String(fecha.getMonth() + 1).padStart(2, '0');
        var dd = String(fecha.getDate()).padStart(2, '0');
        var hh = String(fecha.getHours()).padStart(2, '0');
        var mi = String(fecha.getMinutes()).padStart(2, '0');
        var ss = String(fecha.getSeconds()).padStart(2, '0');
        return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
    };
    return HistorialDePartidas;
}());
exports.HistorialDePartidas = HistorialDePartidas;
